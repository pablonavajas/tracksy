test("Test Running", () => {});

const functions = require("../basics/connections");

const fs = require('fs');
const path = require('path');
document.body.innerHTML = fs.readFileSync(
    path.resolve(__dirname, 'fullPage.htm'), 'utf8');

const egPage = {
    owner : "David Hilman",
    totalConnections : 65,
    firstConnection : {
        owner : "David Hilman",
        link : "https://www.linkedin.com/in/ilyachudenkov/",
        name : "Ilya Chudenkov",
        occupation : "MSc Cognitive and Decision Science Graduate from University College London"
    }
};


test("Total number of connections is 65", () => {
    expect(functions.totalConnectionsNumber()).toBe(egPage.totalConnections);
});

test("List of HTML descriptions of all connections is length 65", () => {
    expect(functions.getConnectionsOnPage().length).toBe(egPage.totalConnections);
});

test("Gets name of the page owner (David Hilman)", () => {
    expect(functions.getOwnerName()).toEqual(egPage.owner);
});

test("Creates JSON object from HTML representation of connection", () => {
    let htmlConnection = functions.getConnectionsOnPage()[0];
    expect(functions.stripProfileInfo(htmlConnection, egPage.owner)).toEqual(egPage.firstConnection);
});

test("List of JSON connections created", () => {
    expect(functions.createListOfJSONConnections().length).toBe(65);
});

test("Callback in scroll after 1 scroll attempt when no scrolling possible", done => {
    global.scroll = jest.fn();
    global.scrollBy = jest.fn();
    functions.revealAllConnections(() => {
        expect(global.scroll).toBeCalled();
        expect(global.scroll).toBeCalled();
        done();
    }, (visibleN, totalN) => {
        expect(visibleN).toBe(65); expect(totalN).toBe(65)
    });
});


// test("Creation of JSON object from HTML for single connection", () => {
//     const fs = require('fs');
//     const path = require('path');
//     document.body.innerHTML = fs.readFileSync(
//         path.resolve(__dirname, 'singleConnection.html'), 'utf8');
//     let profileHTML = document.querySelector(".mn-connection-card__link");
//
//     let link = window.location.origin + '/in/sebastianisaacs/';
//     const owner = "Daivd";
//     const profile = {
//         owner: owner,
//         link: link,
//         name: "Sebastian Isaacs",
//         occupation: "Co-Founder, London Blockchain Labs"
//     };
//     expect(functions.stripProfileInfo(profileHTML, owner)).toEqual(profile);
// });

// test("Creation of JSON object from HTML for single connection", () => {
//     const fs = require('fs');
//     const path = require('path');
//     document.body.innerHTML = fs.readFileSync(
//         path.resolve(__dirname, 'complete.htm'), 'utf8');
//     let profileHTML = document.querySelector(".mn-connections__header");
//
//     console.log(profileHTML.textContent)
// });

