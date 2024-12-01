import { IPCConstants } from "../constants";
import { handleMusicActiononTab } from "./musicControls";

function handleMusic(message, sender, sendResponse) {
  chrome.tabs.query({ audible: true }, async (tabs) => {
    if (tabs.length > 0) {
      for (const tab of tabs) {
        try {
          await handleMusicActiononTab(message, tab, sendResponse);
          break;
        } catch (error) {
          // Ignore the current tab try the next tab
        }
      }
    }
  });
}

function fetchMusicInfo(message, sender, sendResponse) {
  chrome.tabs.query({ audible: true }, (tabs) => {
    if (tabs.length > 0) {
      for (const tab of tabs) {
        try {
          const data = {
            title: tab.title,
            icon: tab.favIconUrl,
            audible: tab.audible,
          };
          sendResponse(data);
          break;
        } catch (error) {
          console.log(error);
          sendResponse(error);
        }
      }
    }
  });
  return true;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (
    message.control === IPCConstants.musicPlayer.next.control &&
    message.action === IPCConstants.musicPlayer.queryCurrentMusic.action
  ) {
    fetchMusicInfo(message, sender, sendResponse);
    return true;
  } else {
    handleMusic(message, sender, sendResponse);
  }
});
