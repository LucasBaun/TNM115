const http = require("node:http");
const hostname = "127.0.0.1"; // localhost
const port = 3000;

const serverUrl = "http://" + hostname + ":" + port + "";

const fs = require('fs'); //inbuilt filereading method in node.js

const server = http.createServer((req, res) => {
    // res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    fs.readFile('./lab3/solar-system-data.json', 'utf8', (err, data) => { //Load in json file, parameter err(Exception) and data(String)
        
        if (err) { //if expection loading file
            console.error(err);
            res.statusCode = 500;
            res.end("Server error");
        } else { //if reading success
            // res.statusCode = 200;
            console.log("Successfull reading file");  
            // res.end("Successfull reading file");          
        }
        
        //makes the string solar-system-data to JSON object, therefor can access elements     
        const Jdata = JSON.parse(data);  
        // console.log(Jdata);     
  
        // const mercury = Jdata.planets[0].name;
        // console.log(mercury);
        // if(mercury == "Mercury"){
        //     console.log("TRUE yay: " + mercury);
        // } else { 
        //     console.log("No Mercury");}

        //Here we extract URL path components for so called API endpoint routing, pretty much away to read the status from clients url
        const requestUrl = new URL(serverUrl + req.url);
        const pathComponents = requestUrl.pathname.split("/");        
        console.log(pathComponents); // will be a vector with ["", "the status"], so we want pathcomponent[1] cause 0 is irrelevent

        //Here we handle the HTTP GET methods, so if the status from pathcomponents[1] is "test" it will maybe respond with something..
        if (req.method == "GET") { 
            switch(pathComponents[1])
            {
                case "planets":
                    
                    
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
                //     if (pathComponents[2] == "Sun") {
                //         sendResponse(res, 200, "image/png", Jdata.star.image_src);
                //     } else {
                //         for (pass = 0; pass < Jdata.planets.length; pass++) {
                //             if (pathComponents[2] == Jdata.planets[pass].name) {
                //                 sendResponse(res, 200, "image/png", Jdata.planets[pass].image_src);
                //             }
                //         }                       

                //     }

                //     break;  
                default:
                    //do something
                    console.log("Couldnt find any status with : " + pathComponents[1]);
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





















