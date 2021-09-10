const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const port = process.env.port || 3000;
let contentType = '';

http
  .createServer((req, res) => {
    let filename = './public' + req.url; // request can only be within public directory
    let extname = path.extname(req.url);

    // check whether files exists. If not, get the error-page.

    try {
      fs.accessSync(filename);
    } catch {
      filename = './public/error.html';
      extname = '.html';
    }

    // check extension and set Content-Type accordingly.

    switch (extname) {
      case '':
        contentType = { 'Content-Type': 'text/html' };
        if (filename.length === 9) {
          // no user input (filename is only ./public/   -> 9 characters)
          filename = './public/index.html';
        } else {
          filename = `${filename}/index.htm`; // if no extension (but not nothing), interpret it as a folder and try open index.htm within it
        }
        break;

      case '.html':
        contentType = { 'Content-Type': 'text/html' };
        break;
      case '.htm':
        contentType = { 'Content-Type': 'text/html' };
        break;
      case '.txt':
        contentType = { 'Content-Type': 'text/plain' };
        break;
      case '.js':
        contentType = { 'Content-Type': 'text/javascript' };
        break;
      case '.json':
        contentType = { 'Content-Type': 'application/json' };
        break;
      case '.css':
        contentType = { 'Content-Type': 'text/css' };
        break;
      case '.jpg':
        contentType = { 'Content-Type': 'image/jpeg' };
        break;
      case '.jpeg':
        contentType = { 'Content-Type': 'image/jpeg' };
        break;
      case '.jpe':
        contentType = { 'Content-Type': 'image/jpeg' };
        break;
      case '.png':
        contentType = { 'Content-Type': 'image/png' };
        break;
      case '.ico':
        contentType = { 'Content-Type': 'image/x-icon' };
        break;
      default:
        contentType = { 'Content-Type': 'text/html' };
        filename = './public/index.html';
    }

    fs.readFile(filename, (err, html) => {
      // if page couldn't load or if it doesn't exist

      if (err || filename === './public/error.html') {
        fs.readFile('./public/error.html', (error, data) => {
          if (error) {
            // if error-page couldn't load
            res.writeHead(404, {
              'Content-Type': 'text/plain',
            });
            res.end('Page not found...');
          }
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.write(data);
          return res.end();
        });

        // else get the right content
      } else {
        res.writeHead(200, contentType);
        res.write(html);
        return res.end();
      }
    });
  })
  .on('error', (err) => console.log(err, 'Server Error!'))
  .listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
