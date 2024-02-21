//Node server configuration
const http = require("node:http");
const hostname = "127.0.0.1";
const port = 3000;
const serverUrl = "http://" + hostname + ":" + port + "";
const fs = require('node:fs');


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
                    performDbOperation(res, pathComponents[2], null) //Request to database artistName
                    console.log("artistName");
                } else {
                    performDbOperation(res, "all_artists", null) //Request to database all artists
                    console.log("all_artists");
                }
                break;
            case "search":
                performDbOperation(res, null, pathComponents[2]);
                break;
            case "image":
                console.log("Gick igenom steg 0")
                var imageFilePath = "./media/" + pathComponents[2] + ".png";
                console.log("Gick igenom steg 1")
                console.log(imageFilePath);
                if (!fs.existsSync(imageFilePath)) {
                    imageFilePath = "./media/PLACEHOLDER.png";
                }
                console.log("Gick igenom steg 2 " + imageFilePath)
                    fs.readFile(imageFilePath, (err, imageData) => {
                        if (err) {                                
                            console.error("error in image " + err.message)  
                            sendResponse(res, 404, "text/plain", null);
                        }
                        else {                               
                            console.log("image send success") 
                            sendResponse(res, 200, "image/png", imageData);
                        }
                    });
                break;
        }

    } else if (req.method == "OPTIONS") {
        sendResponse(res, 204, null, null);
    } else if (req.method == "POST") {        
        performDbOperation(res, pathComponents[2], "postArtist");      

    }

});

async function performDbOperation(res, search, text) {
    await dbClient.connect(); //connect to database
    const db = dbClient.db(dbName); //select database
    const dbCollection = db.collection(dbCollectionName); //select collection
    if (text == null) {
        if (search == "all_artists") {
            const filterQuery = {}; //empty filter
            const sortQuery = { name: 1 }; //sort alphabet
            const projectionQuery = {_id: 1, name: 1}; //project only name
            const findResult = await dbCollection.find(filterQuery).sort(sortQuery).project(projectionQuery).toArray(); ////find all artists and sort by name       
            sendResponse(res, 200, "application/json", JSON.stringify(findResult));
            
        } else if (res != null && search != null) {            
            let num = Number(search); //convert to number (id is number in database
            // const filterQuery = { _id: num}; //filter for artist name
            // const projectionQuery = {_id: 1, name: { $ne: null }, realname: { $ne: null }};
            
            // const findResult = await dbCollection.find(filterQuery).project(projectionQuery).toArray();//find artist   
            const findResult = await dbCollection.aggregate([
                { $match: { _id: num } },
                {
                $project: {
                    _id: 1,
                    name: { $cond: { if: { $ne: ["$name", null] }, then: "$name", else: "$$REMOVE" } },
                    realname: { $cond: { if: { $ne: ["$realname", null] }, then: "$realname", else: "$$REMOVE" } },
                    discogsUrl: { $cond: { if: { $ne: ["$discogsUrl", null] }, then: "$discogsUrl", else: "$$REMOVE" } },                
                    description: { $cond: { if: { $ne: ["$description", null] }, then: "$description", else: "$$REMOVE" } },
                    nameVariations: { $cond: { if: { $ne: ["$nameVariations", null] }, then: "$nameVariations", else: "$$REMOVE" } },
                    // memberInGroups: { $cond: { if: { $ne: [{ $size: "$memberInGroups"}, 0 ]}, then: "$memberInGroups", else: "$$REMOVE" } }
                    aliases: { $cond: { if: { $ne: ["$aliases", null] }, then: "$aliases", else: "$$REMOVE" } },
                    memberInGroups: { $cond: { if: { $ne: ["$memberInGroups", null] }, then: "$memberInGroups", else: "$$REMOVE" } },
                    referenceUrls: { $cond: { if: { $ne: ["$referenceUrls", null] }, then: "$referenceUrls", else: "$$REMOVE" } }
                }
                }
            ]).toArray();
            console.log(findResult[0].name);          
            
            sendResponse(res, 200, "application/json", JSON.stringify(findResult));
    } else {
        console.log("No response object");
    }
    
    } else if (text == "postArtist"){ 
        const regex = /^[0-9]+$/;
        if(regex.test(search[0])) {
        try {
        search = search.split(",");
        const artistCreate = {
            "_id": Number(search[0]),
            "discogsUrl": (search[2] || null),
            "name": (search[3] || null),
            "realname": (search[8] || null),
            "description": (search[1] || null),
            "nameVariations": ((search[7]).toArray || null),
            "aliases": ((search[5]).toArray || null),
            "memberInGroups": ((search[6]).toArray || null),
            "referenceUrls": ((search[4]).toArray || null),
        };      

            dbCollection.insertOne(artistCreate)
                .then(() => {
            sendResponse(res, 200, "application/json", JSON.stringify(artistCreate));
                })
               .catch((error) => {
                console.log("Error occurred: " + error);
                sendResponse(res, 404, null, null);
               }); 
    } catch (error) {
        console.log("Error occurred: " + error)
        sendResponse(res, 404, null, null);
    }
} else {
    //kollar nummer i id    
    console.log("Error occurred");
    sendResponse(res, 409, null, null);
}
        
    } else {
        const indexResult = await dbCollection.createIndex({name: "text", description: "text", realname: "text"});        
        filterQuery = {$text: {$search: text}};
        const sortQuery = {name: 1};
        const projectionQuery = {_id: 1};
        const findResult = await dbCollection.find(filterQuery).sort(sortQuery).project(projectionQuery).toArray();
        console.log(findResult);
        sendResponse(res, 200, "application/json", JSON.stringify(findResult));
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
