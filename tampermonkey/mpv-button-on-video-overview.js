// ==UserScript==
// @name         MPV Button on overview
// @namespace    https://stillon.top/
// @version      0.1
// @description  adds a button to send the video to mpv container on every video on youtube overview pages
// @author       goschen@me.com
// @match        https://youtube.com/
// @match        https://www.youtube.com/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-3.6.4.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

(function() {
    'use strict';
console.log("asdf")
    var that = this;
    var currLink = null;
    var currElem = null;
    waitForKeyElements('ytd-rich-item-renderer', elemHandle);
    //$('ytd-rich-item-renderer').each(function (idx, elem) {
    //    console.log(elem)
    //    currLink = $(elem).find('#thumbnail').attr('href');
    //    currElem = $(elem).find('#metadata-line');
    //    addButton(currElem, currLink, 'Send to MPV', sendVideoToContainer, {background: '#ff0000', color: '#fff', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 1px 0px, rgba(0, 0, 0, 0.2) 0px 1px 2px 0px'});
    //});

    function elemHandle(node) {
        console.log(node)
        currLink = node.find('#thumbnail').attr('href');
        currElem = node.find('#metadata-line');
        addButton(currElem, currLink, 'Send to MPV', sendVideoToContainer, {background: '#ff0000', color: '#fff', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 1px 0px, rgba(0, 0, 0, 0.2) 0px 1px 2px 0px'});
    }
    function addButton(elem, link, text, onclick, cssObj) {
        cssObj = cssObj || {color: '#fff', background: '#c00', border: 'none', borderRadius: '2px', fontSize: '14px', fontWeight: 'bold', padding: '8px 12px'}
        let button = document.createElement('button'), btnStyle = button.style
        elem[0].appendChild(button)
        button.innerHTML = text
        var videoLink = link;
        var newOnClick = function (){
            onclick(videoLink)
        };
        button.onclick = newOnClick;
        Object.keys(cssObj).forEach(key => btnStyle[key] = cssObj[key])
        return button;
    }
    function sendVideoToContainer(streamLink) {
        // Get the current video URL
        const videoUrl = window.location.href;

        // Send the video URL to the MPV container
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://localhost:3000/?url=' + encodeURIComponent('https://youtube.com') + encodeURIComponent(streamLink),
            onload: function(response) {
                console.log(response.responseText);
            }
        });
    }
})();