console.log("background.js running");

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    console.log("button clicked");
}

chrome.runtime.onMessage.addListener(
    function(request, sender) {
        if (sender.tab.url === "https://www.linkedin.com/mynetwork/invite-connect/connections/" ) {
            console.log(request)
        } else {
            console.log("Messege from unexpected tab: " + sender.tab.url)
        }
    }
);


