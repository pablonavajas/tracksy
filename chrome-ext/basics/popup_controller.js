const linkedIn_url = "https://www.linkedin.com/mynetwork/invite-connect/connections/";

const btnGoToLinkedIn = document.body.querySelector("#btnToLinkedIn");
const btnGetConnections = document.body.querySelector("#btnConnections");
const btnSuccess = document.body.querySelector("#success");
function progressBarHidden(bool){
    document.body.querySelector(".progress").hidden = bool
}
const progressBar = document.body.querySelector(".progress-bar"); // style.width to adjust
const btnReset = document.body.querySelector("#reset");


class Btns {
    constructor(tab) {
        this.init(tab);
        chrome.runtime.sendMessage({popupActivated: true});
    }

    init(tab) {
        this.success = false;
        this.inProgress = false;
        this.progress = "0%";

        this.updateTab(tab);

        btnGetConnections.addEventListener("click",
            () => chrome.runtime.sendMessage({getConnections: true}));

        btnReset.addEventListener("click",
            () => this.reset());
    }

    updateTab(tab){
        this.tab = tab;
        this.onLinkedIn = (this.tab.url === linkedIn_url);
        this.loading = (this.tab.status === "loading");

        btnGoToLinkedIn.addEventListener("click",
            () => chrome.tabs.update(this.tab.id, {url: linkedIn_url}),
            {once: true});


        chrome.tabs.onUpdated.addListener((tabID, change, tab) => {
            if (this.tab.id === tabID) {
                this.updateTab(tab);
                this.update();
            }
        });
    }

    reset() {
        this.init(this.tab);
        chrome.runtime.sendMessage({reset: true});
    }

    update() {
        console.log(btns);
        btnSuccess.hidden = !this.success;
        btnReset.hidden = !this.success;
        if (this.success){
            btnGoToLinkedIn.hidden = true;
            btnGetConnections.hidden = true;
            progressBarHidden(true);
        } else {
            btnGetConnections.hidden = !this.onLinkedIn;
            this.btnDisable(btnGetConnections, this.loading);
            btnGoToLinkedIn.hidden = this.onLinkedIn;
            progressBarHidden(!this.inProgress);
            progressBar.style.width = this.progress;
        }
    }

    btnDisable(btn, bool) {
        btn.disabled = bool;
        btn.style.cursor = bool ? "default" : "";
    }
}


function setUp(curTab) {
    btns = new Btns(curTab);

    chrome.runtime.onMessage.addListener((message, sender) => {
        if (message.status !== undefined) {
            console.log("message from background");
            console.log(message);
            btns.success = message.status.success;
            btns.inProgress = message.status.inProgress;
            btns.progress = message.status.progress;
            btns.update();
        }
    });
}


let btns = undefined;
let params = {active: true, currentWindow: true};
chrome.tabs.query(params, tabs => setUp(tabs[0]));
