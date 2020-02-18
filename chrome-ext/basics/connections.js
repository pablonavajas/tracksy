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

        Sends:  [ { owner: "zzz", link: "https://xxx", name: "xxx", occupation: "yyy" }, ... ]
     */
    const owner = getOwnerName();
    const htmlConnections = getConnectionsOnPage();
    let profiles_list = [];
    htmlConnections.forEach(function(profileHTML) {
            const profile = stripProfileInfo(profileHTML, owner);
            profiles_list.push(profile);
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

function stripProfileInfo(profile, owner) {
    /* Creates object containing connection info from HTML and owner name
        Fields extracted: link, name, occupation
        Object keys: owner, link, name, occupation
    */
    const link = profile.href;

    const nameSelector = ".mn-connection-card__name";
    const occupationSelector = ".mn-connection-card__occupation";
    const name = profile.querySelector(nameSelector).textContent.trim();
    const occupation = profile.querySelector(occupationSelector).textContent.trim();

    return {
        owner: owner,
        link: link,
        name: name,
        occupation: occupation
    }
}