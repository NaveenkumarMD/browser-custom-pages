const mainelement = document.getElementById("main")
const shuffleelement = document.getElementById("shuffle")
const selectwallpaperelement=document.getElementById("select-wallpaper")
//-----------------------------------------------------
//get a random unsplash image with tag nature
//-----------------------------------------------------

var currwallpapertag="nature"
const wallpapertag=localStorage.getItem("wallpapertag")
if(wallpapertag){
    currwallpapertag=wallpapertag
    getwallpaper()
}

function getwallpaper(){
    fetch(`https://source.unsplash.com/random/1920x1080/?${currwallpapertag}`)
    .then(response => response.blob())
    .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        mainelement.style.background = `url(${objectURL})`
        mainelement.style.cssText +=
        `
        height:100vh;
        background-repeat: none;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        color:var(--text-color)
        `
    })
}



shuffleelement.addEventListener("click", () => {
    getwallpaper()
})

//---------------------------------------------------------------
//set wallpaper tag
//---------------------------------------------------------------
var wallpapertaginput
selectwallpaperelement.addEventListener("click",()=>{
    wallpapertaginput=window.prompt("Enter the wallaper keyword")
    localStorage.setItem("wallpapertag",wallpapertaginput)
    currwallpapertag=wallpapertaginput
    getwallpaper()
})



// var hours_so_far=localStorage.getItem("hours_so_far") || 0
// const hours_so_far_node=document.getElementById("hours_so_far")
// // hours_so_far_node.innerHTML=hours_so_far
// const increase_time=document.getElementById("increase-time")
// increase_time.addEventListener("click", () => {
//     hours_so_far++
//     localStorage.setItem("hours_so_far", Number(hours_so_far))
//     hours_so_far_node.innerHTML=Number(hours_so_far)
// })