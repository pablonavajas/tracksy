console.log("background.js running");

chrome.runtime.onMessage.addListener(
    function(message, sender) {
        // TODO: check where the message is coming from (e.g. sender.tab.url)
        if (message.profiles !== undefined){
            console.log("profiles received");
            console.log(message);
            sendpost(message);
        }
    }
);

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
