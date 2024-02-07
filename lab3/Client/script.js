//Server url (main adress; protocol + ip + port)
const serverUrl = "http://127.0.0.1:3000";

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


for (var i = 0; i < allPlanetsName.length; i++) {
    var searchReq = "/planets/";
    var content = "text/plain";
    var planetTempName = allPlanetsName[i];
    request_arg(planetTempName, searchReq);
    console.log(planetTempName);
}
// for (var i = 0; i < allPlanetsName.length; i++) {
//     var searchReq = "/image/";
//     var content = "image/png";
//     var planetTempName = allPlanetsName[i];
//     request_arg(planetTempName, searchReq);
//     console.log(planetTempName);

// }




//asynchronus function, the function that request information to the server
async function request_arg(planetTempName, search) {
    // console.log(planetTempName + " request_arg() " + content);
    var response;
    // var response2;
    //Client send message to server
    // response = await fetch(serverUrl + "/test", {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "text/plain",            
    //     },
    //     body: null
    // });
    response = await fetch(serverUrl + search + planetTempName, {
        method: "GET",
        headers: {
            "Content-Type": "text/plain",            
        },
        body: null
    });

    // response2 = await fetch(serverUrl + "/image/"+ planetTempName, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "text/plain",            
    //     },
    //     body: null
    // });

    //Client receives the server message
    
    if(response.ok) {
        response.text().then((textbody) => {
            console.log(textbody); // "test successfull!"
            // do something

            // test.innerText = textbody;   
            var planetDiv = document.createElement("div");
            var planetH1 = document.createElement("h1");
            var planetH2 = document.createElement("h2");
            planetH1.textContent = planetTempName;
            planetDiv.appendChild(planetH1);
            planetH2.innerText = textbody;
            planetDiv.id = planetTempName;
            planetDiv.appendChild(planetH2);
            container.appendChild(planetDiv);
            
            // if (search == "/image/") {
            //     var planetImg = document.createElement("img");
            //     planetImg.src = textbody;
            //     var temp = document.getElementById(planetTempName + "");
            //     if (temp != null) {
                    
            //         // planetTempName.appendChild(planetImg);
            //     }
            // }
            

        });
    }
    else {
        response.text().then((textbody) => {
            console.log(textbody); // "idiot"
            // do something
        });
    }
}











