const serverUrl = "http://127.0.0.1:3000";
const webPageURL = new URL(document.URL);

document.addEventListener("DOMContentLoaded", function(){
    console.log("HTML DOM tree loaded, and ready for manipulation.");
    
    action();
 });
 function action() {

function getAllArtists() {
    req_arg("/artists", "application/json");

}
function getOneArtist(artist) {
    req_arg("/artists/" + artist, "application/json");
}

getAllArtists();
getOneArtist();


async function req_arg(search, content) {
    const respons = await fetch(serverUrl + search, {
        method: "GET",        
        headers: {
            "Content-Type": content,            
        },
        body: null
    });

    if(search == "/artists") {
        if(respons.ok) {
            respons.json().then((artistList) => {
            for(tempName in artistList) {
                    const blockDiv = document.createElement("div");
                    blockDiv.id = artistList[tempName]._id;
                    const artistNameH1 = document.createElement("h1");
                    artistNameH1.innerText = artistList[tempName].name;
                    const temp = artistList[tempName]._id;
                    artistNameH1.addEventListener("click", function() { 
                        clickedArtist(temp);
                    });
                    console.log(artistList[tempName].name);
                    blockDiv.appendChild(artistNameH1);
                    document.body.appendChild(blockDiv);
                
            }

            });
        }
        else {
            const funkar2 = document.createElement("h1");
            funkar2.innerText = "DE FUNKAR INTE";
            document.body.appendChild(funkar);
            console.log("DE FUNKAR INTE");
        }
    } else {
        if(respons.ok) {
            // respons.json().
            console.log("AYYEMEN");
        }
        else {
            console.log("DE FUNKAR INTE  2");
        }
    }
}

function clickedArtist(artistid) {
    console.log("clickedArtist: " + artistid);
    getOneArtist(artistid);
}



window.addEventListener('scroll', doParallax);
function doParallax(){
   var positionY = window.pageYOffset/2;
   document.body.style.backgroundPosition = "0 -" + positionY + "px";
}
/*

*/

}
