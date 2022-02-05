const mainelement = document.getElementById("main")
const shuffleelement = document.getElementById("shuffle")
//-----------------------------------------------------
//get a random unsplash image with tag nature
//-----------------------------------------------------
function getwallpaper(){
    fetch("https://source.unsplash.com/random/1920x1080/?dark")
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
getwallpaper()

var hours_so_far=localStorage.getItem("hours_so_far") || 0
const hours_so_far_node=document.getElementById("hours_so_far")
hours_so_far_node.innerHTML=hours_so_far
const increase_time=document.getElementById("increase-time")
increase_time.addEventListener("click", () => {
    hours_so_far++
    localStorage.setItem("hours_so_far", Number(hours_so_far))
    hours_so_far_node.innerHTML=Number(hours_so_far)
})