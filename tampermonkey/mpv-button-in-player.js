// ==UserScript==
// @name         Button in header on youtube video pages to send YouTube video to local MPV container
// @namespace    your-namespace-here
// @version      1
// @description  Adds a button to send the current YouTube video to a local MPV container for downloading and playing with yt-dlp and mpv respectively
// @author       kingovi@gmail.com
// @match        https://www.youtube.com/watch*
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function addButton(text, onclick, cssObj) {
    cssObj = cssObj || {color: '#fff', background: '#c00', border: 'none', borderRadius: '2px', fontSize: '14px', fontWeight: 'bold', padding: '8px 12px'}
    let button = document.createElement('button'), btnStyle = button.style
    const header = document.querySelector('#masthead-container');
    header.appendChild(button)
    button.innerHTML = text
    button.onclick = onclick
    Object.keys(cssObj).forEach(key => btnStyle[key] = cssObj[key])
    return button;
}

function sendVideoToContainer() {
    // Get the current video URL
    const videoUrl = window.location.href;

    // Send the video URL to the MPV container
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://localhost:3000/?url=' + encodeURIComponent(videoUrl),
        onload: function(response) {
            console.log(response.responseText);
        }
    });
}

// Add the button to the page
const mpvButton = addButton('Send to MPV', sendVideoToContainer, {background: '#ff0000', color: '#fff', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 1px 0px, rgba(0, 0, 0, 0.2) 0px 1px 2px 0px'});

// Add a menu command to send video to MPV
GM_registerMenuCommand('Send to MPV', function() {
    var videoUrl = window.location.href;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/?url=' + encodeURIComponent(videoUrl), true);
    xhr.send(null);
});
