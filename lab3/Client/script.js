//Server url (main adress; protocol + ip + port)
const serverUrl = "http://127.0.0.1:3000";

/*
-----------------Comment-----------------
Vi har en const allPlanetsName som innehåller namnen på alla planeter.
*/
const allPlanetsName = 
    [
        "Sun",
        "Mercury",
        "Venus",
        "Earth",
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune",
        //Test error
        "lucas",
        "linus"
        
    ]
;

/*
-----------------Comment-----------------
vi har en for loop som loopar igenom alla planeter i allPlanetsName och för varje
planet så kallar vi på funktionen request_arg med planetens namn som argument.
*/
for (var i = 0; i < allPlanetsName.length; i++) {
    var searchReq = "/planets/";
    var content = "text/plain";
    var planetTempName = allPlanetsName[i];
    request_arg(planetTempName, searchReq, content);
    console.log(planetTempName);
}

// for (var i = 0; i < allPlanetsName.length; i++) {
//     var searchReq = "/image/";
//     var content = "application/octet-stream";
//     var planetTempName = allPlanetsName[i];
//     request_arg(planetTempName, searchReq, content);
//     console.log(planetTempName);

// }



/*
-----------------Comment-----------------
asynchronus function, the function that request information to the server
*/
async function request_arg(planetTempName, search, content) {
    // console.log(planetTempName + " request_arg() " + content);
    var response;
    var consolesak = "yes";
    console.log("consolesak first: " + consolesak);

    response = await fetch(serverUrl + search + planetTempName, {
        method: "GET",        
        headers: {
            "Content-Type": content,            
        },
        body: null
    });

    console.log("consolesak: " + consolesak);

    // response2 = await fetch(serverUrl + "/image/"+ planetTempName, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "text/plain",            
    //     },
    //     body: null
    // });
    console.log(response + " " + search);
    //Client receives the server message  
    
    /*
    -----------------Comment-----------------
    Denna if satsen kollar om response.ok är true och om search är "/planets/".
    Om båda är true så kallar vi på response.text() och skickar med textbody som argument.
    textbody innehåller informationen som vi får från servern.
    Vi skapar en div som vi lägger till i container och i denna div så skapar 
    vi en h1 som innehåller planetens namn. Vi skapar även en h2 som innehåller textbody.
    */
    if(response.ok && search == "/planets/") {
        response.text().then((textbody) => {
            console.log(textbody); 
            var planetDiv = document.createElement("div");
            var planetH1 = document.createElement("h1");
            var planetH2 = document.createElement("h2");
            planetH1.textContent = planetTempName;
            planetDiv.appendChild(planetH1);
            planetH2.innerText = textbody;
            planetDiv.id = planetTempName;
            planetDiv.appendChild(planetH2);
            container.appendChild(planetDiv);
            

        });

    }

    /*
    -----------------Comment-----------------
    Denna else if satsen kollar om response.ok är true och om search är "/image/".
    Om båda är true så kallar vi på response.blob() och skickar med blobBody som argument.
    blobBody innehåller informationen som vi får från servern. Vi skapar en URL till blobBody.
    Vi skapar en div som vi lägger till i container och i denna div så skapar vi en img som innehåller
    filePath som src.
    */
    // else if(response.ok && search == "/image/") {
    //     response.blob().then((blobBody) => {
    //         console.log("Blobby: " + blobBody);
    //         var filePath = URL.createObjectURL(blobBody);
    //         var planetDiv = document.getElementById(planetTempName);
    //         var planetImg = document.createElement("img");
    //         planetImg.src = filePath;
    //         planetDiv.appendChild(planetImg);
    //     });
    // }
    else {
        response.text().then((textbody) => {
            console.log(textbody); // "idiot"
        });
    }
}











