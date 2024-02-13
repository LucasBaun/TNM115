
//Node server configuration
const http = require("node:http");
const hostname = "127.0.0.1";
const port = 3000;
const serverUrl = "http://" + hostname + ":" + port + "";

//MongoDb configuration
const MongoClient = require("mongodb").MongoClient;
const dbHostname = "localhost";
const dbPort = 27017;
const dbServerUrl = "mongodb://" + dbHostname + ":" + dbPort + "";
const dbName = "tnm115-lab";
const dbCollectionName = "artists"
const dbClient = new MongoClient(dbServerUrl);

//Create Server with API Requests
const server = http.createServer((req, res) => {
    const requestUrl = new URL(serverUrl + req.url);
    const pathComponents = requestUrl.pathname.split("/");

    if (req.method == "GET") {
        switch (pathComponents[1]) {
            case "något":

                break;
        }

    } else if (req.method == "OPTIONS") {
        sendResponse(res, 204, null, null);
    }

});


function sendResponse(res, statusCode, contentType, data) {
    res.statusCode = statusCode;
    if(contentType != null) res.setHeader("Content-Type", contentType);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    if (data != null) {
        res.end(data);
    } else  {
        res.end(); 
    }
}

server.listen(port, hostname, () => {
    console.log("Server is running against it's will at:\n" + serverUrl);
});