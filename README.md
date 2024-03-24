# Youtube MPV Server

![YouTube MPV Server](./logo.png)


This is a simple Node.js HTTP server that utilizes yt-dlp and mpv to stream YouTube videos. It's designed to be run inside a Docker container, with the video and audio playing on the host machine.

## Installation and Usage

1. Clone this repository: `git clone https://github.com/pipelinedave/youtube-send-to-mpv.git`
2. Navigate to the repository directory: `cd youtube-mpv-server`
3. Build the Docker image: `docker build -t youtube-mpv-server .`
4. Start the Docker container with the `docker-compose.yml` file: `docker-compose up`
5. Open `http://localhost:3000` in your web browser
6. Enter a valid YouTube video URL and click the "Play" button to start playing the video

## Qutebrowser Userscript
The Script in qutebrowser/userscripts can be used to add a function of sending the current video to mpv.
Place the script in your qutebrowser userscript directory, usually ~/.local/share/qutebrowser/userscripts. Make sure it is executable.
Add a bind to calling the script to qutebrowser like this:
:bind yt spawn --userscript youtube-to-mpv.sh
Play a video, run :yt and watch it open in mpv!

## Tampermonkey Script

The scripts in `tampermonkey.js` can be used to add a variety of functions to YouTube.
To use them, install the Tampermonkey extension from your local extension vendor ~_~.

### MPV button in player
This Tampermonkey script adds a button to the YouTube video page that sends the current video to a local MPV container for downloading and playing with yt-dlp and mpv respectively. To use the script, simply click the "Send to MPV" button after installing the script. Note that you need to have the local MPV container running for this script to work.

### MPV button on video overview
This Tampermonkey script adds a "Send to MPV" button to every video link on the YouTube video overview page. When clicked, the script sends the video link to a local MPV container for downloading and playing with yt-dlp and mpv respectively. To use the script, simply click the "Send to MPV" button after installing the script. Note that you need to have the local MPV container running for this script to work.

# Coming Soon

## Standalone Chrome Extension

To avoid having to rely on Tampermonkey, a Chrome extension has been created based on the `tampermonkey.js` script. To install the extension:

    1. Clone this repository: `git clone https://github.com/pipelinedave/youtube-send-to-mpv.git`
2. Navigate to the `chrome-extension` directory: `cd youtube-mpv-server/chrome-extension`
3. Open Google Chrome and navigate to `chrome://extensions`
4. Enable "Developer mode" in the top right corner
5. Click "Load unpacked" and select the `chrome-extension` directory
6. Visit a YouTube video page to see the "Play with MPV" button
