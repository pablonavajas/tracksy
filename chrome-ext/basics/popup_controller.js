const linkedIn_url = "https://www.linkedin.com/mynetwork/invite-connect/connections/";

const btnGoToLinkedIn = document.body.querySelector("#btnToLinkedIn");
const btnGetConnections = document.body.querySelector("#btnConnections");
const btnSuccess = document.body.querySelector("#success");
function progressBarHidden(bool){
    document.body.querySelector(".progress").hidden = bool
}
const progressBar = document.body.querySelector(".progress-bar"); // style.width to adjust

let success = false;
let inProgress = false;
let progress = "0%";
let curTab = undefined;

let params = {active: true, currentWindow: true};
chrome.tabs.query(params, tabs => runPrimarySetUp(tabs[0]));

function runPrimarySetUp(tab) {
    curTab = tab;
    chrome.tabs.onUpdated.addListener((tabID, change, tab) => {
        if (tabID === curTab.id) {
            curTab = tab;
            runSetUp()
        }
    });

    chrome.runtime.onMessage.addListener((message, sender) => {
        if (message.status !== undefined) {
            console.log("message from background");
            console.log(message);
            success = message.status.success;
            inProgress = message.status.inProgress;
            progress = message.status.progress;
            runSetUp();
        }
    });

    chrome.runtime.sendMessage({popupActivated: true});
}

function runSetUp() {
    console.log("in setup, url: " + curTab.url);
    if (success) {
        displaySuccess();
    } else {
        btnGetConnections.addEventListener("click",
            () => chrome.runtime.sendMessage({getConnections: true}));
        btnGoToLinkedIn.addEventListener("click",
            () => buttonActionGoToLinkedIn(curTab), {once: true});

        let onLinkedIn = (curTab.url === linkedIn_url);
        btnGetConnections.hidden = !onLinkedIn;
        btnDisable(btnGetConnections, curTab.status === "loading");
        btnGoToLinkedIn.hidden = onLinkedIn;
        progressBarHidden(!inProgress);
        progressBar.style.width = progress;
    }
}

function buttonActionGoToLinkedIn(curTab) {
    console.log("Updating current tab to display LinkedIn (in buttonActionGoToLinkedIn)");
    chrome.tabs.update(curTab.id, {url: linkedIn_url});
}

function displaySuccess() {
    btnGetConnections.hidden = true;
    btnGoToLinkedIn.hidden = true;
    progressBarHidden(true);
    btnSuccess.hidden = false;
}

function btnDisable(btn, bool) {
    btn.disabled = bool;
    btn.style.cursor = bool ? "default" : "";
}

