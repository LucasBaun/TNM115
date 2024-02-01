const http = require("node:http");
const hostname = "127.0.0.1"; // localhost
const port = 3000;

const serverUrl = "http://" + hostname + ":" + port + "";

const fs = require('fs'); //inbuilt filereading method in node.js

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    fs.readFile('./lab3/solar-system-data.json', 'utf8', (err, data) => { //Load in json file, parameter err(Exception) and data(String)
        
        if (err) { //if expection loading file
            console.error(err);
            res.statusCode = 500;
            res.end("Server error");
        } else { //if reading success
            res.statusCode = 200;
            console.log("Successfull reading file");  
            res.end("Successfull reading file");          
        }
        
        //makes the string solar-system-data to JSON object, therefor can access elements     
        const Jdata = JSON.parse(data);  
        // console.log(Jdata);     
  
        const mercury = Jdata.planets[0].name;
        console.log(mercury); 

        if(mercury == "Mercury"){
            console.log("TRUE yay: " + mercury);
        } else { 
            console.log("No Mercury");}
    });
});

    
server.listen(port, hostname, () => {
    console.log("Server running at " + serverUrl);
});





















