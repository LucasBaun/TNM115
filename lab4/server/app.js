
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

    if (req.method == "GET") { //GET request
        switch (pathComponents[1]) { //If the first path component is "artists"
            case "artists":
                if (pathComponents.length > 2) { //if there is more then 2 in path (artists/artistName)
                    performDbOperation(res, pathComponents[2]) //Request to database artistName
                    console.log("artistName");
                } else {
                    performDbOperation(res, "all_artists") //Request to database all artists
                    console.log("all_artists");
                }

                break;
        }

    } else if (req.method == "OPTIONS") {
        sendResponse(res, 204, null, null);
    }

});

async function performDbOperation(res, search) {
    await dbClient.connect(); //connect to database
    const db = dbClient.db(dbName); //select database
    const dbCollection = db.collection(dbCollectionName); //select collection
    if (search == "all_artists") {
        const filterQuery = {}; //empty filter
        const sortQuery = { name: 1 }; //sort alphabet
        const projectionQuery = {_id: 1, name: 1}; //project only name
        const findResult = await dbCollection.find(filterQuery).sort(sortQuery).project(projectionQuery).toArray(); ////find all artists and sort by name       
        sendResponse(res, 200, "application/json", JSON.stringify(findResult));
        
    } else if (res != null && search != null) {   
        console.log("search: " + search); 
        let num = Number(search); //convert to number (id is number in database
        const filterQuery = { _id: num }; //filter for artist name
        const findResult = await dbCollection.find(filterQuery).toArray();//find artist        
        sendResponse(res, 200, "application/json", JSON.stringify(findResult));
    } else {
        console.log("No response object");
    }
    

}
performDbOperation() 
    .catch(console.error) //catch errors
    .finally(() => { //close database connection
    dbClient.close() //close database connection
});

//responds
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
    console.log("Server is about to explode!!\nPlease insert refreshment to cool down (FIKAPAUSE)\n" + serverUrl);
});