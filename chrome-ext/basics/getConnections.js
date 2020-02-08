console.log("getConnections.js is running");

viewAllConnections(sendConnectionsDataToBackground);

function viewAllConnections(callback) {
    /* Scrolls to bottom of the page until all connections become visible,
        calls sendConnectionsToBackground once all connections become visible

        TODO: are there cases when all connections cannot be visible?
        TODO: how to wait for new connections to load?
        */

    let totalConnections_txt =
        document.querySelector(".mn-connections__header").textContent.trim();
    let totalConnections = Number(totalConnections_txt.split(" ")[0]);

    let visibleConnections = getConnectionsOnPage().length; // number of connections on page

    if (visibleConnections === totalConnections) {
        callback()
    } else {
        window.scrollTo(0, document.body.scrollHeight); // scroll to bottom of the page
        setTimeout(function () {
            visibleConnections = getConnectionsOnPage().length;
            if (visibleConnections < totalConnections) {
                viewAllConnections(callback)
            } else {
                callback()
            }
        }, 2000)
    }
}

function getConnectionsOnPage(){
    /* Gets data for all visible connections on the page */

    return document.querySelectorAll('div.mn-connection-card__details a[data-control-name=\'connection_profile\']')
}

function sendConnectionsDataToBackground() {
    /* Formats the connection data and send to background

        Sends:  [ { link: "https://xxx", name: "xxx", occupation: "yyy" }, ... ]
     */
    let htmlConnections = getConnectionsOnPage();
    let profiles_list = [];
    htmlConnections.forEach(function(profile) {
            stripProfileInfo(profiles_list, profile)
        }
    );

    chrome.runtime.sendMessage(profiles_list);
}

function stripProfileInfo(profiles_list, profile) {
    let link = profile.href;
    let name = profile.querySelector(".mn-connection-card__name").textContent.trim();
    let occupation = profile.querySelector(".mn-connection-card__occupation").textContent.trim();
    let profile_json = {
        link: link,
        name: name,
        occupation: occupation
    };
    profiles_list.push(profile_json);
}