import { IPCConstants } from "../constants";

function pinTab(tab) {
  if (tab.pinned) {
    return;
  }
  chrome.tabs.update(tab.id, { pinned: true }, () => {
    console.log(`Pinned tab: ${tab.url}`);
  });
}

const handleMusicActiononTab = (message, tab) =>
  new Promise((resolve, reject) => {
    try {
      if (tab.audible) {
        //handle Youtube
        if (tab.url.includes("youtube")) {
          pinTab(tab);
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            args: [message, IPCConstants],
            func: (message, IPCConstants) => {
              try {
                const video = document.querySelector("video");
                console.log(message);
                if (video) {
                  if (message.action === IPCConstants.musicPlayer.next.action) {
                    const nextButton = document.querySelector(
                      "button.ytp-next-button"
                    );
                    console.log(nextButton);
                    if (nextButton) {
                      nextButton.click();
                    }
                  } else if (
                    message.action === IPCConstants.musicPlayer.play.action
                  ) {
                    console.log(video);
                    video.pause();
                    if (video.paused) {
                      // video.play();
                    } else {
                      // video.pause();
                    }
                  } else if (
                    message.action === IPCConstants.musicPlayer.prev.action
                  ) {
                  } else if (
                    message.action ===
                    IPCConstants.musicPlayer.queryMusic.action
                  ) {
                  }
                }
              } catch (error) {
                console.log(error);
              }
            },
          });
          resolve();
        }
      }
      reject();
    } catch (err) {
      reject(err);
    }
  });

export { pinTab, handleMusicActiononTab };
