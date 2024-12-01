import { IPCConstants } from "../../constants";

document.getElementById("music-play").addEventListener("click", () => {
  chrome.runtime.sendMessage(IPCConstants.musicPlayer.play);
});

document.getElementById("music-next").addEventListener("click", () => {
  chrome.runtime.sendMessage(IPCConstants.musicPlayer.next);
});

document.getElementById("music-prev").addEventListener("click", () => {
  chrome.runtime.sendMessage(IPCConstants.musicPlayer.prev);
});

function setMusicDetails(response) {
  document.getElementById("music-title").innerText = response.title;
  document.getElementById("music-icon").src = response.icon;
  if (response.audible) {
    document.getElementById("pause-icon").style.display = "block";
    document.getElementById("play-icon").style.display = "none";
  } else {
    document.getElementById("pause-icon").style.display = "none";
    document.getElementById("play-icon").style.display = "block";
  }
}

function queryCurrentMusic() {
  console.log("queryCurrentMusic send");
  chrome.runtime.sendMessage(
    IPCConstants.musicPlayer.queryCurrentMusic,
    (response) => {
      setMusicDetails(response);
    }
  );
}
queryCurrentMusic();
