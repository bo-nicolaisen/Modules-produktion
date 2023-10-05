import { showAllUsers, showUser } from "./modules/view/userViews.js";
import { createForm } from "./modules/view/login.js";

// hoisting to window level.
window._myEventListners = { userClicked, userViewDone, checkUser };

let globalUserData;



// globals ----------------------------------------------------------------


// fetch users  model code ------------------------------------------------
// fetchUsers();
createForm("app", "Log in");

function fetchUsers() {
    fetch('https://dummyjson.com/users?limit=0')

        .then((response) => {
            // error check på netværk response
            if (!response.ok) {
                throw new Error("not ok!" + response.status);
            }

            // konverter response til json data objekt
            let data = response.json();
            return data;

        })

        .then((data) => {
            // do stuff
            recivedUsers(data.users);
        })

        .catch((error) => {
            console.log(error.message);
        });
}


// controller codes ------------------------------------------------
function recivedUsers(myUsers) {
    globalUserData = myUsers;

    showAllUsers(myUsers, 'app', true, "vis");


}


function userClicked(myId) {



    globalUserData.forEach(userObject => {

        if (userObject.id == myId) {
            showUser(userObject, 'app', true);
        }

    });


}

function userViewDone() {
    showAllUsers(globalUserData, 'app', true);
}

function checkUser(theUserIndput, thepasswordIndput) {
    
    let indputFromUser = document.getElementById(theUserIndput).value;
    let korrektUser = "";
    
    fetch(`https://dummyjson.com/users/filter?key=username&value=${korrektUser}`)
  
    
        .then((response) => {
            // error check på netværk response
            if (!response.ok) {
                throw new Error("not ok!" + response.status);
            }
    
             // konverter response til json data objekt
            let data = response.json();
            return data;
    
        })
    
        .then((data) => {
            // do stuff - chech om user er ok derefter videre til password check
            //recivedUsers(data.users);
            //fetchUsers();
            
            if (indputFromUser === korrektUser) {

                passCheck(data, thepasswordIndput);
                console.log('bruger ok');
            } else {

            const brugernavnInput = document.querySelector('input[name="brugernavn"]');
            brugernavnInput.classList.add('error');
            console.log('bruger ikke ok');
            }
        })
    
        .catch((error) => {
            console.log(error.message);
        }
    );
}







function passCheck(password) {
    fetch(`https://dummyjson.com/users?filter?key=password&value=${password}`)
    
        .then((response) => {
            // error check på netværk response
            if (!response.ok) {
                throw new Error("not ok!" + response.status);
            }
    
             // konverter response til json data objekt
            let data = response.json();
            return data;
    
        })
    
        .then((data) => {
            // do stuff - log in ok, vis alle brugere
            //recivedUsers(data.users);
            //fetchUsers();
            
            console.log('password ok');
        })
    
        .catch((error) => {
            console.log(error.message);
        }
    );
}





//testuser
// "id": 1,
// "firstName": "Terry",
// "lastName": "Medhurst",
// "maidenName": "Smitham",

// "username": "atuny0",
// "password": "9uQFF1Lh",

