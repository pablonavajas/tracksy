console.log("background.js running");

const linkedInURL = "https://www.linkedin.com/mynetwork/invite-connect/connections/";
const baseURL = "http://127.0.0.1:8000/api/";
const connectionsURL = baseURL + "connections";
const logInURL = baseURL + "auth/login";

let status = {
  status: true,
  success: false,
  onLinkedIn: false,
  loaded: false,
  inProgress: false,
  progress: "0%",
  token: undefined,
  auth: false,
  authError: undefined
};

let tab = undefined;

function updateTab() {
  let params = {active: true, currentWindow: true};
  chrome.tabs.query(params, (tabs) => {
    tab = tabs[0];
    console.log("TAB updating to:", tab);
    status.onLinkedIn = (tab.url === linkedInURL);
    status.loaded = (status.onLinkedIn && tab.status === "complete");
    sendStatus()
  });
}

function reset() {
  status.success = false;
  status.inProgress = false;
  status.progress = "0%";
  chrome.tabs.sendMessage(tab.id, {reset: true});
  sendStatus();
}

function sendStatus() {
  console.log(status);
  console.log("status is ", status);
  chrome.runtime.sendMessage(status);
}

chrome.runtime.onMessage.addListener((message, sender) => {
  // Message from popup
  console.log("Message", message);
  if (sender.url.includes("popup")){
    if (message.status !== undefined) {
      updateTab();
    }
    else if (message.username !== undefined) {
      logIn(message.username, message.password)
    } else if (message.goto !== undefined) {
      chrome.tabs.update(tab.id, {url: linkedInURL}, (tab) => {
        status.onLinkedIn = true;
        sendStatus();
      })
    } else if (message.getConnections !== undefined) {
      status.inProgress = true;
      chrome.tabs.sendMessage(tab.id, {getConnections: true});
      sendStatus()
    } else if (message.reset !== undefined) {
      reset();
    }

  // Message from linkedin tab
  } else if (sender.url.includes("linkedin")) {
    if (message.connections !== undefined) {
      sendpost(message.connections)
    } else if (message.loaded !== undefined) {
      status.loaded = true;
      sendStatus()
    } else if (message.progress !== undefined) {
      status.progress = message.progress;
      sendStatus()
    }
  }
});

function sendpost(connections) {
  console.log(connections);
  console.log("Sending data!");
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + status.token
    },
    body: JSON.stringify({"connections": connections})
  };

  chrome.runtime.sendMessage({ connectionsSent: true });

  fetch(connectionsURL, options).then((response) => {
    status.success = true;
    sendStatus();
  })
}


function logIn(username, password) {
  console.log("in login");
  let data = {
    "username": username,
    "password": password
  };
  console.log(data);
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };

  fetch(logInURL, options).then((response) => {
    console.log(response);
    response.json().then(data => {
      if (data.token !== undefined) {
        status.token = data.token;
        status.auth = true;
        sendStatus()
      } else {
        chrome.runtime.sendMessage({alert: "Incorrect credentials for Tracksy"});
      }
    });
  }).catch(() => {
    chrome.runtime.sendMessage({alert: "Cannot connect to Tracksy"});
  });
}

