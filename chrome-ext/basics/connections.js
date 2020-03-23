console.log("connections.js is running");

if (typeof chrome !== "undefined") {
    pageSetup();
} else {
    testSetup();
}

function testSetup() {
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


function pageSetup() {
    chrome.runtime.sendMessage({status: status});

    chrome.runtime.onMessage.addListener((message, sender) => {
        if (message.getConnections !== undefined){
            scrollToVeryBottom(status);
        }
    })
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


function scrollToVeryBottom(status) {
    /* Scrolls to bottom of the page to reveal more connections.
        Recursive until scrolling does not result in change of page height
        */
    let progress = ((getConnectionsOnPage().length + 1) / totalConnectionsNumber()) * 100;
    let strProgress = progress.toString() + "%";
    chrome.runtime.sendMessage({progress : strProgress}); // sends progress update

    if (progress === 100) {
        sendConnectionsDataToBackground();
    } else {
        let scrollTo = document.body.scrollHeight;
        window.scroll(0, scrollTo);
        setTimeout(() => {
            window.scroll(0, 0);

            // Wait for page to lazy load
            setTimeout(() => {
                scrollToVeryBottom(status);
            }, 1000);
        }, 100);
    }
}


function totalConnectionsNumber() {
    /* Number of total connections as displayed at the top of the page */
    let totalNumber_txt = document.querySelector(selectors.totalConnections).textContent.trim();
    return Number(totalNumber_txt.split(" ")[0]);
}

function sendConnectionsDataToBackground() {
    let profiles_list = createListOfJSONConnections();
    chrome.runtime.sendMessage({profiles: profiles_list});
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
