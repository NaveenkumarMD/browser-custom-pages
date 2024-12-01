import { createApi } from "unsplash-js";

const mainelement = document.getElementById("main");
const shuffleelement = document.getElementById("shuffle");
const selectwallpaperelement = document.getElementById("select-wallpaper");

//-----------------------------------------------------
//get a random unsplash image with tag nature
//-----------------------------------------------------

const api = createApi({
  accessKey: "57-h-ID7kXYDAIERv4hZskagvVtiN7myPI3rJXSE3io",
});

var currwallpapertag = "nature";
const wallpapertag = localStorage.getItem("wallpapertag");
if (wallpapertag) {
  currwallpapertag = wallpapertag;
  getwallpaper();
}
function getwallpaper() {
  api.photos
    .getRandom({
      orientation: "landscape",
      count: 1,
      query: currwallpapertag,
    })
    .then((res) => {
      const response = res.response;
      const imageLink = response[0].urls.full;
      mainelement.style.background = `url(${imageLink})`;
      mainelement.style.cssText += `
        height:100vh;
        background-repeat: none;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        color:var(--text-color)
        `;
      console.log("set");
    })

    .catch((err) => {
      console.log(err);
    });
}

shuffleelement.addEventListener("click", () => {
  getwallpaper();
});

//---------------------------------------------------------------
//set wallpaper tag
//---------------------------------------------------------------
var wallpapertaginput;
selectwallpaperelement.addEventListener("click", () => {
  wallpapertaginput = window.prompt("Enter the wallaper keyword");
  localStorage.setItem("wallpapertag", wallpapertaginput);
  currwallpapertag = wallpapertaginput;
  getwallpaper();
});
