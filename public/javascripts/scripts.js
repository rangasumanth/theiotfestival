function createCookie(name,value,days) {
    if (days) {
        var date = days;
        if(!(date instanceof Date)) { // specified as days number instead of Date object
            date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
        }
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function nextWeek(){
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
}

function fourWeeks(){
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 28);
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};