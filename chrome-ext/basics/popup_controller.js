console.log("hello world");

const linkedIn_url = "https://www.linkedin.com/mynetwork/invite-connect/connections/";

const btnGoToLinkedIn = document.body.querySelector("#btnToLinkedIn");
const btnGetConnections = document.body.querySelector("#btnConnections");

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

    if (curTab.url === linkedIn_url) {
        btnGetConnections.hidden = false;
        btnGoToLinkedIn.hidden = true;
    } else {
        btnGetConnections.hidden = true;
        btnGoToLinkedIn.hidden = false;
    }
}

function buttonActionGetConnections(curTab) {
    console.log("calling content script to retrieve connections");
    chrome.tabs.sendMessage(curTab.id, {text: "getConnections"});
    setButtonBasedOnTab();
}

function buttonActionGoToLinkedIn(curTab) {
    console.log("Updating current tab to display LinkedIn (in buttonActionGoToLinkedIn)");
    chrome.tabs.update(curTab.id, {url: linkedIn_url}, () => {
        setTimeout(setButtonBasedOnTab, 1000);
    });
}

