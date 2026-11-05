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

import { DistributionDesCartes } from "./game.js";
const btnplay = document.getElementById("play")
btnplay.addEventListener("click", () =>
    { 
    const section2 = document.getElementById("page2") ; /* section de joue */
      
        btnplay.closest("section").classList.add("hidden");
    section2.classList.remove("hidden");

           
             DistributionDesCartes ();
      
          

});
import { joueur } from "./game.js";
import { JouerUneCarte } from "./game.js";
const carte= document.getElementById("zone-des-cartes")
carte.addEventListener("click", function(event){
    
const img = event.target.closest(".carteDeJoeur")
if (!img) return;
const carteName = img.getAttribute("data-nom");
const carteJoueur = joueur.find(carte => carte.name === carteName);

const  zoneDeBattle = document.getElementById("zone-de-jeux");
     zoneDeBattle.innerHTML = ` <div> 
     <img src ="${carteJoueur.url}" alt ="${carteJoueur.nom}">
</div>`
 JouerUneCarte(carteJoueur);


});

    