const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const url = require('url');
const { extname } = require('path');
const app = express();
const figlet = require('figlet');
const { connect } = require('tls');
const exp = require('constants');
const PORT = process.env.PORT || 8000

app.use(cors());
// app.use(express.static('static'))

let server = http.createServer((req, res) => {

    // Creates File Path
    let filePath = path.join(
        __dirname,
        'public',
        req.url === '/' ? 'index.html' : req.url
    );

    const searchParam = url.parse(req.url, true).search;

    // Gets Extension from a file
    let extname = path.extname(filePath);

    // Default Content Type
    let contentType = 'text/html';

    if (searchParam) {
        filePath = path.join(
            __dirname,
            'public',
            'product.html'
        );

        extname = '.html';
        contentType = 'text/html';
    }

    if (req.url) {

        switch (extname) {

            case '.css':
                contentType = 'text/css';
                break;

            case '.js':
                contentType = 'text/javascript';
                break;

            case '.json':
                contentType = 'application/json';
                break;

            case '.jpeg':
                contentType = 'image/jpeg';
                break;

            case '.jpg':
                contentType = 'image/jpg';
                break;

            case '.png':
                contentType = 'image/png';
                break;

            case '.webp':
                contentType = 'image/webp';
                break;
        }
    }

    // Read File

    fs.readFile(filePath, (err, content) => {

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf8');

        // If ENONENT Error is returned
        if (err) {
            if (err.code === 'ENOENT') {
                figlet('Page Not Found!!', (error, data) => {

                    if (error) {
                        console.dir(error)
                        return
                    }
                    console.log(data.url)
                    res.end(data, 'utf8')
                })
            }
            else {
                // Some Other Error
                figlet('Page Not Found!!', (error, data) => {

                    if (error) {
                        console.dir(error)
                        return
                    }
                    res.writeHead(500);
                    res.end(data, 'utf8')
                })
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');

        }
    });

});

server.listen(PORT, () => {
    console.log(`The Server is running on port: ${PORT}`)
})
