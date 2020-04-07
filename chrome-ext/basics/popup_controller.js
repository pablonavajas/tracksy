const linkedIn_url = "https://www.linkedin.com/mynetwork/invite-connect/connections/";

const btnGoToLinkedIn = document.body.querySelector("#btnToLinkedIn");
const btnGetConnections = document.body.querySelector("#btnConnections");
const btnSuccess = document.body.querySelector("#success");
const btnReset = document.body.querySelector("#reset");
const btnsAll = document.body.querySelector("#control-buttons");
const form = document.body.querySelector("form");

btnGetConnections.addEventListener("click", () => {
    chrome.runtime.sendMessage({getConnections: true})});

btnGoToLinkedIn.addEventListener("click", () => {
    chrome.runtime.sendMessage({goto: true})});

form.addEventListener("submit", (event) => {
    let username = form.querySelector("#username").value;
    let password = form.querySelector("#password").value;
    console.log("in form listener");
    chrome.runtime.sendMessage({username: username, password: password});
});

btnReset.addEventListener("click", () => {
    btnGetConnections.hidden = true;
    btnGoToLinkedIn.hidden = true;
    btnSuccess.hidden = true;
    btnsAll.hidden = true;
    chrome.runtime.sendMessage({reset: true})
});


function onLinkedIn(status){
    let bool = status.onLinkedIn;
    btnGetConnections.hidden = !bool;
    btnGoToLinkedIn.hidden = bool;
    btnGetConnections.disabled = !status.loaded
}

function logedInSetUp(status) {
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
        onLinkedIn(status);
        progressBar(false)
    }

    btnReset.hidden = false;
}

function progressBar(toDisplay, progress) {
    document.body.querySelector("#progress").hidden = !toDisplay;
    if (progress !== undefined) {
        document.body.querySelector(".progress-bar").style.width = progress
    }
}

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.status !== undefined){
        let status = message;
        console.log(status.auth);
        if (status.auth === true) {
            logedInSetUp(status);
        }
    } else if (message.alert !== undefined) {
        alert(message.alert)
    }
});

chrome.runtime.sendMessage({status: true});
