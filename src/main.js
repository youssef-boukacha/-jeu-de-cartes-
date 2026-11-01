import { AddPlayer } from "./players.js";
const btnSave = document.getElementById("Enregistrer")
 
btnSave.addEventListener("click", function(){

        AddPlayer();
    })

import { removePlayers } from "./players.js";
const playerslist = document.getElementById("players-list")
playerslist.addEventListener("click", function(event) {

    if (event.target.classList.contains("remove")) {

       
removePlayers(event.target);
        
    }

});