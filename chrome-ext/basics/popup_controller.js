const linkedIn_url = "https://www.linkedin.com/mynetwork/invite-connect/connections/";

const btnGoToLinkedIn = document.body.querySelector("#btnToLinkedIn");
const btnGetConnections = document.body.querySelector("#btnConnections");
const btnSuccess = document.body.querySelector("#success");
const btnReset = document.body.querySelector("#reset");
const btnsAll = document.body.querySelector("#control-buttons");
const form = document.body.querySelector("form");

//
// class Btns {
//     progressBar(toDisplay, progress) {
//         document.body.querySelector("#progress").hidden = !toDisplay
//         if (progress !== undefined) {
//             document.body.querySelector(".progress-bar").style.width = progress
//         }
//     }
//
//     constructor(tab) {
//         this.init(tab);
//         chrome.runtime.sendMessage({popupActivated: true});
//     }
//
//     init(tab) {
//         this.success = false;
//         this.inProgress = false;
//         this.progress = "0%";
//
//         this.updateTab(tab);
//
//         btnGetConnections.addEventListener("click",
//             () => chrome.runtime.sendMessage({getConnections: {tabId: this.tab.id}}));
//
//         btnReset.addEventListener("click",
//             () => this.reset());
//     }
//
//     updateTab(tab){
//         this.tab = tab;
//         this.onLinkedIn = (this.tab.url === linkedIn_url);
//         this.loading = (this.tab.status === "loading");
//
//         btnGoToLinkedIn.addEventListener("click",
//             () => chrome.tabs.update(this.tab.id, {url: linkedIn_url}),
//             {once: true});
//
//
//         chrome.tabs.onUpdated.addListener((tabID, change, tab) => {
//             if (this.tab.id === tabID) {
//                 this.updateTab(tab);
//                 this.update();
//             }
//         });
//     }
//
//     reset() {
//         this.init(this.tab);
//         chrome.runtime.sendMessage({reset: true});
//     }
//
//     update() {
//         btnReset.hidden = false;
//         if (this.success){
//             btnSuccess.hidden = false;
//             btnGoToLinkedIn.hidden = true;
//             btnGetConnections.hidden = true;
//             this.progressBar(false)
//         } else {
//             btnGetConnections.hidden = !this.onLinkedIn;
//             btnGetConnections.disabled = this.loading;
//             btnGoToLinkedIn.hidden = this.onLinkedIn;
//             this.progressBar(this.inProgress, this.progress)
//         }
//     }
// }
//
//
// function setUp(curTab) {
//     let btns = new Btns(curTab);
//
//     chrome.runtime.onMessage.addListener((message, sender) => {
//         if (message.status !== undefined) {
//             console.log("message from background");
//             btns.success = message.status.success;
//             btns.inProgress = message.status.inProgress;
//             btns.progress = message.status.progress;
//             btns.update();
//         }
//     });
// }

// let params = {active: true, currentWindow: true};
// chrome.tabs.query(params, tabs => setUp(tabs[0]));

let status = undefined;

function loginSetup() {
    // LogIn form listener
    console.log("in login setup");
    form.addEventListener("submit", (event) => {
        let username = form.querySelector("#username").value;
        let password = form.querySelector("#password").value;
        console.log("in form listener");
        chrome.runtime.sendMessage({username: username, password: password});
    });
}

function onLinkedIn(bool){
    btnGetConnections.hidden = !bool;
    btnGoToLinkedIn.hidden = bool;
}

function logedInSetUp(tab) {
    console.log(status);
    form.hidden = true;
    btnsAll.hidden = false;
    if (status.success === true) {
        btnGetConnections.hidden = true;
        btnGoToLinkedIn.hidden = true;
        progressBar(false);
        btnSuccess.hidden = false;
    } else if (status.inProgress === true) {
        btnsAll.hidden = false;
        btnGetConnections.disabled = true;
        progressBar(true, status.progress)
    } else {
        if (tab.url === linkedIn_url) {
            onLinkedIn(true);
            btnGetConnections.addEventListener("click",
                () => chrome.runtime.sendMessage({getConnections: {tabId: tab.id}}));
            btnGetConnections.disabled = !status.loaded
        } else {
            onLinkedIn(false);
            btnGoToLinkedIn.addEventListener("click",
                () => chrome.tabs.update(tab.id, {url: linkedIn_url},
                                                  tab => logedInSetUp(tab))
            )
        }
    }
}


function progressBar(toDisplay, progress) {
    document.body.querySelector("#progress").hidden = !toDisplay;
    if (progress !== undefined) {
        document.body.querySelector(".progress-bar").style.width = progress
    }
}


chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.status !== undefined){
        status = message.status;
        if (status.auth === false) {
            loginSetup();
        } else {
            let params = {active: true, currentWindow: true};
            chrome.tabs.query(params, tabs => logedInSetUp(tabs[0]));
        }
    }
});


chrome.runtime.sendMessage({popupActivated: true});
// TODO: add reset button

