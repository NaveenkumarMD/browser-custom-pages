//----------------------------------------------------------------------------
// Main variables
//----------------------------------------------------------------------------

var SearchEngine = "google";
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
});

document.body.addEventListener("keyup", function (event) {
  if (event.altKey && event.keyCode == 71) {
    event.preventDefault();
    window.location.href = "https://github.com/";
  }
  if (event.altKey && event.keyCode == 83) {
    event.preventDefault();
    window.location.href = "https://stackoverflow.com/";
  }
  if (event.altKey && event.keyCode == 72) {
    event.preventDefault();
    window.location.href = "https://www.hackerrank.com/";
  }
  if (event.altKey && event.keyCode == 89) {
    event.preventDefault();
    window.location.href = "https://www.youtube.com/";
  }
  if (event.altKey && event.keyCode == 76) {
    event.preventDefault();
    window.location.href = "https://www.leetcode.com/";
  }
});

//----------------------------------------------------------------------------
// Get a random string
//----------------------------------------------------------------------------
function randomString(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

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
  if (
    search_value.length === 0 ||
    search_value === null ||
    search_value === undefined
  ) {
    return;
  }
  var search_data = {
    search_value: search_value,
    search_engine: SearchEngine,
    time: new Date().getTime(),
    key: randomString(10),
    frequency: 1,
  };
  var search_data_list = localStorage.getItem("search_data_list") || [];
  search_data_list =
    search_data_list.length > 0 ? JSON.parse(search_data_list) : [];
  console.log(search_data_list);
  //check for same search_value and search_engine
  var same_search_data = search_data_list.filter(function (search_data_item) {
    return (
      search_data_item.search_value == search_data.search_value &&
      search_data_item.search_engine == search_data.search_engine
    );
  });
  if (same_search_data.length > 0) {
    same_search_data[0].time = search_data.time;
    same_search_data[0].key = search_data.key;
    same_search_data[0].frequency = same_search_data[0].frequency + 1;
  } else {
    search_data_list.push(search_data);
  }
  localStorage.setItem("search_data_list", JSON.stringify(search_data_list));

  //----------------------------------------------------------------------------
  //Direct shortcuts
  //----------------------------------------------------------------------------
  if (search_value.toLowerCase() === "github") {
    input_field.value = "";
    return (window.location.href = "https://github.com");
  }
  if (
    search_value.toLowerCase() === "stackoverflow" ||
    search_value.toLowerCase() === "stack"
  ) {
    input_field.value = "";
    return (window.location.href = "https://stackoverflow.com");
  }
  if (search_value.toLowerCase() === "hackerrank") {
    input_field.value = "";
    return (window.location.href = "https://www.hackerrank.com");
  }
  if (search_value.toLowerCase() === "youtube") {
    input_field.value = "";
    return (window.location.href = "https://www.youtube.com");
  }
  if (
    search_value.toLowerCase() === "leetcode" ||
    search_value.toLowerCase() === "leet"
  ) {
    input_field.value = "";
    return (window.location.href = "https://leetcode.com");
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
      window.location.href =
        "https://search.yahoo.com/search?p=" + search_value;
      break;
    case "instagram":
      window.location.href =
        "https://www.instagram.com/explore/tags/" + search_value;
      break;
    case "youtube":
      window.location.href =
        "https://www.youtube.com/results?search_query=" + search_value;
      break;
  }
  input_field.value = "";
});

//----------------------------------------------------------------------------
//Clock functions
//----------------------------------------------------------------------------

// setInterval(function () {
//     var today = new Date();
//     var date = today.getDate()
//     var day = today.getDay()
//     var dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
//     day = dayArr[day]
//     var month = today.getMonth()
//     var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//     month = monthArr[month]
//     var year = today.getFullYear()
//     var hour = today.getHours()
//     var minute = today.getMinutes()
//     var second = today.getSeconds()
//     //get am or pm
//     var ampm = "AM"
//     if (hour > 12) {
//         hour = hour - 12
//         ampm = "PM"
//     }
//     if (hour == 0) {
//         hour = 12
//     }
//     if (hour < 10) {
//         hour = "0" + hour
//     }
//     if (minute < 10) {
//         minute = "0" + minute
//     }
//     if (second < 10) {
//         second = "0" + second
//     }

//     var time = document.getElementById('time')
//     var date_node = document.getElementById('date')
//     time.innerHTML = day + " " + hour + ":" + minute + ":" + second + " " + ampm
//     date_node.innerHTML = month + " " + date
//     var weather_date_node = document.getElementById('weather-date')
//     weather_date_node.innerHTML = month + " " + date
// }, 0)

var selectorbuttonnode = document.getElementById("engine-selector");
var enginelist = document.getElementById("engine-selector-list");
selectorbuttonnode.addEventListener("click", function () {
  enginelist.classList.toggle("show");
});

//----------------------------------------------------------------------------
//Engine selector click handler
//----------------------------------------------------------------------------
var InstaEngineNode = document.getElementById("instaclick");
var YoutubeEngineNode = document.getElementById("youtubeclick");
var bingEngineNode = document.getElementById("bingclick");
var googleEngineNode = document.getElementById("googleclick");
var duckEngineNode = document.getElementById("duckclick");

var selectedEngineNode = document.getElementById("selectedEngine");

InstaEngineNode.addEventListener("click", function () {
  selectedEngineNode.src = "./Assets/icons/instagram.svg";
  enginelist.classList.remove("show");
  SearchEngine = "instagram";
});
YoutubeEngineNode.addEventListener("click", function () {
  selectedEngineNode.src = "./Assets/icons/youtube.svg";
  enginelist.classList.toggle("show");
  SearchEngine = "youtube";
});
bingEngineNode.addEventListener("click", function () {
  selectedEngineNode.src = "./Assets/icons/bing.svg";
  enginelist.classList.toggle("show");
  SearchEngine = "bing";
});
googleEngineNode.addEventListener("click", function () {
  selectedEngineNode.src = "./Assets/icons/google.svg";
  enginelist.classList.toggle("show");
  SearchEngine = "google";
});
duckEngineNode.addEventListener("click", function () {
  selectedEngineNode.src = "./Assets/icons/duckduckgo.svg";
  enginelist.classList.toggle("show");
  SearchEngine = "duckduckgo";
});

var search_recommendations = document.getElementById("search-recommendations");
var search_data_list =
  JSON.parse(localStorage.getItem("search_data_list")) || [];
//----------------------------------------------------------------------------
//Search Recommendations sort by frequency
//----------------------------------------------------------------------------
search_data_list.sort(function (a, b) {
  return b.frequency - a.frequency;
});
let search_recommendations_content = "";
input_field.addEventListener("keyup", function (event) {
  let input_value = input_field.value;
  let arr = [];
  let arr1 = new Set();
  search_data_list.length > 0 &&
    search_data_list.forEach((search_data) => {
      if (search_data.search_value.toLowerCase().indexOf(input_value) > -1) {
        if (!arr1.has(search_data.search_value)) {
          arr.push(search_data);
          arr1.add(search_data.search_value);
        }
      }
    });
  setRecommendations(arr);
});
const favourites_element = document.getElementById("favourites");
function setRecommendations(arr) {
  favourites_element.innerHTML = "";
  search_recommendations_content = "";
  search_recommendations.innerHTML = "";
  arr.forEach((search_data) => {
    let search_engine_icon = search_data.search_engine;
    console.log(search_engine_icon);
    var search_recommendations_node = document.createElement("div");
    search_recommendations_node.classList.add("search-recommended-text");
    var icons_node = document.createElement("div");
    var upward_arrow_node = document.createElement("img");
    upward_arrow_node.src = "./Assets/icons/arrow-upward.png";
    upward_arrow_node.classList.add("upward-arrow");
    var close_icon = document.createElement("img");
    close_icon.src = "./Assets/icons/close.png";
    close_icon.classList.add("clear-logo");
    icons_node.appendChild(upward_arrow_node);
    icons_node.appendChild(close_icon);
    upward_arrow_node.addEventListener("click", () => {
      input_field.value = search_data.search_value;
    });
    close_icon.addEventListener("click", () => {
      search_data_list.splice(search_data_list.indexOf(search_data), 1);
      localStorage.setItem(
        "search_data_list",
        JSON.stringify(search_data_list)
      );
      search_recommendations_node.remove();
    });

    var one_search_data_node = document.createElement("div");
    one_search_data_node.classList.add("one");
    var search_engine_icon_node = document.createElement("div");
    var search_engine_icon_img_node = document.createElement("img");
    search_engine_icon_img_node.src =
      "./Assets/icons/" + search_engine_icon + ".svg";
    search_engine_icon_img_node.classList.add("search-recommendations-logo");
    var search_value_text_node = document.createElement("div");
    search_value_text_node.classList.add("search-value-recommendation");
    search_value_text_node.innerHTML = search_data.search_value;

    search_value_text_node.addEventListener("click", () => {
      input_field.value = search_data.search_value;
      search_button.click();
    });

    one_search_data_node.appendChild(search_engine_icon_node);
    one_search_data_node.appendChild(search_value_text_node);
    search_engine_icon_node.appendChild(search_engine_icon_img_node);
    search_recommendations_node.appendChild(one_search_data_node);
    search_recommendations_node.appendChild(icons_node);
    search_recommendations.appendChild(search_recommendations_node);
  });
}

input_field.addEventListener("focusin", () => {
  search_recommendations.classList.add("search-recommendations-show");
});

//----------------------------------------------------------------------------
//Get a random quote and display it
//----------------------------------------------------------------------------
var randomQuote;
const QuoteapiUrl = "https://type.fit/api/quotes";
//----------------------------------------------------------------------------
//Quotes are stored in an array in localstorage and directly accessed from there to reduce the data usage.
//----------------------------------------------------------------------------
const Quotes_from_local = JSON.parse(localStorage.getItem("quotes_from_local"))
  ? QuotesfromLocal()
  : Quotesres();

function Quotesres() {
  fetch(QuoteapiUrl)
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("quotes_from_local", JSON.stringify(res));
      randomQuote = res[Math.floor(Math.random() * res.length)];
      var random_Quote_node = document.getElementById("random-quote");
      random_Quote_node.innerHTML = randomQuote.text || "";
      var author_node = document.getElementById("author");
      author_node.innerHTML = "- " + randomQuote.author || "";
    });
}
function QuotesfromLocal() {
  var res = JSON.parse(localStorage.getItem("quotes_from_local"));
  randomQuote = res[Math.floor(Math.random() * res.length)];
  var random_Quote_node = document.getElementById("random-quote");
  random_Quote_node.innerHTML = randomQuote.text || "";
  var author_node = document.getElementById("author");
  author_node.innerHTML = "- " + randomQuote.author || "";
}

//----------------------------------------------------------------
//Personal Data
//----------------------------------------------------------------
const daytimenode = document.getElementById("daytime");
let daytimeword;
if (new Date().getHours() >= 6 && new Date().getHours() <= 12) {
  daytimeword = "Morning";
} else if (new Date().getHours() >= 13 && new Date().getHours() <= 17) {
  daytimeword = "Afternoon";
} else if (new Date().getHours() >= 18 && new Date().getHours() <= 23) {
  daytimeword = "Evening";
} else {
  daytimeword = "Night";
}
daytimenode.innerText = daytimeword;

var Personal_data = {};
fetch("./data.json")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    Personal_data = res;
    setData(res);
  })
  .catch((err) => {
    console.log(err);
    console.log("Couldn't fetch data from JSON file");
  });
const usernamenode = document.getElementById("username");

function setData(res) {
  usernamenode.innerText = res.name || "";
}

const medium_token =
  "26ae36f810d7a3c53c8886d503ad2a41c6bad3fb4eb419dab8ab247b3de06cf12";

const getMediumData = async () => {
  const res = await fetch(
    `https://api.medium.com/v1/me/publications?access_token=${medium_token}`
  );
  const medium_data = await res.json();
  console.log(medium_data);
};

//----------------------------------------------------------------
// Notion api for To DO
//----------------------------------------------------------------

const notion_token = "";

//-------------------------------------------------------------------------------------------------
//Streak image
//-------------------------------------------------------------------------------------------------
const get_streak_image = async () => {
  let url =
    "https://github-readme-streak-stats.herokuapp.com/?user=naveenkumarmd&theme=gruvbox_duo&date_format=M%20j%5B%2C%20Y%5D&background=312E2E80&ring=10C5FF&sideNums=DDDDDD&currStreakLabel=10C5FF&border=DDDDDD00&dates=DDDDDD&fire=0BAADD&sideLabels=DDDDDD&currStreakNum=16A6DD&stroke=C0C0C0";
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then((res) => res.blob())
    .then((blob) => {
      console.log(blob);
      console.log("blob is ", URL.createObjectURL(blob));
      localStorage.setItem(
        "streak_image",
        JSON.stringify({
          url: URL.createObjectURL(blob),
        })
      );
      set_streak_image(URL.createObjectURL(blob));
    });
};
get_streak_image();
const set_streak_image = (url) => {
  console.log("Url is ", url);
  const image = document.createElement("img");
  image.classList.add("gitstreak");
  image.src = url;
  document.getElementById("streak-image").appendChild(image);
};
const get_streak_image_from_local = () => {
  let blob = JSON.parse(localStorage.getItem("streak_image"));
  console.log("from local storahe");
  console.log(blob, "from local");
};

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous.toString();
}
//-------------------------------------------------------------------------------------------------
//Tasks
//-------------------------------------------------------------------------------------------------
const tasks = JSON.parse(localStorage.getItem("tasks"));

// Add new event button handler
const addnewtaskbtn = document.getElementById("add-event");
var task_name;
addnewtaskbtn.addEventListener("click", async () => {
  task_name = prompt("Enter the task name");
  const tasks = await JSON.parse(localStorage.getItem("tasks"));
  if (!task_name) {
    return;
  }
  if (tasks) {
    localStorage.setItem("tasks", JSON.stringify([...tasks, task_name]));
  } else {
    localStorage.setItem("tasks", JSON.stringify([task_name]));
  }
  gettodaytasks();
});
const task_container_node = document.getElementById("task-container");
function addtasktoNode(task_name) {
  const taskcard = document.createElement("div");
  taskcard.className = "card";
  const namecard = document.createElement("div");
  namecard.className = "name";
  taskcard.appendChild(namecard);
  const namenode = document.createElement("div");
  namenode.className = "namew";
  namenode.innerHTML = task_name;
  const rewardnode = document.createElement("div");
  rewardnode.className = "reward";
  rewardnode.innerHTML = `
        <div class="gold-card">
            <div class="gold-card-img-container">
                <img src="./Assets/icons/gold.png"/>
            </div>
        </div>
    `;
  namecard.appendChild(namenode);

  const donenode = document.createElement("div");
  const doneimg = document.createElement("img");
  doneimg.src = "./Assets/icons/tick.svg";
  doneimg.className = "note-img";
  donenode.appendChild(doneimg);
  taskcard.appendChild(donenode);
  donenode.addEventListener("click", () => {
    console.log("marked as done");
    markasdone(task_name);
  });
  // const cancelnode = document.createElement("div")
  // const cancelimg = document.createElement("img")
  // cancelimg.src = "./Assets/icons/cross.svg"
  // cancelimg.className = "note-img"
  // cancelimg.classList.add("cancel-img")
  // cancelnode.appendChild(cancelimg)
  // cancelnode.addEventListener("click", () => {
  //     markasdone(task_name, task_reward)
  // })
  // taskcard.appendChild(cancelnode)
  task_container_node.appendChild(taskcard);
}
const gettodaytasks = async () => {
  const tasks = await JSON.parse(localStorage.getItem("tasks"));
  task_container_node.innerHTML = " ";
  if (tasks) {
    tasks.forEach((task) => {
      addtasktoNode(task);
    });
  } else {
    task_container_node.innerHTML = "<div>None</div>";
  }
};
gettodaytasks();

//-------------------------------------------------------------------------
// functions to add task and remove task
//-------------------------------------------------------------------------

function markasdone(task_name) {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    var currtasks = tasks.filter((task) => task != task_name);
    localStorage.setItem("tasks", JSON.stringify(currtasks));
    gettodaytasks();
  }
}

///----------------------------------------------------------
// Quick links
//----------------------------------------------------------
document.getElementById("medium").addEventListener("click", () => {
  window.open("https://medium.com", (target = "_blank"));
});
document.getElementById("instagram").addEventListener("click", () => {
  window.open("https://instagram.com", (target = "_blank"));
});
document.getElementById("portfolio").addEventListener("click", () => {
  window.open("https://mdnaveenkumar2002.web.app", (target = "_blank"));
});
document.getElementById("linkedin").addEventListener("click", () => {
  window.open("https://linkedin.com", (target = "_blank"));
});
document.getElementById("github").addEventListener("click", () => {
  window.open("https://github.com", (target = "_blank"));
});
document.getElementById("spotify").addEventListener("click", () => {
  window.open("https://open.spotify.com/search", (target = "_blank"));
});
document.getElementById("gmail").addEventListener("click", () => {
  window.open("https://github.com", (target = "_blank"));
});
