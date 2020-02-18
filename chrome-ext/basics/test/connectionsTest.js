describe("Object creation from HTML describing a connection", () => {
    const owner = "Daivd";
    const link = window.location.origin + '/in/sebastianisaacs/';
    const profile = {
        owner: owner,
        link: link,
        name: "Sebastian Isaacs",
        occupation: "Co-Founder, London Blockchain Labs"
    };
    it("Returns " + JSON.stringify(profile), () => {
        const profileHTML = document.body.querySelector(".mn-connection-card__link");
        expect(stripProfileInfo(profileHTML, owner)).toEqual(profile);
    });
});
