test("Test Running", () => {});

const stripProfileInfo = require("../basics/connections");

test("Object creation from HTML describing a connection", () => {
    const fs = require('fs');
    const path = require('path');
    document.body.innerHTML = fs.readFileSync(
        path.resolve(__dirname, 'singleConnection.html'), 'utf8');
    let profileHTML = document.querySelector(".mn-connection-card__link");

    let link = window.location.origin + '/in/sebastianisaacs/';
    const owner = "Daivd";
    const profile = {
        owner: owner,
        link: link,
        name: "Sebastian Isaacs",
        occupation: "Co-Founder, London Blockchain Labs"
    };
    expect(stripProfileInfo(profileHTML, owner)).toEqual(profile);
});

