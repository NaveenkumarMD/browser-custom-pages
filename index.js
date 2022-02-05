//----------------------------------------------------------------------------
// Main variables
//----------------------------------------------------------------------------

var SearchEngine = "google"
const input_field = document.getElementById("search-input");
const search_button = document.getElementById("search-button");
const extensions_list_node = document.getElementById("extensions-list");
//----------------------------------------------------------------------------
//Foucs on search field on page load
//----------------------------------------------------------------------------
// input_field.focus()



//----------------------------------------------------------------------------
//Button shortcuts
//----------------------------------------------------------------------------
input_field.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        search_button.click();
    }
})

document.body.addEventListener("keyup", function (event) {

    if (event.altKey && event.keyCode == 71) {
        event.preventDefault();
        window.location.href = ("https://github.com/")
    }
    if (event.altKey && event.keyCode == 83) {
        event.preventDefault();
        window.location.href = ("https://stackoverflow.com/")
    }
    if (event.altKey && event.keyCode == 72) {
        event.preventDefault();
        window.location.href = ("https://www.hackerrank.com/")
    }
    if (event.altKey && event.keyCode == 89) {
        event.preventDefault();
        window.location.href = ("https://www.youtube.com/")
    }
    if (event.altKey && event.keyCode == 76) {
        event.preventDefault();
        window.location.href = ("https://www.leetcode.com/")
    }
})

//----------------------------------------------------------------------------
// Get a random string 
//----------------------------------------------------------------------------
function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//----------------------------------------------------------------------------
//Search button click handler which stores the data in local storage on successfull search
//Sorting of recommendations are based on frequency of search
//----------------------------------------------------------------------------
search_button.addEventListener("click", function () {
    const search_value = input_field.value;
    if (search_value.length === 0 || search_value === null || search_value === undefined) {
        return;
    }
    var search_data = {
        search_value: search_value,
        search_engine: SearchEngine,
        time: new Date().getTime(),
        key: randomString(10),
        frequency: 1
    }
    var search_data_list = localStorage.getItem("search_data_list") || []
    search_data_list = search_data_list.length > 0 ? JSON.parse(search_data_list) : []
    console.log(search_data_list)
    //check for same search_value and search_engine
    var same_search_data = search_data_list.filter(function (search_data_item) {
        return search_data_item.search_value == search_data.search_value && search_data_item.search_engine == search_data.search_engine
    })
    if (same_search_data.length > 0) {
        same_search_data[0].time = search_data.time
        same_search_data[0].key = search_data.key
        same_search_data[0].frequency = same_search_data[0].frequency + 1
    } else {
        search_data_list.push(search_data)
    }
    localStorage.setItem("search_data_list", JSON.stringify(search_data_list))

    //----------------------------------------------------------------------------
    //Direct shortcuts 
    //----------------------------------------------------------------------------
    if (search_value.toLowerCase() === "github") {
        input_field.value = "";
        return window.location.href = "https://github.com"
    }
    if (search_value.toLowerCase() === "stackoverflow" || search_value.toLowerCase() === "stack") {
        input_field.value = "";
        return window.location.href = "https://stackoverflow.com"
    }
    if (search_value.toLowerCase() === "hackerrank") {
        input_field.value = "";
        return window.location.href = "https://www.hackerrank.com"
    }
    if (search_value.toLowerCase() === "youtube") {
        input_field.value = "";
        return window.location.href = "https://www.youtube.com"
    }
    if (search_value.toLowerCase() === "leetcode" || search_value.toLowerCase() === "leet") {
        input_field.value = "";
        return window.location.href = "https://leetcode.com"
    }

    window.location.href = "https://www.google.com/search?q=" + search_value;
    switch (SearchEngine) {
        case "google":
            window.location.href = "https://www.google.com/search?q=" + search_value;
            break;
        case "duckduckgo":
            window.location.href = "https://duckduckgo.com/?q=" + search_value;
            break;
        case "bing":
            window.location.href = "https://www.bing.com/search?q=" + search_value;
            break;
        case "yahoo":
            window.location.href = "https://search.yahoo.com/search?p=" + search_value;
            break;
        case "instagram":
            window.location.href = "https://www.instagram.com/explore/tags/" + search_value;
            break;
        case "youtube":
            window.location.href = "https://www.youtube.com/results?search_query=" + search_value;
            break;
    }
    input_field.value = "";
})

//----------------------------------------------------------------------------
//Clock functions
//----------------------------------------------------------------------------

setInterval(function () {
    var today = new Date();
    var date = today.getDate()
    var day = today.getDay()
    var dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    day = dayArr[day]
    var month = today.getMonth()
    var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    month = monthArr[month]
    var year = today.getFullYear()
    var hour = today.getHours()
    var minute = today.getMinutes()
    var second = today.getSeconds()
    //get am or pm
    var ampm = "AM"
    if (hour > 12) {
        hour = hour - 12
        ampm = "PM"
    }
    if (hour == 0) {
        hour = 12
    }
    if (hour < 10) {
        hour = "0" + hour
    }
    if (minute < 10) {
        minute = "0" + minute
    }
    if (second < 10) {
        second = "0" + second
    }

    var time = document.getElementById('time')
    var date_node = document.getElementById('date')
    time.innerHTML = day + " " + hour + ":" + minute + ":" + second + " " + ampm
    date_node.innerHTML = month + " " + date
    var weather_date_node = document.getElementById('weather-date')
    weather_date_node.innerHTML = month + " " + date
}, 0)

var selectorbuttonnode = document.getElementById("engine-selector")
var enginelist = document.getElementById("engine-selector-list")
selectorbuttonnode.addEventListener("click", function () {
    enginelist.classList.toggle("show")

})

//----------------------------------------------------------------------------
//Engine selector click handler
//----------------------------------------------------------------------------
var InstaEngineNode = document.getElementById("instaclick")
var YoutubeEngineNode = document.getElementById("youtubeclick")
var bingEngineNode = document.getElementById("bingclick")
var googleEngineNode = document.getElementById("googleclick")
var duckEngineNode = document.getElementById("duckclick")

var selectedEngineNode = document.getElementById("selectedEngine")

InstaEngineNode.addEventListener("click", function () {
    selectedEngineNode.src = "./Assets/icons/instagram.svg"
    enginelist.classList.remove("show")
    SearchEngine = "instagram"
})
YoutubeEngineNode.addEventListener("click", function () {
    selectedEngineNode.src = "./Assets/icons/youtube.svg"
    enginelist.classList.toggle("show")
    SearchEngine = "youtube"
})
bingEngineNode.addEventListener("click", function () {
    selectedEngineNode.src = "./Assets/icons/bing.svg"
    enginelist.classList.toggle("show")
    SearchEngine = "bing"
})
googleEngineNode.addEventListener("click", function () {
    selectedEngineNode.src = "./Assets/icons/google.svg"
    enginelist.classList.toggle("show")
    SearchEngine = "google"
})
duckEngineNode.addEventListener("click", function () {
    selectedEngineNode.src = "./Assets/icons/duckduckgo.svg"
    enginelist.classList.toggle("show")
    SearchEngine = "duckduckgo"
})



var search_recommendations = document.getElementById('search-recommendations')
var search_data_list = JSON.parse(localStorage.getItem("search_data_list")) || []
//----------------------------------------------------------------------------
//Search Recommendations sort by frequency
//----------------------------------------------------------------------------
search_data_list.sort(function (a, b) {
    return b.frequency - a.frequency
})
let search_recommendations_content = ""
input_field.addEventListener("keyup", function (event) {
    let input_value = input_field.value
    let arr = []
    let arr1=new Set()
    search_data_list.length > 0 && search_data_list.forEach(search_data => {
        if (search_data.search_value.toLowerCase().indexOf(input_value) > -1) {
            if(!arr1.has(search_data.search_value)){
                arr.push(search_data)
                arr1.add(search_data.search_value)
            }
        
        }
    })
    setRecommendations(arr)
})
const favourites_element=document.getElementById('favourites')
function setRecommendations(arr) {
    favourites_element.innerHTML=""
    search_recommendations_content = ""
    search_recommendations.innerHTML = ""
    arr.forEach(search_data => {
        let search_engine_icon = search_data.search_engine
        console.log(search_engine_icon)
        var search_recommendations_node = document.createElement('div')
        search_recommendations_node.classList.add('search-recommended-text')
        var icons_node = document.createElement('div')
        var upward_arrow_node = document.createElement('img')
        upward_arrow_node.src = "./Assets/icons/arrow-upward.png"
        upward_arrow_node.classList.add('upward-arrow')
        var close_icon = document.createElement('img')
        close_icon.src = "./Assets/icons/close.png"
        close_icon.classList.add('clear-logo')
        icons_node.appendChild(upward_arrow_node)
        icons_node.appendChild(close_icon)
        upward_arrow_node.addEventListener('click', () => {
            input_field.value = search_data.search_value
        })
        close_icon.addEventListener('click', () => {
            search_data_list.splice(search_data_list.indexOf(search_data), 1)
            localStorage.setItem("search_data_list", JSON.stringify(search_data_list))
            search_recommendations_node.remove()
        })

        var one_search_data_node = document.createElement('div')
        one_search_data_node.classList.add('one')
        var search_engine_icon_node = document.createElement('div')
        var search_engine_icon_img_node = document.createElement('img')
        search_engine_icon_img_node.src = "./Assets/icons/" + search_engine_icon + ".svg"
        search_engine_icon_img_node.classList.add('search-recommendations-logo')
        var search_value_text_node = document.createElement('div')
        search_value_text_node.classList.add('search-value-recommendation')
        search_value_text_node.innerHTML = search_data.search_value

        search_value_text_node.addEventListener('click', () => {
            input_field.value = search_data.search_value
            search_button.click()
        })

        one_search_data_node.appendChild(search_engine_icon_node)
        one_search_data_node.appendChild(search_value_text_node)
        search_engine_icon_node.appendChild(search_engine_icon_img_node)
        search_recommendations_node.appendChild(one_search_data_node)
        search_recommendations_node.appendChild(icons_node)
        search_recommendations.appendChild(search_recommendations_node)
    })
}


input_field.addEventListener('focusin', () => {
    search_recommendations.classList.add("search-recommendations-show")
})

//----------------------------------------------------------------------------
//Get a random quote and display it
//----------------------------------------------------------------------------
var randomQuote;
const QuoteapiUrl = "https://type.fit/api/quotes";
//----------------------------------------------------------------------------
//Quotes are stored in an array in localstorage and directly accessed from there to reduce the data usage.
//----------------------------------------------------------------------------
const Quotes_from_local = JSON.parse(localStorage.getItem("quotes_from_local")) ? QuotesfromLocal() : Quotesres()

function Quotesres() {
    fetch(QuoteapiUrl).then(res => res.json()).then(res => {
        localStorage.setItem("quotes_from_local", JSON.stringify(res))
        randomQuote = res[Math.floor(Math.random() * res.length)];
        var random_Quote_node = document.getElementById('random-quote')
        random_Quote_node.innerHTML = randomQuote.text || ""
        var author_node = document.getElementById('author')
        author_node.innerHTML = "- " + randomQuote.author || ""
    })
}
function QuotesfromLocal() {
    var res = JSON.parse(localStorage.getItem("quotes_from_local"))
    randomQuote = res[Math.floor(Math.random() * res.length)];
    var random_Quote_node = document.getElementById('random-quote')
    random_Quote_node.innerHTML = randomQuote.text || ""
    var author_node = document.getElementById('author')
    author_node.innerHTML = "- " + randomQuote.author || ""
}
