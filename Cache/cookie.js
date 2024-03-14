function setCookie() {
    var expirationTime = new Date().getTime() + (1 * 60 * 60 * 1000);
    var expirationDate = new Date(expirationTime);
    document.cookie = `myCookie=md; expires=` + expirationDate.toUTCString() + "; path=/";

}

function getCookie() {
    return new Promise((resolve, reject) => {
        var cookies = document.cookie;
        var cookieArray = cookies.split(";");
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];

            while (cookie.charAt(0) == " ") {
                cookie = cookie.substring(1);
            }

            if (cookie.indexOf("myCookie=") == 0) {
                var cookieValue = cookie.substring("myCookie=".length, cookie.length);
                resolve(cookieValue)
            }
        }
        reject()
    })

}

function isCached() {
    console.log("getcookie is called....")
    getCookie().then(res => {
        return true
    }).catch(err => {
        setCookie()
        return false
    })
}

isCached()
