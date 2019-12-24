const http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

const mimeTypes = {
    html: "text/html",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    svg: "image/svg+xml",
    js: "text/javascript",
    css: "text/css",
    wasm: "application/wasm"
};

var flags = {_:[]};
process.argv.forEach((val, index) => {
    if (index >= 2) {
        if (/^[\-\-]{1,2}.+[\=\:].*$/.test(val)) {
            let kvPair = val.split(/[\=\:]/);
            let lastDashIndex = kvPair[0].lastIndexOf('-');
            if (lastDashIndex < 2) {
                let key = kvPair[0].substring(lastDashIndex + 1);
                flags[key] = kvPair[1];
            }
        } else if (/^[\-\-]{1,2}.+$/.test(val)) {
            let lastDashIndex = val.lastIndexOf('-');
            if (lastDashIndex < 2) {
                let key = val.substring(lastDashIndex + 1);
                flags[key] = true;
            }
        } else {
            flags._.push(val);
        }
    }
});

if (flags.h || flags.help) {
    console.log(`
Options:
 -h --help     display help menu
 -v --ver      show app version
 -u --host     enter host details
 -p --port     enter port number
 -d --dir      enter directory path

Examples:
 $ node vitaarak.js -d=web/ -u=localhost -p=8080
 $ node vitaarak.js -d=web/ -p:8080
 $ node vitaarak.js -d:web/
    `);
} else if (flags.v || flags.ver) {
    console.log(`Vitaarak   version 1.0.0`);
} else {
    var host = flags.u || flags.host || '127.0.0.1',
        port = flags.p || flags.port || 8888,
        docpath = flags.d || flags.dir || '';

    http.createServer(function(request, response) {

        var uri = url.parse(request.url).pathname,
            filename = path.join(process.cwd(), docpath, uri);

        fs.exists(filename, function(exists) {
            if (!exists) {
                response.writeHead(404, { "Content-Type": "text/plain" });
                response.write("404 Not Found\n");
                response.end();
                return;
            }

            if (fs.statSync(filename).isDirectory())
                filename += '/index.html';

            fs.readFile(filename, "binary", function(err, file) {
                if (err) {
                    response.writeHead(500, { "Content-Type": "text/plain" });
                    response.write(err + "\n");
                    response.end();
                    return;
                }

                var fileExt = filename.split('.').pop();
                var mimeType = mimeTypes[fileExt];

                if (!mimeType) {
                    mimeType = 'text/plain';
                }

                response.writeHead(200, { "Content-Type": mimeType });
                response.write(file, "binary");
                response.end();
            });
        });
    }).listen(parseInt(port, 10), host, () => {
        console.log(`Server running at http://${host}:${port}/`);
    });
}