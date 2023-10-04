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

function checkUser() {
    log.info('Checking');
}
