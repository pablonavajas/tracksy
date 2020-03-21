console.log("hello world");

setButtonBasedOnTab();

function setButtonBasedOnTab() {
    console.log("in setButtonBasedOnTab");
    let params = {active : true, currentWindow : true}
    chrome.tabs.query(params, tabs => setButton(tabs[0]));
}

function setButton(curTab) {
    // TODO: need different way of changing button text
    let buttonAction = undefined;
    let buttonText = undefined;
    let linkedIn_url = "https://www.linkedin.com/mynetwork/invite-connect/connections/";

    if (curTab.url === linkedIn_url){
        console.log("On LinkedIn url (in button attach)");
        buttonText = "Retrieve Connections";
        buttonAction = buttonActionGetConnections;
    } else {
        console.log("Not LinkedIn url (in button attach)");
        buttonText = "LinkedIn";
        buttonAction = buttonActionGoToLinkedIn;
    }

    let button = document.body.querySelector('button');
    button.innerHTML = buttonText;
    button.addEventListener("click", () => buttonAction(curTab), {once: true});
}

function buttonActionGetConnections(curTab) {
    console.log("will go get connections, but later (in buttonActionGetConnections)");
    chrome.tabs.sendMessage(curTab.id, {text: "getConnections"});
    setButtonBasedOnTab();
}

function buttonActionGoToLinkedIn(curTab) {
    console.log("Updating current tab to display LinkedIn (in buttonActionGoToLinkedIn)");
    chrome.tabs.update(curTab.id, {url: linkedIn_url}, () => {
        setTimeout(setButtonBasedOnTab, 1000);
    });
}

