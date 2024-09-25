const http = require('http');
const { exec } = require('child_process');
const url = require('url');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Parse the incoming request URL
  const queryObject = url.parse(req.url, true).query;

  // If the query parameter "url" is present
  if (queryObject.url) {
    console.log(`Received request for URL: ${queryObject.url}`);

    // Execute the umpv command with the video URL retrieved using yt-dlp
    const command = `umpv "$(yt-dlp -g -f best --no-warnings '${queryObject.url}')"`
    console.log(`Executing command: ${command}`);

    // Set the MPV environment variable with your desired options
    const env = {
      ...process.env,
      DISPLAY: ':0',
      MPV: 'mpv --no-terminal --vo=x11 --ao=pulse'
    };

    exec(command, { env }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      if (stderr) {
        console.error(`Standard error output: ${stderr}`);
      }
      console.log(`Standard output: ${stdout}`);
    });

    // Send a success response
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Success');
  } else {
    // If the "url" query parameter is not present, send a Bad Request response
    console.log('Bad Request: URL parameter missing');
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
  }
});

// Start the server, listening on port 3000 and localhost
server.listen(3000, '0.0.0.0', () => {
  console.log('Youtube MPV Server running at http://0.0.0.0:3000/');
});

