const http = require('node:http');
const fs = require('node:fs')
const path = require('node:path');

const port = process.env.port || 3000
let filename = "./test.txt"  // default
let extname = ''
let contentType =''


http.createServer((req, res) => {

  filename = "." + req.url

  console.log(req.url)
  extname = path.extname(req.url)
  console.log(extname)

  switch(extname) {
    case ".txt" :
      contentType = 'text/plain'
      break;
    default :
      contentType = "text/html"
      filename = "./test.txt"

  }


  fs.readFile(filename, (err, html) => {

    if(err) {
      throw new Error('Error 404')
    }

  res.writeHead(200, {contentType})
  res.write(html)
  return res.end()

})
}).listen(port)