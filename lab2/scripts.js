/*
 *  Filename: scripts.js
 *  Description: Provided JS source code as material for Lab 2: HTML + JavaScript.
 *  Course Code: TNM115-2024VT
 *  Institution: Linköping University
 *
 *  Author: Nico Reski
 *  Version: 2024-01-23
 */

// ===== SOLAR SYSTEM DATA =====
// JSON object containing the information (data) about the solar system
// JSON object composed by: Nico Reski
// based on data available at: https://science.nasa.gov/solar-system/

// == Documentation for individual star/planet JSON objects ==
// id           -> unique identifier for a JSON object across the dataset
// name         -> textual name
// description  -> textual description
// time_day     -> length of 1 day on the respective planet, measured in (unit) earth days (1 complete self-rotation with respect to the sun)
// time_year    -> length of 1 year, measured in (unit) earth days (1 complete orbit around the sun)
// moons        -> moons of the respective planet; observe: value type varies!
// neighbors    -> array containing the ids of its neighbors
// image_src    -> filepath to image
// online_ref   -> link (url) for further reading
const solarSystemData = {
    version: "2024-01-23",
    data_source: "https://science.nasa.gov/solar-system/",
    star : {
        id: "s1",
        name: "Sun",
        description: "A star is a hot, glowing ball of gas. When you look up in the night sky, you can see countless twinkling stars. Can you see any stars during the daytime? Of course! The light of daytime comes from our closest star: the Sun.",
        neighbors: [ "p1" ],
        image_src: "media/sun.png",
        online_ref: "https://science.nasa.gov/sun/"
    },
    planets : [
        { 
            id: "p1",
            name: "Mercury",
            description: "Mercury is the smallest planet in our solar system. It's just a little bigger than Earth's Moon. Mercury itself, though, doesn't have any moons. It is the closest planet to the Sun, but it's actually not the hottest. Venus is hotter.",
            time_day: 59,
            time_year: 88,
            moons: null,
            neighbors: [ "s1", "p2" ],
            image_src: "media/mercury.png",
            online_ref: "https://science.nasa.gov/mercury/"
        },
        { 
            id: "p2",
            name: "Venus",
            description: "Venus looks like a very active planet. It has mountains and volcanoes. Venus is similar in size to Earth. Earth is just a little bit bigger.",
            time_day: 243,
            time_year: 225,
            moons: null,
            neighbors: [ "p1", "p3" ],
            image_src: "media/venus.png",
            online_ref: "https://science.nasa.gov/venus/"
        },
        { 
            id: "p3",
            name: "Earth",
            description: "Our home planet Earth is a rocky, terrestrial planet. It has a solid and active surface with mountains, valleys, canyons, plains and so much more. Earth is special because it is an ocean planet. Water covers 70% of Earth's surface.",
            time_day: 1,
            time_year: 365.25,
            moons: [ "Moon" ],
            neighbors: [ "p2", "p4" ],
            image_src: "media/earth.png",
            online_ref: "https://science.nasa.gov/earth/"
        },
        { 
            id: "p4",
            name: "Mars",
            description: "Mars is a cold desert world. The average temperature on Mars is minus 85 degrees Fahrenheit - way below freezing. It is half the size of Earth. Mars is sometimes called the Red Planet. It's red because of rusty iron in the ground.",
            time_day: 1.025,
            time_year: 687,
            moons: [ "Phobos", "Deimos" ],
            neighbors: [ "p3", "p5" ],
            image_src: "media/mars.png",
            online_ref: "https://science.nasa.gov/mars/"
        },
        { 
            id: "p5",
            name: "Jupiter",
            description: "Jupiter is the biggest planet in our solar system. It's similar to a star, but it never got massive enough to start burning. It is covered in swirling cloud stripes. It has big storms like the Great Red Spot, which has been going for hundreds of years. Jupiter is a gas giant and doesn't have a solid surface.",
            time_day: 0.417,
            time_year: 11.8,
            moons: 95,
            neighbors: [ "p4", "p6" ],
            image_src: "media/jupiter.png",
            online_ref: "https://science.nasa.gov/jupiter/"
        },
        { 
            id: "p6",
            name: "Saturn",
            description: "Saturn isn't the only planet to have rings, but it definitely has the most beautiful ones. The rings we see are made of groups of tiny ringlets that surround Saturn. They're made of chunks of ice and rock. Like Jupiter, Saturn is mostly a ball of hydrogen and helium.",
            time_day: 0.446,
            time_year: 29,
            moons: 146,
            neighbors: [ "p5", "p7" ],
            image_src: "media/saturn.png",
            online_ref: "https://science.nasa.gov/saturn/"
        },
        { 
            id: "p7",
            name: "Uranus",
            description: "Uranus is made of water, methane, and ammonia fluids above a small rocky center. Its atmosphere is made of hydrogen and helium like Jupiter and Saturn, but it also has methane. The methane makes Uranus blue.",
            time_day: 0.71,
            time_year: 84,
            moons: 27,
            neighbors: [ "p6", "p8" ],
            image_src: "media/uranus.png",
            online_ref: "https://science.nasa.gov/uranus/"
        },
        { 
            id: "p8",
            name: "Neptune",
            description: "Neptune is dark, cold, and very windy. It's the last of the planets in our solar system. It's more than 30 times as far from the sun as Earth is. Neptune is very similar to Uranus. It's made of a thick fog of water, ammonia, and methane over an Earth-sized solid center.",
            time_day: 0.71,
            time_year: 165,
            moons: 14,
            neighbors: [ "p7" ],
            image_src: "media/neptune.png",
            online_ref: "https://science.nasa.gov/neptune/"
        }
    ]
};
// =============================

// manually added listener for the "DOMContentLoaded" event, which is automatically invoked
// once the initial loading of the web page has been completed (.html file is completely parsed) 
document.addEventListener("DOMContentLoaded", function(){
   console.log("HTML DOM tree loaded, and ready for manipulation.");
   // === YOUR FUNCTION CALL TO INITIATE THE GENERATION OF YOUR WEB PAGE SHOULD GO HERE ===
    action();
});

function action(){
    //Divs for all images
    const htmlbody = document.body;

    const r1 = document.createElement("div");
    const r2 = document.createElement("div");
    const r3 = document.createElement("div");

    const r11 = document.createElement("div");
    const r12 = document.createElement("div");
    const r13 = document.createElement("div");

    const r21 = document.createElement("div");
    const r22 = document.createElement("div");
    const r23 = document.createElement("div");

    const r31 = document.createElement("div");
    const r32 = document.createElement("div");
    const r33 = document.createElement("div");

    const prev = document.createElement("div");
    const inf = document.createElement("div");


    //styles

    const style = document.createElement('style');
    style.innerHTML = `
    body {
        display: flex;
        flex-direction: column;
        margin: 0px;
        text-align: center;
        background-color: black;
    }
    #r1, #r2, #r3{
        display: flex;
        flex-direction: row;
        align-content: stretch;
        height: 50vh;
        width: 100%;
    }
    #r11, #r12, #r13, #r21, #r22, #r23, #r31, #r32, #r33 {
        display: flex;
        flex-direction: column;
        width: 33%;
        height: 100%;
        align-items: center;
    }

    img{
        width: 55%;
        transition: 0.3s;
    }
    
    h1{
        color: white;
        margin-bottom: 0px;
    }

    h2{
        color: white;
        font-size: 300%;
        padding-top: 25px;
        padding-bottom: 40px;
    }

    img:hover{
        rotate: 359deg;
        width: 70%;
        transition: 1s;
        cursor: pointer;
    }

    #prev{
        display: none;
        flex-direction: row;
        //justify-content: center;
    }

    #inf{
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        justify-content: flex-start;
        text-align: start;
        width: 45%;
    }

    #prev img {
        width: 55%;
    }

    #prev img:hover {
        rotate: 0deg;
        width: 55%;
        cursor: default;
    }

    #prev p{
        color: white;
    }

    #backbtn{
        padding-left: 35px;
    }

    #backbtn:hover {
        color: grey;
        cursor: pointer;
    }

    #inf h2{
        font-size: 150%;
    }

    a{
        text-decoration: none;
    }

    a:hover {
        color: purple;
        cursor: pointer;
    }

    `;

    const temp = window.location.hash;


    const backtext = document.createElement("h1");
    backtext.innerText = "<< Back";
    backtext.id = "backbtn";
    prev.appendChild(backtext);
    backtext.addEventListener('click', back);
    document.head.appendChild(style);
    const img_div = document.createElement("div");
    img_div.id = "img_div";
    prev.appendChild(img_div);
    inf.id = "inf";
    prev.appendChild(inf)

    const info = document.createElement("h2");
    info.innerText = "Solar System";
    document.body.append(info);

    document.body.append(prev);
    prev.id = "prev";

    document.body.append(r1);
    r1.id = "r1";
    document.body.append(r2);
    r2.id = "r2";
    document.body.append(r3);
    r3.id = "r3";

    r1.appendChild(r11);
    r11.id = "r11";
    r1.appendChild(r12);
    r12.id = "r12";
    r1.appendChild(r13);
    r13.id = "r13";

    r2.appendChild(r21);
    r21.id = "r21";
    r2.appendChild(r22);
    r22.id = "r22";
    r2.appendChild(r23);
    r23.id = "r23";

    r3.appendChild(r31);
    r31.id = "r31";
    r3.appendChild(r32);
    r32.id = "r32";
    r3.appendChild(r33);
    r33.id = "r33";


  

    //images
    // solarSystemData.planets.id
    const img_ear = document.createElement("img");
    const eart = document.createElement("h1");
    img_ear.src = solarSystemData.planets[2].image_src;
    eart.innerText = solarSystemData.planets[2].name;
    img_ear.addEventListener('click', clickedear);

    const img_jup = document.createElement("img");
    const jupt = document.createElement("h1");
    img_jup.src = solarSystemData.planets[4].image_src;
    jupt.innerText = solarSystemData.planets[4].name;
    img_jup.addEventListener('click', clickedjup);

    const img_mar = document.createElement("img");
    const mart = document.createElement("h1");
    img_mar.src = solarSystemData.planets[3].image_src;
    mart.innerText = solarSystemData.planets[3].name;
    img_mar.addEventListener('click', clickedmar);

    const img_mer = document.createElement("img");
    const mert = document.createElement("h1");
    img_mer.src = solarSystemData.planets[0].image_src;
    mert.innerText = solarSystemData.planets[0].name;
    img_mer.addEventListener('click', clickedmer);

    const img_nep = document.createElement("img");
    const nept = document.createElement("h1");
    img_nep.src = solarSystemData.planets[7].image_src;
    nept.innerText = solarSystemData.planets[7].name;
    img_nep.addEventListener('click', clickednep);

    const img_sat = document.createElement("img");
    const satt = document.createElement("h1");
    img_sat.src = solarSystemData.planets[5].image_src;
    satt.innerText = solarSystemData.planets[5].name;
    img_sat.addEventListener('click', clickedsat);

    const img_sun = document.createElement("img");
    const sunt = document.createElement("h1");
    img_sun.src = solarSystemData.star.image_src;
    sunt.innerText = solarSystemData.star.name;
    img_sun.addEventListener('click', clickedsun);

    const img_ura = document.createElement("img");
    const urat = document.createElement("h1");
    img_ura.src = solarSystemData.planets[6].image_src;
    urat.innerText = solarSystemData.planets[6].name;
    img_ura.addEventListener('click', clickedura);

    const img_ven = document.createElement("img");
    const vent = document.createElement("h1");
    img_ven.src = solarSystemData.planets[1].image_src;
    vent.innerText = solarSystemData.planets[1].name;
    img_ven.addEventListener('click', clickedven);
    


    // const img_eart = document.createElement("img");
    // img_eart.src = solarSystemData.star.image_src;


    r11.appendChild(eart);
    r11.appendChild(img_ear);

    r12.appendChild(jupt);
    r12.appendChild(img_jup);

    r13.appendChild(mart);
    r13.appendChild(img_mar);

    r21.appendChild(mert);
    r21.appendChild(img_mer);

    r22.appendChild(nept);
    r22.appendChild(img_nep);
    
    r23.appendChild(satt);
    r23.appendChild(img_sat);

    r31.appendChild(sunt);
    r31.appendChild(img_sun);

    r32.appendChild(urat);
    r32.appendChild(img_ura);

    r33.appendChild(vent);
    r33.appendChild(img_ven);
    


    
    if(temp == "#earth"){
        clickedear();
    } else if (temp == "#jup"){
        clickedjup();
    } else if (temp == "#mar"){
        clickedmar();
    } else if (temp == "#mer"){
        clickedmer();
    } else if (temp == "#nep"){
        clickednep();
    } else if (temp == "#sat"){
        clickedsat();
    } else if (temp == "#sun"){
        clickedsun();
    } else if (temp == "#ura"){
        clickedura();
    } else if (temp == "#ven"){
        clickedven();
    } else {
    }




function back(){
    window.location.hash = '';
    const image = document.getElementById("img");
    const text = document.getElementById("txt");
    const title = document.getElementById("tit");
    const moon = document.getElementById("mon");
    r1.style.display = "flex";
    r2.style.display = "flex";
    r3.style.display = "flex";
    prev.style.display = "none";
    img_div.removeChild(image);
    inf.removeChild(text);
    inf.removeChild(title);
    inf.removeChild(moon);
}

function clickedear(){
    window.location.hash = 'earth';
    //skapar img, text, titel, moons osv
    const title = document.createElement("h1");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const text = document.createElement("p");
    const moon = document.createElement("h2");
    link.id = "tit"
    image.id = "img";
    text.id = "txt";
    moon.id = "mon";
    link.target = "_blank";
    image.src = solarSystemData.planets[2].image_src;
    link.href = solarSystemData.planets[2].online_ref;
    title.innerText = solarSystemData.planets[2].name;
    text.innerText = solarSystemData.planets[2].description;
    moon.innerText = "Moons: " + solarSystemData.planets[2].moons;
    link.appendChild(title);
    img_div.appendChild(image);
    inf.appendChild(link);
    inf.appendChild(text);
    inf.appendChild(moon);
    r1.style.display = "none";
    r2.style.display = "none";
    r3.style.display = "none";
    prev.style.display = "flex";

}

function clickedjup(){
    window.location.hash = 'jup';
    const title = document.createElement("h1");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const text = document.createElement("p");
    const moon = document.createElement("h2");
    link.id = "tit"
    image.id = "img";
    text.id = "txt";
    moon.id = "mon";
    link.target = "_blank";
    image.src = solarSystemData.planets[4].image_src;
    title.innerText = solarSystemData.planets[4].name;
    text.innerText = solarSystemData.planets[4].description;
    link.href = solarSystemData.planets[4].online_ref;
    moon.innerText = "Moons: " + solarSystemData.planets[4].moons;
    link.appendChild(title);
    img_div.appendChild(image);
    inf.appendChild(link);
    inf.appendChild(text);
    inf.appendChild(moon);
    r1.style.display = "none";
    r2.style.display = "none";
    r3.style.display = "none";
    prev.style.display = "flex";
}

function clickedmar(){
    window.location.hash = 'mar';
    const title = document.createElement("h1");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const text = document.createElement("p");
    const moon = document.createElement("h2");
    link.id = "tit"
    image.id = "img";
    text.id = "txt";
    moon.id = "mon";
    link.target = "_blank";
    image.src = solarSystemData.planets[3].image_src;
    title.innerText = solarSystemData.planets[3].name;
    text.innerText = solarSystemData.planets[3].description;
    link.href = solarSystemData.planets[3].online_ref;
    moon.innerText = "Moons: " + solarSystemData.planets[3].moons;
    link.appendChild(title);
    img_div.appendChild(image);
    inf.appendChild(link);
    inf.appendChild(text);
    inf.appendChild(moon);
    r1.style.display = "none";
    r2.style.display = "none";
    r3.style.display = "none";
    prev.style.display = "flex";
}

function clickedmer(){
    window.location.hash = 'mer';

    const title = document.createElement("h1");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const text = document.createElement("p");
    const moon = document.createElement("h2");
    link.id = "tit"
    image.id = "img";
    text.id = "txt";
    moon.id = "mon";
    link.target = "_blank";
    image.src = solarSystemData.planets[0].image_src;
    title.innerText = solarSystemData.planets[0].name;
    text.innerText = solarSystemData.planets[0].description;
    link.href = solarSystemData.planets[0].online_ref;
    moon.innerText = "Moons: " + solarSystemData.planets[0].moons;
    link.appendChild(title);
    img_div.appendChild(image);
    inf.appendChild(link);
    inf.appendChild(text);
    inf.appendChild(moon);
    r1.style.display = "none";
    r2.style.display = "none";
    r3.style.display = "none";
    prev.style.display = "flex";
}

function clickednep(){
    window.location.hash = 'nep';

    const title = document.createElement("h1");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const text = document.createElement("p");
    const moon = document.createElement("h2");
    link.id = "tit"
    image.id = "img";
    text.id = "txt";
    moon.id = "mon";
    link.target = "_blank";
    image.src = solarSystemData.planets[7].image_src;
    title.innerText = solarSystemData.planets[7].name;
    text.innerText = solarSystemData.planets[7].description;
    link.href = solarSystemData.planets[7].online_ref;
    moon.innerText = "Moons: " + solarSystemData.planets[7].moons;
    link.appendChild(title);
    img_div.appendChild(image);
    inf.appendChild(link);
    inf.appendChild(text);
    inf.appendChild(moon);
    r1.style.display = "none";
    r2.style.display = "none";
    r3.style.display = "none";
    prev.style.display = "flex";
}

function clickedsat(){
    window.location.hash = 'sat';

    const title = document.createElement("h1");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const text = document.createElement("p");
    const moon = document.createElement("h2");
    link.id = "tit"
    image.id = "img";
    text.id = "txt";
    moon.id = "mon";
    link.target = "_blank";
    image.src = solarSystemData.planets[5].image_src;
    title.innerText = solarSystemData.planets[5].name;
    text.innerText = solarSystemData.planets[5].description;
    link.href = solarSystemData.planets[5].online_ref;
    moon.innerText = "Moons: " + solarSystemData.planets[5].moons;
    link.appendChild(title);
    img_div.appendChild(image);
    inf.appendChild(link);
    inf.appendChild(text);
    inf.appendChild(moon);
    r1.style.display = "none";
    r2.style.display = "none";
    r3.style.display = "none";
    prev.style.display = "flex";
}

function clickedsun(){
    window.location.hash = 'sun';
    const title = document.createElement("h1");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const text = document.createElement("p");
    const moon = document.createElement("h2");
    link.id = "tit"
    image.id = "img";
    text.id = "txt";
    moon.id = "mon";
    link.target = "_blank";
    image.src = solarSystemData.star.image_src;
    title.innerText = solarSystemData.star.name;
    link.href = solarSystemData.star.online_ref;
    text.innerText = solarSystemData.star.description;
    moon.innerText = "";
    link.appendChild(title);
    img_div.appendChild(image);
    inf.appendChild(link);
    inf.appendChild(text);
    inf.appendChild(moon);
    r1.style.display = "none";
    r2.style.display = "none";
    r3.style.display = "none";
    prev.style.display = "flex";
}

function clickedura(){
    window.location.hash = 'ura';
    const title = document.createElement("h1");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const text = document.createElement("p");
    const moon = document.createElement("h2");
    link.id = "tit"
    image.id = "img";
    text.id = "txt";
    moon.id = "mon";
    link.target = "_blank";
    image.src = solarSystemData.planets[6].image_src;
    title.innerText = solarSystemData.planets[6].name;
    text.innerText = solarSystemData.planets[6].description;
    link.href = solarSystemData.planets[6].online_ref;
    moon.innerText = "Moons: " + solarSystemData.planets[6].moons;
    link.appendChild(title);
    img_div.appendChild(image);
    inf.appendChild(link);
    inf.appendChild(text);
    inf.appendChild(moon);
    r1.style.display = "none";
    r2.style.display = "none";
    r3.style.display = "none";
    prev.style.display = "flex";
}

function clickedven(){
    window.location.hash = 'ven';
    const title = document.createElement("h1");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const text = document.createElement("p");
    const moon = document.createElement("h2");
    link.id = "tit"
    image.id = "img";
    text.id = "txt";
    moon.id = "mon";
    link.target = "_blank";
    image.src = solarSystemData.planets[1].image_src;
    title.innerText = solarSystemData.planets[1].name;
    link.href = solarSystemData.planets[1].online_ref;
    text.innerText = solarSystemData.planets[1].description;
    moon.innerText = "Moons: " + solarSystemData.planets[1].moons;
    link.appendChild(title);
    img_div.appendChild(image);
    inf.appendChild(link);
    inf.appendChild(text);
    inf.appendChild(moon);
    r1.style.display = "none";
    r2.style.display = "none";
    r3.style.display = "none";
    prev.style.display = "flex";
}



// ===== PROVIDED JS SOURCE CODE    -- ABOVE   =====
// ===== JS LAB 2 IMPLEMENTATION -- BENEATH =====

}