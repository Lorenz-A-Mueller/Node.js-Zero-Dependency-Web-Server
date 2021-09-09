const http = require('node:http');
const fs = require('node:fs')
const path = require('node:path');


const port = process.env.port || 3000
let extname = ''
let contentType =''


http.createServer((req, res) => {

  let filename = "." + req.url

  console.log(req.url)
  extname = path.extname(req.url)
  console.log(extname)

  switch(extname) {
    case ".html" :
      contentType = {'Content-Type':'text/html'}
      break;
      case ".txt" :
        contentType = {'Content-Type':'text/plain'}
        break;
      case ".js" :
        contentType = {'Content-Type':'application/javascript'}
        break;
      case ".json" :
        contentType = {'Content-Type':'application/json'}
        break;
      case ".css" :
        contentType = {'Content-Type':'text/css'}
        break;
    default :
      contentType = {'Content-Type': "text/html"}
      filename = "./index.html"

  }

  fs.readFile(filename, (err, html) => {

    if(err) {

      // res.writeHead(404, {'Content-Type': 'text/html'});
      // return res.end("404 Not Found");

      fs.readFile("./error.html", ((error, data) => {
        if (error) {}
        res.writeHead(200, {'Content-Type':'text/html'})
        res.write(data)
        return res.end()
        })
      )
    } else {

  res.writeHead(200, contentType)
  res.write(html)
  return res.end()
  }
})

}).listen(port)