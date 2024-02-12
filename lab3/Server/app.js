/*
-----------------Comment-----------------
http, hostname, port, serverUrl och fs är inbyggda moduler i node.js som vi använder för att skapa en server. 
*/
const http = require("node:http");
const hostname = "127.0.0.1";
const port = 3000;
const serverUrl = "http://" + hostname + ":" + port + "";
const fs = require('node:fs');
const path = require("node:path");

/*
-----------------Comment-----------------
server är en instans av http.Server som skapar en server som lyssnar på port 3000.
*/
const server = http.createServer((req, res) => {
    
    /* -----------------Comment-----------------
    res.setHeader("Content-Type", "text/plain") sätter headern för response till text/plain.
    fs.readFile(...) => { ... }) läser in json-filen solar-system-data.json 
    och skickar tillbaka den till klienten. Parameter err(Exception) and data(String) */
    
    fs.readFile('./lab3/solar-system-data.json', 'utf8', (err, data) => { 
        
        if (err) { //if expection loading file
            console.error(err);
            res.statusCode = 500;
            res.end("Server error");
        } else { //if reading success
            
            console.log("Successfull reading text/plain file from solar-system-data.json");  
                     
        }
        
        //makes the string solar-system-data to JSON object, therefor can access elements     
        const Jdata = JSON.parse(data);  
        
        /* -----------------Comment-----------------
        requestUrl är en instans av URL som skapar en URL av serverUrl + req.url.
        console.log(requestUrl.pathname) skriver ut pathnamnet av requestUrl.
        pathComponents är en vektor som innehåller alla delar av pathnamnet som är separerade av /.
        */
        const requestUrl = new URL(serverUrl + req.url);
        const pathComponents = requestUrl.pathname.split("/"); 
        console.log(pathComponents);
        console.log(req.method);
        

        //Here we handle the HTTP GET methods, so if the status from pathcomponents[1] is "test" it will maybe respond with something..
        if (req.method == "GET") { 
            console.log("--------------- pathcomponents: " + pathComponents);
            if(pathComponents.length > 2) {
            switch(pathComponents[1])
            {
                case "planets":
                    
                    if (pathComponents[2] == "Sun") { //if pathcomponents[2] is "Sun"
                        /*sendResponse skickar tillbaka en response till klienten.*/
                        sendResponse(res, 200, "text/plain", Jdata.star.description);
                    } else { //if pathcomponents[2] is not "Sun"
                        //for loop that loops through all planets
                        for (pass = 0; pass < Jdata.planets.length; pass++) {
                            //if pathcomponents[2] is equal to the name of the planet
                            if (pathComponents[2] == Jdata.planets[pass].name) {
                                //send response with status code 200, content type text/plain and the description of the planet
                                sendResponse(res, 200, "text/plain", JSON.stringify(Jdata.planets[pass].description));
                            }
                        }                       
                    }
                    break;                    
                case "image":                    
                    console.log("Image switch");
          
                    console.log(pathComponents[2].toLowerCase());               
                   
                    const imageFilePath = "./lab3/Server/media/" + pathComponents[2].toLowerCase() + ".png";
                    console.log(imageFilePath);
                    fs.readFile(imageFilePath, (err, data2) => {
                        console.log("Reading image successfull!")
                        if (err) {                              
                            console.error("error in image" + err.message)  
                            sendResponse(res, 404, "text/plain", null);
                        }
                        else {                                
                            console.log("image send success") 
                            sendResponse(res, 200, "image/png", data2);
                        }
                    });
                    break;
                
                default:
                    // if no specific API Endpoint is found, send response with status code 400, content type text/plain and the message "No specific API Endpoint"
                    console.log("Default switch");
                    sendResponse(res, 204, "text/plain", "No specific API Endpoint");
                    break;
            }
        }
        
        }
        if (req.method == "OPTIONS") {
            sendResponse(res, 204, "text/plain", "this isn't supposed to be sent");
            console.log("test");
        }
        

    });

});


/*
-----------------Comment-----------------
sendResponse skickar tillbaka en response till klienten.
res, statusCode, contentType och data är parametrar som vi skickar med till funktionen.
statusCode sätter statuskoden för response.
*/
function sendResponse(res, statusCode, contentType, data) {
    res.statusCode = statusCode;
    if (contentType != null) { //if contenttype is not null
        res.setHeader("Content-Type", contentType); //set the header to the contenttype
    }
    res.setHeader("Access-Control-Allow-Origin", "*"); //set the header to allow all origins
    res.setHeader("Access-Control-Allow-Headers", "*"); //set the header to allow all headers
    // res.setHeader("Access-Control-Allow-Method", "*");
    
    if (data != null) { //if data is not null
        res.end(data); //end the response with the data
    } else { //if data is null
        res.end(); //end the response
    }
}

/*
-----------------Comment-----------------
server.listen(port, hostname, () => { ... }) gör så att servern lyssnar på port 3000.
*/
server.listen(port, hostname, () => {
    console.log("Server running at " + serverUrl);
});
