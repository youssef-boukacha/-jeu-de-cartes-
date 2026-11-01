import { AddPlayer } from "./players.js";
const btnSave = document.getElementById("Enregistrer")
 
btnSave.addEventListener("click", function(){

        AddPlayer();
    })

import { removePlayers } from "./players.js";
const annuler = document.getElementById("annuler")
annuler.addEventListener("click",function(){
    removePlayers();
})