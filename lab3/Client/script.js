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
 function getInfo() {
    for (var i = 0; i < allPlanetsName.length; i++) {
        let searchReq = "/planets/";
        let content = "text/plain";
        let planetTempName = allPlanetsName[i];
        request_arg(planetTempName, searchReq, content);
        console.log(planetTempName);
        
    }
    console.log("Done :) :" + allPlanetsName[1]);

    
    
    
}
function getIm() {
    for(pass = 0; pass < allPlanetsName.length; ++pass) {
        let searchImage = "/image/";
        let con = "image/png";
        request_image(allPlanetsName[pass], searchImage, con);        
    }    
}


    getInfo();
    getIm();
/*
-----------------Comment-----------------
asynchronus function, the function that request information to the server
*/
async function request_arg(planetTempName, search, content) {
    let response;
    console.log("Requesting: " + planetTempName + " " + search + " " + content);

    
    response = await fetch(serverUrl + search + planetTempName, {
        method: "GET",        
        headers: {
            "Content-Type": content,            
        },
        body: null
    });

 
    
    /*
    -----------------Comment-----------------
    Denna if satsen kollar om response.ok är true och om search är "/planets/".
    Om båda är true så kallar vi på response.text() och skickar med textbody som argument.
    textbody innehåller informationen som vi får från servern.
    Vi skapar en div som vi lägger till i container och i denna div så skapar 
    vi en h1 som innehåller planetens namn. Vi skapar även en h2 som isnnehåller textbody.
    */
    if (response.ok) {
        response.text().then((textbody) => {
            // console.log(textbody); 
            let planetDiv = document.createElement("div");
            let planetH1 = document.createElement("h1");
            let planetH2 = document.createElement("h2");
            planetH1.textContent = planetTempName;
            planetDiv.appendChild(planetH1);
            planetH2.innerText = textbody;
            planetDiv.id = planetTempName;
            planetDiv.appendChild(planetH2);
            container.appendChild(planetDiv);
            

        });        
    }

  

}

async function request_image(planetTempN, se, con) {
    let responseImage
    console.log("Requesting: " + planetTempN + " " + se + " " + con);

    responseImage = await fetch(serverUrl + se + planetTempN, {
        method: "GET",        
        headers: {
            "Content-Type": con,            
        },
        body: null
    });

    if (responseImage.ok) {        
        responseImage.blob().then((blobBody) => {
            console.log(blobBody);
            let imageTag = document.createElement("img"); //Create img element
            const filepath = URL.createObjectURL(blobBody);
            imageTag.src = filepath;            
            let planet = document.getElementById(planetTempN);
            planet.appendChild(imageTag);
           
        });
     } else {
        console.log("Something wnt wrong");
     }
    
}










