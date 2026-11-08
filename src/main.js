
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
    AfficherResultatFinal,
    EnregistrerPartie
} from "./game.js";

import {
    GetHistory,
    GetPlayers,
    DeleteGame
} from "./storage.js";


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


// Retour vers les profils
const backProfile = document.getElementById("back-profile");

backProfile.addEventListener("click", () => {
    document.getElementById("page3").classList.add("hidden");
    document.getElementById("page1").classList.remove("hidden");
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
                EnregistrerPartie();
                AfficherResultatFinal();
                enCours = true;
                return;
            }
        }

        enCours = false;

    }, 700);

});


// Afficher l'historique
const btnHistory = document.getElementById("btn-history");
const backResults = document.getElementById("back-results");

btnHistory.addEventListener("click", () => {

    document.getElementById("page1").classList.add("hidden");
    document.getElementById("page2").classList.add("hidden");
    document.getElementById("page3").classList.add("hidden");

    AfficherHistorique();

    document.getElementById("page4").classList.remove("hidden");
});


// Retour depuis l'historique
backResults.addEventListener("click", () => {

    document.getElementById("page4").classList.add("hidden");
    document.getElementById("page1").classList.remove("hidden");
});


// Fonction pour afficher l'historique
function AfficherHistorique() {

    const history = GetHistory();
    const players = GetPlayers();

    const historyList = document.getElementById("history-list");
    const searchInput = document.getElementById("search-history");
    const filterResult = document.getElementById("filter-result");
const filterDate = document.getElementById("filter-date");
    const searchValue = searchInput.value.trim().toLowerCase();
    const selectedResult = filterResult.value;
const selectedDate = filterDate.value;
    historyList.innerHTML = "";

    // Trier les parties de la plus récente à la plus ancienne
    history.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Filtrer les parties
    const filteredHistory = history.filter((game) => {

        const player = players.find(p => p.id === game.playerId);

        const nickname = player
            ? player.nickname.toLowerCase()
            : "joueur inconnu";

        const searchMatch = nickname.includes(searchValue);

        const resultMatch =
            selectedResult === "all" ||
            game.result === selectedResult;
const gameDate = new Date(game.date);
const today = new Date();

today.setHours(0, 0, 0, 0);

const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(today.getDate() - 6);

const dateMatch =
    selectedDate === "all" ||
    (selectedDate === "today" && gameDate >= today) ||
    (selectedDate === "week" && gameDate >= sevenDaysAgo && gameDate <= new Date());
return searchMatch && resultMatch && dateMatch;    });

    // Vérifier si l'historique est vide
    if (filteredHistory.length === 0) {
        historyList.textContent = "Aucune partie trouvée.";
        return;
    }

    // Afficher les parties
    filteredHistory.forEach((game) => {

        const player = players.find(p => p.id === game.playerId);
        const nickname = player ? player.nickname : "Joueur inconnu";
historyList.innerHTML += `
    <div class="bg-[#1F2937] rounded-xl p-4 mt-4 text-white">

        <p>Joueur : ${nickname}</p>
        <p>Score joueur : ${game.playerScore}</p>
        <p>Score ordinateur : ${game.computerScore}</p>
        <p>Résultat : ${game.result}</p>
        <p>Date : ${game.date}</p>

        <button
            type="button"
            class="delete-game bg-red-600 text-white rounded-lg px-4 py-2 mt-3"
            data-id="${game.id}">
            Supprimer
        </button>

    </div>
`;
    });
}


// Recherche par nickname
const searchInput = document.getElementById("search-history");

searchInput.addEventListener("input", () => {
    AfficherHistorique();
});


// Filtrer par résultat
const filterResult = document.getElementById("filter-result");

filterResult.addEventListener("change", () => {
    AfficherHistorique();
});

const filterDate = document.getElementById("filter-date");

filterDate.addEventListener("change", () => {
    AfficherHistorique();
});
const historyList = document.getElementById("history-list");

historyList.addEventListener("click", (event) => {

    if (event.target.classList.contains("delete-game")) {

        const gameId = event.target.dataset.id;

        const confirmation = confirm(
            "Voulez-vous vraiment supprimer cette partie ?"
        );

        if (confirmation) {
            DeleteGame(gameId);
            AfficherHistorique();
        }
    }

});