const linkedIn_url = "https://www.linkedin.com/mynetwork/invite-connect/connections/";

const btnGoToLinkedIn = document.body.querySelector("#btnToLinkedIn");
const btnGetConnections = document.body.querySelector("#btnConnections");
const btnSuccess = document.body.querySelector("#success");
const btnReset = document.body.querySelector("#reset");


class Btns {
    progressBar(toDisplay, progress) {
        document.body.querySelector("#progress").hidden = !toDisplay
        if (progress !== undefined) {
            document.body.querySelector(".progress-bar").style.width = progress
        }
    }
    
    constructor(tab) {
        this.init(tab);
        chrome.runtime.sendMessage({popupActivated: true});
    }

    init(tab) {
        this.success = false;
        this.inProgress = false;
        this.progress = "0%";

        this.updateTab(tab);

        btnGetConnections.addEventListener("click",
            () => chrome.runtime.sendMessage({getConnections: {tabId: this.tab.id}}));

        btnReset.addEventListener("click",
            () => this.reset());
    }

    updateTab(tab){
        this.tab = tab;
        this.onLinkedIn = (this.tab.url === linkedIn_url);
        this.loading = (this.tab.status === "loading");

        btnGoToLinkedIn.addEventListener("click",
            () => chrome.tabs.update(this.tab.id, {url: linkedIn_url}),
            {once: true});


        chrome.tabs.onUpdated.addListener((tabID, change, tab) => {
            if (this.tab.id === tabID) {
                this.updateTab(tab);
                this.update();
            }
        });
    }

    reset() {
        this.init(this.tab);
        chrome.runtime.sendMessage({reset: true});
    }

    update() {
        btnReset.hidden = false;
        if (this.success){
            btnGoToLinkedIn.hidden = true;
            btnGetConnections.hidden = true;
            this.progressBar(false)
        } else {
            btnGetConnections.hidden = !this.onLinkedIn;
            btnGetConnections.disabled = this.loading;
            btnGoToLinkedIn.hidden = this.onLinkedIn;
            this.progressBar(this.inProgress, this.progress)
        }
    }
}


function setUp(curTab) {
    btns = new Btns(curTab);

    chrome.runtime.onMessage.addListener((message, sender) => {
        if (message.status !== undefined) {
            console.log("message from background");
            btns.success = message.status.success;
            btns.inProgress = message.status.inProgress;
            btns.progress = message.status.progress;
            btns.update();
        }
    });
}


let btns = undefined;
let params = {active: true, currentWindow: true};
chrome.tabs.query(params, tabs => setUp(tabs[0]));
