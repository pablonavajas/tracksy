console.log("hello world");

const linkedIn_url = "https://www.linkedin.com/mynetwork/invite-connect/connections/";

const btnGoToLinkedIn = document.body.querySelector("#btnToLinkedIn");
const btnGetConnections = document.body.querySelector("#btnConnections");
const btnSuccess = document.body.querySelector("#success");
function progressBarHidden(bool){
    document.body.querySelector(".progress").hidden = bool
}
const progressBar = document.body.querySelector(".progress-bar"); // use this

setButtonBasedOnTab();

function setButtonBasedOnTab() {
    console.log("in setButtonBasedOnTab");
    let params = {active : true, currentWindow : true};
    chrome.tabs.query(params, tabs => setButtons(tabs[0]));
}

function setButtons(curTab) {
    btnGoToLinkedIn.addEventListener("click",
        () => buttonActionGoToLinkedIn(curTab), {once: true});
    btnGetConnections.addEventListener("click",
        () => buttonActionGetConnections(curTab), {once: true});

    chrome.runtime.onMessage.addListener((message, sender) => {
        if (message.linkedInLoaded !== undefined) {
            btnDisable(btnGetConnections, !message.linkedInLoaded);
        }
        if (message.progress !== undefined) {
            progressBar.style.width = message.progress;
        }
        if (message.connectionsSent !== undefined) {
            setButtonsConnectionsRetrieved();
        }
    });

    console.log("button set up for: " + curTab.url);
    if (curTab.url === linkedIn_url) {
        btnGoToLinkedIn.hidden = true;
        btnGetConnections.hidden = false;
        btnDisable(btnGetConnections, true);
        chrome.tabs.sendMessage(curTab.id, {popupActivated: true})
    } else {
        btnGetConnections.hidden = true;
        btnGoToLinkedIn.hidden = false;
    }
}

function btnDisable(btn, bool) {
    btn.disabled = bool;
    btn.style.cursor = bool ? "default" : "";
}

function setButtonsConnectionsRetrieved() {
    btnGetConnections.hidden = true;
    btnGoToLinkedIn.hidden = true;
    progressBarHidden(true);
    btnSuccess.hidden = false;
}

function buttonActionGetConnections(curTab) {
    console.log("calling content script to retrieve connections");
    btnDisable(btnGetConnections, true);
    progressBarHidden(false);
    chrome.tabs.sendMessage(curTab.id, {getConnections: true});
}

function buttonActionGoToLinkedIn(curTab) {
    console.log("Updating current tab to display LinkedIn (in buttonActionGoToLinkedIn)");
    chrome.tabs.update(curTab.id, {url: linkedIn_url}, () => {
        setTimeout(setButtonBasedOnTab, 1000);
    });
}

