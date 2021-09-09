const http = require('http');
const fs = require('node:fs')
const url = "./test.txt"

const port = process.env.port || 3000


fs.readFile(url, (err, html) => {

  if(err) {
    throw new Error('no such page')
  }

http.createServer((req, res) => {
  res.writeHead(200, {"content-type": "text/plain"})
  res.write(html)
  res.end()

}).listen(port)
})