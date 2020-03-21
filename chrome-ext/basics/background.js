console.log("background.js running");

chrome.runtime.onMessage.addListener(
    function(request, sender) {
        // TODO: check where the message is coming from (e.g. sender.tab.url)
        console.log("profiles received");
        console.log(request);
        sendpost(request)
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

    fetch('https://track-shsfw.run-us-west2.goorm.io/postThis', options);
}
