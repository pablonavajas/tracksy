console.log("connections.js is running");

if (typeof chrome !== "undefined") {
    chrome.runtime.onMessage.addListener(connectionRetrieval);
} else {
    const functions = {
        stripProfileInfo : stripProfileInfo
    };
    module.exports = functions;
}

const selectors = {
    totalConnections : ".mn-connections__header",
    allConnectionsInfo : 'div.mn-connection-card__details a[data-control-name=\'connection_profile\']',
    connection : {
        photo : ".nav-item__profile-member-photo",
        name : ".mn-connection-card__name",
        occupation : ".mn-connection-card__occupation"
    }
};

function connectionRetrieval(message, sender, sendResponse){
    viewAllConnections(sendConnectionsDataToBackground, document.body.scrollHeight);
}

function viewAllConnections(callback, pageHeight) {
    /* Scrolls to bottom of the page until all connections become visible,
        calls sendConnectionsToBackground once all connections become visible
        Note: if page doesn't change callback will be called

        TODO: how long to wait for new connections to load?
        */
    let totalConnections = totalConnectionsNumber();
    let visibleConnections = getConnectionsOnPage().length; // number of connections on page
    if (visibleConnections !== totalConnections) {
        window.scroll(0, document.body.scrollHeight); // scroll to bottom of the page
        setTimeout(() => {
            window.scrollBy(0, -1000); // scroll a bit upwards, to make more connections load
            let curPageHeight = document.body.scrollHeight;
            if (pageHeight === curPageHeight) { // if page doesn't change do callback
                callback()
            }
            else {
                viewAllConnections(callback, curPageHeight);
            }
        }, 1000)
    }
    else {
        callback();
    }
}

function totalConnectionsNumber() {
    let totalNumber_txt = document.querySelector(selectors.totalConnections).textContent.trim();
    return Number(totalNumber_txt.split(" ")[0]);
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
    return document.querySelectorAll(selectors.allConnectionsInfo);
}

function getOwnerName(){
    /* Returns name of the user/owner from page */
    return document.querySelector(selectors.connection.photo).alt;
}

function stripProfileInfo(profile, owner) {
    /* Creates object containing connection info from HTML and owner name
        Fields extracted: link, name, occupation
        Object keys: owner, link, name, occupation
    */

    return {
        owner: owner,
        link: profile.href,
        name: profile.querySelector(selectors.connection.name).textContent.trim(),
        occupation: profile.querySelector(selectors.connection.occupation).textContent.trim()
    }
}
