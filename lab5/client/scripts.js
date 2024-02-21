const serverUrl = "http://127.0.0.1:3000";
// const webPageURL = new URL(document.URL);

document.addEventListener("DOMContentLoaded", function(){
    console.log("HTML DOM tree loaded, and ready for manipulation.");
    
    action();
 });

 function action() {

document.getElementById("addNewArtistBtn").addEventListener("click", function(event){
    event.preventDefault();
    postArtist();
    fixInput();
});

function fixInput() {
    document.getElementById("inpId").value = "";
    document.getElementById("inpDes").value = "";
    document.getElementById("inpDis").value = "";
    document.getElementById("inpNam").value = "";
    document.getElementById("inpRef").value = "";
    document.getElementById("inpAli").value = "";
    document.getElementById("inpMem").value = "";
    document.getElementById("inpVar").value = "";
    document.getElementById("inpRea").value = "";
    
}

function getAllArtists() {
    req_arg("/artists", "application/json");

}
function getOneArtist(artist) {   
    req_arg("/artists/" + artist, "application/json", "GET");
    
}
function getSpecifikSearch(searchTemp) {
    req_arg("/search/" + searchTemp, "application/json", "GET");
}
function getImage(artistId) {
    req_arg("/image/" + artistId, "application/json", "GET");
}
function postArtist() {
    var inputsArray = [];
    inputsArray.push(document.getElementById("inpId").value || null); //0
    inputsArray.push(document.getElementById("inpDes").value || null); //1
    inputsArray.push(document.getElementById("inpDis").value || null); //2
    inputsArray.push(document.getElementById("inpNam").value || null); //3
    inputsArray.push(document.getElementById("inpRef").value || null); //4
    inputsArray.push(document.getElementById("inpAli").value || null); //5
    inputsArray.push(document.getElementById("inpMem").value || null); //6
    inputsArray.push(document.getElementById("inpVar").value || null); //7
    inputsArray.push(document.getElementById("inpRea").value || null); //8
    console.log(inputsArray);  
    req_arg("/insertartist/" + inputsArray, "application/json", "POST");
}

getAllArtists();


async function req_arg(search, content, misc) {
    const respons = await fetch(serverUrl + search, {
        method: misc,        
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
        const component = search.split("/");
        console.log(component);
        if (component[1] == "artists") {
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
                    getImage(artistInfo[0]._id);  
                });
            }
    } else if (component[1] == "image") {
        if (respons.ok) {
            respons.blob().then((imageFound) => {
                document.artistImg = document.createElement("img");
                var artistDiv = document.getElementById(component[2].toString()); // get the artist div
                var infoDiv = artistDiv.querySelector('#infoDiv'); // find infoDiv inside artistDiv
                document.artistImg.src = URL.createObjectURL(imageFound);
                infoDiv.appendChild(document.artistImg);

            });
        }
    } else if (component[1] == "insertartist") {
        if (respons.ok) {
            respons.json().then((artistsFound) => { 
                
                console.log(artistsFound);
                location.reload();
        });
        }else {
            if (respons.status == 409) {
                alert("ID can only have numbers in, try again");
            }else {
                alert("ID already exists, try again");
            }
        }
    } else {
        if (respons.ok) {
            respons.json().then((artistsFound) => {                
                if (artistsFound.length == 0) {
                    console.log("Tommm");
                } else {
                    for (pass = 0; pass < artistsFound.length; ++pass) {
                        getOneArtist(artistsFound[pass]._id);
                    }
                }

            });
        }
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
            getSpecifikSearch(searchTemp);
            console.log(searchTemp);
        }
    });
}
}
