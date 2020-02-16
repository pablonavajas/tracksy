console.log("getConnections.js is running");

viewAllConnections(sendConnectionsDataToBackground);

function viewAllConnections(callback) {
    /* Scrolls to bottom of the page until all connections become visible,
        calls sendConnectionsToBackground once all connections become visible

        TODO: are there cases when all connections cannot be visible?
        TODO: how long to wait for new connections to load?
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
            window.scrollBy(0, -1000); // scroll a bit upwards, to make more connections load
            visibleConnections = getConnectionsOnPage().length;
            if (visibleConnections < totalConnections) {
                viewAllConnections(callback)
            } else {
                callback()
            }
        }, 1000)
    }
}


function sendConnectionsDataToBackground() {
    /* Formats the connection data and send to background

        Sends:  [ { link: "https://xxx", name: "xxx", occupation: "yyy" }, ... ]
     */
    let owner = getOwnerName();
    let htmlConnections = getConnectionsOnPage();
    let profiles_list = [];
    htmlConnections.forEach(function(profile) {
            stripProfileInfo(profiles_list, profile, owner)
        }
    );

    chrome.runtime.sendMessage(profiles_list);
}

function getConnectionsOnPage(){
    /* Gets data for all visible connections on the page */

    return document.querySelectorAll('div.mn-connection-card__details a[data-control-name=\'connection_profile\']')
}

function getOwnerName(){
    /* Returns name of the user/owner from page */
    return document.querySelector(".nav-item__profile-member-photo").alt;
}

function stripProfileInfo(profiles_list, profile, owner) {
    /* Creates object for a profile from HTML, adds object to profile_list
        Fields extracted: link, name, occupation
    */
    let link = profile.href;
    let name = profile.querySelector(".mn-connection-card__name").textContent.trim();
    let occupation = profile.querySelector(".mn-connection-card__occupation").textContent.trim();
    let profile_json = {
        owner: owner,
        link: link,
        name: name,
        occupation: occupation
    };
    profiles_list.push(profile_json);
}