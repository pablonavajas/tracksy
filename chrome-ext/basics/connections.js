console.log("connections.js is running");

if (typeof chrome !== "undefined") {
    chrome.runtime.onMessage.addListener(connectionRetrieval);
} else {
    const functions = {
        scrollToVeryBottom : scrollToVeryBottom,
        totalConnectionsNumber : totalConnectionsNumber,
        getConnectionsOnPage : getConnectionsOnPage,
        getOwnerName : getOwnerName,
        stripProfileInfo : stripProfileInfo,
        createListOfJSONConnections : createListOfJSONConnections
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
    console.log("received message");
    scrollToVeryBottom(sendConnectionsDataToBackground);
}

function scrollToVeryBottom(callback, scrollTo = document.body.scrollHeight) {
    /* Scrolls to bottom of the page with 1 sec wait, until scroll does not change the page
        Note: if page doesn't change callback will be called

        TODO: how long to wait for page to load?
        */
    window.scroll(0, scrollTo);
    setTimeout( () => {
        window.scrollBy(0, -1000);
        let curHeight = document.body.scrollHeight;
        (curHeight === scrollTo) ?  callback() : scrollToVeryBottom(callback, curHeight);
    }, 1000);
}

function totalConnectionsNumber() {
    /* Number of total connections as displayed at the top of the page */
    let totalNumber_txt = document.querySelector(selectors.totalConnections).textContent.trim();
    return Number(totalNumber_txt.split(" ")[0]);
}

function sendConnectionsDataToBackground() {
    let profiles_list = createListOfJSONConnections();

    chrome.runtime.sendMessage(profiles_list);
}

function createListOfJSONConnections() {
    /* Formats the connection data into list of JSON objects

    [ { owner: "zzz", link: "https://xxx", name: "xxx", occupation: "yyy" }, ... ]
    */
    const owner = getOwnerName();
    const htmlConnections = getConnectionsOnPage();
    let profiles_list = [];
    htmlConnections.forEach(function(profileHTML) {
            const profile = stripProfileInfo(profileHTML, owner);
            profiles_list.push(profile);
        }
    );

    return profiles_list;
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
