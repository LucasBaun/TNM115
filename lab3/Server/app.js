/*
-----------------Comment-----------------
http, hostname, port, serverUrl och fs är inbyggda moduler i node.js som vi använder för att skapa en server. 
*/
const http = require("node:http");
const hostname = "127.0.0.1";
const port = 3000;
const serverUrl = "http://" + hostname + ":" + port + "";
const fs = require('node:fs');


// const ft = require('node:fs');  //inbuilt filereading method in node.js
// const fk = require('node:fs');  //inbuilt filereading method in node.js

/*
-----------------Comment-----------------
server är en instans av http.Server som skapar en server som lyssnar på port 3000.
*/
const server = http.createServer((req, res) => {
    /*
    -----------------Comment-----------------
    res.setHeader("Content-Type", "text/plain") sätter headern för response till text/plain.
    fs.readFile(...) => { ... }) läser in json-filen solar-system-data.json 
    och skickar tillbaka den till klienten. Parameter err(Exception) and data(String)
    */
    res.setHeader("Content-Type", "text/plain");
    fs.readFile('./lab3/solar-system-data.json', 'utf8', (err, data) => { 
        
        if (err) { //if expection loading file
            console.error(err);
            res.statusCode = 500;
            res.end("Server error");
        } else { //if reading success
            
            console.log("Successfull reading file");  
                     
        }
        
        //makes the string solar-system-data to JSON object, therefor can access elements     
        const Jdata = JSON.parse(data);   

        //Here we extract URL path components for so called API endpoint routing, pretty much away to read the status from clients url
        const requestUrl = new URL(serverUrl + req.url);
        console.log(requestUrl.pathname);
        const pathComponents = requestUrl.pathname.split("/");        
        console.log(pathComponents); // will be a vector with ["", "the status"], so we want pathcomponent[1] cause 0 is irrelevent

        //Here we handle the HTTP GET methods, so if the status from pathcomponents[1] is "test" it will maybe respond with something..
        if (req.method == "GET") { 
            switch(pathComponents[1])
            {
                case "planets":
                    
                    console.log("Planets was started");
                    if (pathComponents[2] == "Sun") {
                        sendResponse(res, 200, "text/plain", Jdata.star.description);
                    } else {
                        for (pass = 0; pass < Jdata.planets.length; pass++) {
                            if (pathComponents[2] == Jdata.planets[pass].name) {
                                sendResponse(res, 200, "text/plain", Jdata.planets[pass].description);
                            }
                        }                       
                    }
                    break;
                // case "image":
                //     console.log("Image was started");
                //     if (pathComponents[2] == "bla bla") {
                //         console.log("Sun was started");
                //         ft.readFile("./lab3/" + Jdata.star.image_src,(err, data) => {
                //             console.log("Sun ft was started");
                //             if (err) {
                //                 console.error(err);
                //                 res.statusCode = 500;
                //                 res.end("Server error");
                //                 console.log("Sun Error was started");
                //             } else {
                //                 sendResponse(res, 200, "application/octet-stream", data);
                //                 // sendResponse(res, 200, "text/plain", Jdata.star.description);
                //                 // console.log("Successfull IMAGE reading"); 
                //                 console.log("Sun Successfull IMAGE reading");
                //             }
                //     });
                // } else {
                //     console
                //     for (pass = 0; pass < Jdata.planets.length; pass++) {
                //         if (pathComponents[2] == Jdata.planets[pass].name) {
                //             fk.readFile("./lab3/" + Jdata.planets[pass].image_src, (err, data) => {
                //                 if (err) {
                //                     console.error(err);
                //                     sendResponse(res, 500, null, null);
                                    
                //                 } else {
                //                     sendResponse(res, 200, "application/octet-stream", data);
                //                     sendResponse(res, 200, "text/plain", Jdata.star.description);
                //                     console.log("Successfull IMAGE reading " + Jdata.planets[pass].name);  
                //                 }
                //             });
                //         }
                //     }                       
                // }

                    // break;  
                default:
                    //do something
                    console.log("Couldnt find any status with : " + pathComponents[1] + " " + requestUrl.pathname);
                    sendResponse(res, 400, "text/plain", "No specific API Endpoint");
                    break;
            }
        }

    });
});

function sendResponse(res, statusCode, contentType, data) {
    res.statusCode = statusCode;
    if (contentType != null) {
        res.setHeader("Content-Type", contentType);
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header", "*");
    
    if (data != null) {
        res.end(data);
    } else {
        res.end();
    }
}

    
server.listen(port, hostname, () => {
    console.log("Server running at " + serverUrl);
});





















