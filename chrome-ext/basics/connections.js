console.log("connections.js is running");

if (typeof chrome !== "undefined") {
    pageSetup();
} else {
    testSetup();
}

function testSetup() {
    const functions = {
        revealAllConnections : revealAllConnections,
        totalConnectionsNumber : totalConnectionsNumber,
        getConnectionsOnPage : getConnectionsOnPage,
        getOwnerName : getOwnerName,
        stripProfileInfo : stripProfileInfo,
        createListOfJSONConnections : createListOfJSONConnections
    };
    module.exports = functions;
}

let status = {
    reset: false
}

function pageSetup() {
    chrome.runtime.onMessage.addListener((message, sender) => {
        if (message.getConnections !== undefined){
            status.reset = false;

            function sendConnectionsToBackground() {
                let profiles_list = createListOfJSONConnections();
                chrome.runtime.sendMessage({profiles: profiles_list});
            }

            function sendProgress(visibleN, totalN) {
                let progress = (100 * visibleN / totalN).toString() + "%";
                chrome.runtime.sendMessage({progress: progress});
            }
            
            revealAllConnections(sendConnectionsToBackground, sendProgress);
        }
        
        if (message.reset !== undefined) {
            status.reset = true;
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


function revealAllConnections(callback, progressUpdate) {
    /* Scrolls to bottom of the page to reveal more connections.
        Recursive until scrolling does not result in change of page height
        */
    if (status.reset) {
        return;
    }
    let visibleConnections = getConnectionsOnPage().length;
    let totalConnections = totalConnectionsNumber();
    progressUpdate(visibleConnections, totalConnections);

    let scrollTo = document.body.scrollHeight;
    window.scroll(0, scrollTo);
    setTimeout(() => {
        window.scroll(0, 0);

        // Wait for page to lazy load
        setTimeout(() => {
            let difference = Math.abs((visibleConnections - totalConnections));
            (scrollTo === document.body.scrollHeight && difference < 2) ?
                callback() : revealAllConnections(callback, progressUpdate)
        }, Math.random()*3000+1500);
    }, Math.random()*1000+100);
}


function totalConnectionsNumber() {
    /* Number of total connections as displayed at the top of the page */
    let totalNumber_txt = document.querySelector(selectors.totalConnections).textContent.trim();
    return Number(totalNumber_txt.split(" ")[0]);
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
