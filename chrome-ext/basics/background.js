console.log("background.js running");

// const linkedIn_url = "https://www.linkedin.com/mynetwork/invite-connect/connections/";

let status = {
    success : false,
    inProgress : false,
    progress : "0%"
};

chrome.runtime.onMessage.addListener((message, sender) => {
        // TODO: check where the message is coming from (e.g. sender.tab.url)
        if (message.profiles !== undefined) {
            console.log(message);
            status.success = true;
            // Let the popup know
            sendpost(message);
            chrome.runtime.sendMessage({status: status});
        } else if (message.getConnections !== undefined) {
            status.inProgress = true;
            getConnections();
            chrome.runtime.sendMessage({status: status});
        } else if (message.progress !== undefined) {
            status.progress = message.progress;
            chrome.runtime.sendMessage({status: status});
        } else if (message.popupActivated !== undefined){
            chrome.runtime.sendMessage({status: status});
        } else if (message.reset !== undefined) {
            status.success = false;
            status.inProgress = false;
            status.progress = "0%";
            chrome.runtime.sendMessage({status: status});
        }
    }
);

function getConnections() {
    let params = {active: true, currentWindow: true};
    chrome.tabs.query(params, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {getConnections: true});
    });
}

function sendpost(data) {
    console.log("Sending data!");
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    chrome.runtime.sendMessage({connectionsSent: true});

    fetch('https://track-shsfw.run-us-west2.goorm.io/postThis', options);
}
