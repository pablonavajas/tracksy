console.log("background.js running");

// const linkedIn_url = "https://www.linkedin.com/mynetwork/invite-connect/connections/";
const baseURL = "http://127.0.0.1:8000/api/";
const connectionsURL = baseURL + "connections";
const logInURL = baseURL + "auth/login";

let status = {
  success: false,
  tabId: undefined,
  loaded: false,
  inProgress: false,
  progress: "0%",
  token: undefined,
  auth: false
};

chrome.runtime.onMessage.addListener((message, sender) => {
  // TODO: check where the message is coming from (e.g. sender.tab.url)
  if (message.connections !== undefined) {
    sendpost(message.connections);
  } else if (message.getConnections !== undefined) {
    status.inProgress = true;
    status.tabId = message.getConnections.tabId;
    chrome.tabs.sendMessage(status.tabId, { getConnections: true });
    sendStatus();
  } else if (message.progress !== undefined) {
    status.progress = message.progress;
    sendStatus()
  } else if (message.popupActivated !== undefined) {
    sendStatus()
  } else if (message.reset !== undefined) {
    status.success = false;
    status.inProgress = false;
    status.progress = "0%";
    chrome.tabs.sendMessage(status.tabId, { getConnections: true });
    status.tabId = undefined;
    sendStatus()
  } else if (message.username !== undefined) {
    logIn(message.username, message.password);
  } else if (message.loaded !== undefined) {
    status.loaded = true;
    sendStatus()
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

  fetch("http://127.0.0.1:8000/api/connections", options).then((response) => {
    status.success = true;
    sendStatus();
  })
}

function sendStatus() {
  console.log(status);
  chrome.runtime.sendMessage({status: status})
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
      status.token = data.token;
      status.auth = true;
      console.log(status.token);
      sendStatus()
    });
  });
  // TODO: Catch error
}

