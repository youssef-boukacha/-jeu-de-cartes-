
import {
    AddPlayer,
    removePlayers,
    DisplayPlayers,
    SelectPlayer,
    DisplaySelectedPlayer
} from "./players.js";

import {
    DistributionDesCartes,
    ordinateur,
    joueur,
    JouerUneCarte,
    ChargerScores,
    AppliquerResultat,
    FinManche,
    AfficherResultatFinal
} from "./game.js";


// Afficher les joueurs sauvegardés
DisplayPlayers();


// Bouton Enregistrer
const btnSave = document.getElementById("Enregistrer");

btnSave.addEventListener("click", function() {
    AddPlayer();
});


// Sélectionner ou supprimer un joueur
const playerslist = document.getElementById("players-list");

playerslist.addEventListener("click", function(event) {

    if (event.target.classList.contains("remove")) {
        removePlayers(event.target);
        return;
    }

    const selected = event.target.closest(".selected");

    if (!selected) return;

    SelectPlayer(selected);
});


// Bouton Play
const btnplay = document.getElementById("play");

btnplay.addEventListener("click", () => {

    const profileIsSelected = DisplaySelectedPlayer();

    if (!profileIsSelected) return;

    document.getElementById("page1").classList.add("hidden");
    document.getElementById("page2").classList.remove("hidden");

    ChargerScores();
    DistributionDesCartes();
});


// Jouer une carte
const carte = document.getElementById("zone-des-cartes");
const bot = document.getElementById("bot");

let enCours = false;

carte.addEventListener("click", function(event) {

    if (enCours) return;

    const img = event.target.closest(".carteDeJoeur");

    if (!img) return;

    const carteName = img.getAttribute("data-nom");

    const carteJoueur = joueur.find(carte => {
        return carte.name === carteName;
    });
    const backProfile = document.getElementById("back-profile");

backProfile.addEventListener("click", () => {

    document.getElementById("page3").classList.add("hidden");
    document.getElementById("page1").classList.remove("hidden");

});

    if (!carteJoueur || ordinateur.length === 0) return;

    enCours = true;

    // Choisir une carte aléatoire pour l'ordinateur
    const index = Math.floor(Math.random() * ordinateur.length);

    const carteOrdi = ordinateur[index];

    // Afficher les deux cartes
    JouerUneCarte(carteJoueur, carteOrdi);


    setTimeout(() => {

        // Calculer le résultat
        const resultat = AppliquerResultat(carteJoueur, carteOrdi);

        console.log("Résultat du duel :", resultat);

        // Supprimer les cartes jouées
        img.parentElement.remove();
        bot.children[index].remove();

        joueur.splice(joueur.indexOf(carteJoueur), 1);
        ordinateur.splice(index, 1);


        // Vérifier si toutes les cartes sont jouées
        if (joueur.length === 0 && ordinateur.length === 0) {

            const partieContinue = FinManche();

            if (!partieContinue) {
    AfficherResultatFinal();
    enCours = true;
    return;
}
        }

        // Autoriser le prochain duel
        enCours = false;

    }, 700);

});
