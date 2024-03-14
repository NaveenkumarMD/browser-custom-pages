const stackoverflow_conatiner_Node = document.getElementById('reputations');
const stackoverflow_badges_Node = document.getElementById('badges');
var silver_node = document.getElementById('silver');
var gold_node = document.getElementById('gold');
var bronze_node = document.getElementById('bronze');
let url = "https://stackoverflow.com/users/flair/14353744.json"
fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)

    .then(res => res.json()).then(res => {
        res=JSON.parse(res.contents)
        stackoverflow_conatiner_Node.innerHTML = res.reputation;
        var silver;
        var gold;
        var bronze;
        var regex = />\d+</gm;
        let re = new RegExp(regex);
        //badgeHtml matchall
        let badges = []
        let matches = res.badgeHtml.matchAll(re);
        for (let match of matches) {
            badges.push(match[0].replace("<", "").replace(">", ""));
        }
        if (badges.length == 2) {
            silver = badges[0];
            bronze = badges[1];
            gold = 0
        }
        else if (badges.length == 3) {
            gold = badges[0];
            silver = badges[1];
            bronze = badges[2];
        }
        else {
            bronze = badges[0];
            gold = 0;
            silver = 0;
        }
        silver_node.innerHTML = silver;
        gold_node.innerHTML = gold;
        bronze_node.innerHTML = bronze;
    })
    .catch(err => console.log(err));

//----------------------------------------------------------------------
//weather api -https://openweathermap.org/current
//-----------------------------------------------------------------------

function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    getWeather(position.coords.latitude, position.coords.longitude)
}

function getWeather(lat, long) {
    const apiKey = "e60e15db98e641648d2634eb2cb1c92f";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;

    let location=document.getElementById("_location")
    let temp=document.getElementById("_temp")

    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then(data =>{
            let parsedData=JSON.parse(data.contents)
            console.log(parsedData)
            location.innerHTML=parsedData.name
            temp.innerHTML=parsedData.main.temp
        });
}

getLocation()


