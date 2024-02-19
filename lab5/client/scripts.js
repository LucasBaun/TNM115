const serverUrl = "http://127.0.0.1:3000";
// const webPageURL = new URL(document.URL);

document.addEventListener("DOMContentLoaded", function(){
    console.log("HTML DOM tree loaded, and ready for manipulation.");
    
    action();
 });
 function action() {

function getAllArtists() {
    req_arg("/artists", "application/json");

}
function getOneArtist(artist) {
    if(document.getElementById(artist._id)){
        console.log("hej, den finns");
    }
    req_arg("/artists/" + artist, "application/json");
}


getAllArtists();



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
            searchInput();

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
            respons.json().then((artistInfo) => {
                // artistInfo = JSON.parse(artistInfo);
                document.artistDiv = document.getElementById(artistInfo[0]._id);
                document.infoDiv = document.createElement("div"); 
                document.infoDiv.id = "infoDiv";
                // for(tempName in artistInfo[0]) {};
                const name = document.createElement("h2");
                name.innerHTML = "<span>" + artistInfo[0].name + "</span>";
                document.infoDiv.appendChild(name);
                if (artistInfo[0].realname != null) {
                    const realName = document.createElement("h2");
                    realName.innerHTML = "<span>Real name: </span>" + "<br>" + artistInfo[0].realname;
                    document.infoDiv.appendChild(realName);
                }
                if (artistInfo[0].description != null) {
                    const description = document.createElement("p");
                    description.innerHTML = "<span>Description: </span>" + "<br>" + artistInfo[0].description;
                    document.infoDiv.appendChild(description);
                }
                if (artistInfo[0].nameVariations != null) {
                    const nameVariations = document.createElement("p");
                    nameVariations.innerHTML = "<span>Name variations: </span>";
                    for (temp in artistInfo[0].nameVariations) {
                        nameVariations.innerHTML += "<br>" + artistInfo[0].nameVariations[temp];
                    }
                   
                    document.infoDiv.appendChild(nameVariations);
                }
                if (artistInfo[0].aliases != null) {
                    const aliases = document.createElement("p");
                    aliases.innerHTML = "<span>Aliases: </span>";
                    for (temp in artistInfo[0].aliases) {
                        aliases.innerHTML += "<br>" + JSON.stringify(artistInfo[0].aliases[temp]);
                    }
                    document.infoDiv.appendChild(aliases);
                }
                if (artistInfo[0].memberInGroups != null) {
                    const memberInGroups = document.createElement("p");
                    memberInGroups.innerHTML = "<span>Member in groups: </span>" + "<br>" + artistInfo[0].memberInGroups;
                    document.infoDiv.appendChild(memberInGroups);
                }
                if (artistInfo[0].referenceUrls != null) {
                    const referenceUrls = document.createElement("p");
                    referenceUrls.innerHTML = "<span>Reference urls: </span>";
                    for (temp in artistInfo[0].referenceUrls) { 
                        const tempa = document.createElement("a"); //Skapar en a tagg
                        tempa.href = artistInfo[0].referenceUrls[temp]; //lägger till länk i den
                        tempa.target = '_blank'; //öppnar länken i ny flik
                        tempa.innerText = artistInfo[0].referenceUrls[temp]; //lägger till text i den
                        referenceUrls.appendChild(document.createElement("br"));
                        referenceUrls.appendChild(tempa);
                        //referenceUrls.innerHTML +="<br>" + tempa; //lägger till text i den
                        console.log(artistInfo[0].referenceUrls[temp]);
                    }
                    document.infoDiv.appendChild(referenceUrls);
                }
                if (artistInfo[0].discogsUrl != null) {
                    const discogsUrl = document.createElement("p");
                    const temp = document.createElement("a");
                    temp.href = artistInfo[0].discogsUrl;
                    temp.target = '_blank'; //öppnar länken i ny flik
                    temp.innerText = artistInfo[0].discogsUrl;
                    discogsUrl.innerHTML = "<span>Discogs url: </span>";
                    discogsUrl.appendChild(document.createElement("br"));
                    discogsUrl.appendChild(temp);
                    document.infoDiv.appendChild(discogsUrl);
                }
                document.artistDiv.appendChild(document.infoDiv);
                const infoArg = [
                    "_id",
                    "discogsUrl",
                    "name",
                    "realname",
                    "description",
                    "nameVariations",
                    "aliases",
                    "memberInGroups",
                    "referenceUrls"
                ];        

            });
        }
        else {
            console.log("DE FUNKAR INTE  2");
        }
    }
}

function clickedArtist(artistid) {
    console.log("clickedArtist: " + artistid);
    var artistDiv = document.getElementById(artistid.toString()); // get the artist div
    var infoDiv = artistDiv.querySelector('#infoDiv'); // find infoDiv inside artistDiv
    if(infoDiv) {
        artistDiv.removeChild(infoDiv);
    } else {
        getOneArtist(artistid);
    }
}



window.addEventListener('scroll', doParallax);
function doParallax(){
   var positionY = window.pageYOffset/2;
   document.body.style.backgroundPosition = "0 -" + positionY + "px";
}
function searchInput() {
    const searchBar = document.getElementById("search-field");
    let searchTemp;
    searchBar.addEventListener("change", (e) => {
        if (searchBar.value != "") {
            searchTemp = searchBar.value;
            console.log(searchTemp);
        }
    });
}
}
