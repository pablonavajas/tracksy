console.log("background.js running");

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    let msg = {text: "connections"};
    chrome.tabs.sendMessage(tab.id, msg);
}

chrome.runtime.onMessage.addListener(
    function(request, sender) {
        if (sender.tab.url === "https://www.linkedin.com/mynetwork/invite-connect/connections/" ) {
            console.log("Sending data!");
            console.log(request);
            sendpost(request)
        } else {
            console.log("Messege from unexpected tab: " + sender.tab.url)
        }
    }
);

function sendpost(data) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch('https://track-shsfw.run-us-west2.goorm.io/postThis', options);
}

