console.log("background.js running");

// const linkedIn_url = "https://www.linkedin.com/mynetwork/invite-connect/connections/";

let status = {
  success: false,
  tabId: undefined,
  inProgress: false,
  progress: "0%",
  username: "david"
};

chrome.runtime.onMessage.addListener((message, sender) => {
  // TODO: check where the message is coming from (e.g. sender.tab.url)
  if (message.connections !== undefined) {
    status.success = true;
    // Let the popup know
    sendpost(message.connections);
    chrome.runtime.sendMessage({ status: status });
  } else if (message.getConnections !== undefined) {
    status.inProgress = true;
    status.tabId = message.getConnections.tabId;
    chrome.tabs.sendMessage(status.tabId, { getConnections: true });
    chrome.runtime.sendMessage({ status: status });
  } else if (message.progress !== undefined) {
    status.progress = message.progress;
    chrome.runtime.sendMessage({ status: status });
  } else if (message.popupActivated !== undefined) {
    chrome.runtime.sendMessage({ status: status });
  } else if (message.reset !== undefined) {
    status.success = false;
    status.inProgress = false;
    status.progress = "0%";
    chrome.tabs.sendMessage(status.tabId, { getConnections: true });
    status.tabId = undefined;
    chrome.runtime.sendMessage({ status: status });
  }
});

function sendpost(connections) {
  let data = {
    "username": status.username,
    "connections": connections
  };
  console.log(data);
  console.log("Sending data!");
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  chrome.runtime.sendMessage({ connectionsSent: true });

  fetch("http://127.0.0.1:8000/api/connections", options);
}
