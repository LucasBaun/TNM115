//Server url (main adress; protocol + ip + port)
const serverUrl = "http://127.0.0.1:3000";

//asynchronus function, the function that request information to the server
async function request_test() {

    //Client send message to server
    const response = await fetch(serverUrl + "/test", {
        method: "GET",
        headers: {
            "Content-Type": "text/plain",            
        },
        body: null
    });

    //Client receives the server message
    if(response.ok) {
        response.text().then((textbody) => {
            console.log(textBody); // "test successfull!"
            // do something
        });
    }
    else {
        response.text().then((textbody) => {
            console.log(textBody); // "idiot"
            // do something
        });
    }
}