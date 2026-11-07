import {
    SavePlayers,
    GetPlayers,
    SaveSelectedPlayer,
    GetSelectedPlayer,
    RemoveSelectedPlayer
} from "./storage.js";

const RegexName = /^[A-Za-z0-9]{3,15}$/;

let selectedAvatar = "";

// Récupérer les joueurs depuis localStorage
let players = GetPlayers();
let selectedPlayer = GetSelectedPlayer();

const Avatars = document.querySelectorAll("#avatars img");

Avatars.forEach(avatar => {
    avatar.addEventListener("click", function(event) {

        selectedAvatar = event.target.id;

        // Afficher la sélection
        Avatars.forEach(img => {
            img.classList.remove("border-indigo-500");
        });

        event.target.classList.add("border-indigo-500");
    });
});


// Fonction pour afficher les joueurs
export function DisplayPlayers() {

    const playerslist = document.getElementById("players-list");

    // Garder le titre de la liste
    playerslist.querySelectorAll("[data-id]").forEach(element => {
        element.remove();
    });

    players.forEach(player => {

        const avatar = document.getElementById(player.avatar);

        playerslist.innerHTML += `
        <div class="flex gap-4 pt-5" data-id="${player.id}">

            <div class="selected inline-flex items-center gap-2 w-fit p-1">

                <img src="${avatar.src}" class="w-10 h-10">

                <p class="text-white">
                    ${player.nickname}
                </p>

            </div>

            <button type="button"
                class="remove border border-indigo-600 rounded-xl text-white w-25">
                Supprimer
            </button>

        </div>
        `;
    });

    // Réafficher la sélection
    document.querySelectorAll(".selected").forEach(profile => {

        const playerElement = profile.closest("[data-id]");

        if (playerElement.dataset.id === selectedPlayer) {
            profile.classList.add(
                "border-2",
                "border-indigo-500",
                "rounded-md"
            );
        }
    });

}


// Fonction pour ajouter un joueur
export function AddPlayer() {

    const nickname = document.getElementById("nickname").value.trim();

    if (nickname === "") {
        alert("Entrez un nickname");
        return;
    }

    if (!RegexName.test(nickname)) {
        alert("Nickname invalide");
        return;
    }

    if (selectedAvatar === "") {
        alert("Sélectionnez un avatar");
        return;
    }

    const existingPlayer = players.find(player => {
        return player.nickname.toLowerCase() === nickname.toLowerCase();
    });

    if (existingPlayer) {
        alert("Ce nickname existe déjà");
        return;
    }

    const player = {
        id: `p_${Date.now()}`,
        nickname: nickname,
        avatar: selectedAvatar
    };

    players.push(player);

    // Sauvegarder tous les joueurs
SavePlayers(players);
    // Actualiser la liste
    DisplayPlayers();

    document.getElementById("nickname").value = "";

    selectedAvatar = "";

    Avatars.forEach(img => {
        img.classList.remove("border-indigo-500");
    });
}


// Fonction pour sélectionner un joueur
export function SelectPlayer(profile) {

    const playerElement = profile.closest("[data-id]");

    if (!playerElement) return;

    const playerId = playerElement.dataset.id;

    const player = players.find(player => {
        return player.id === playerId;
    });

    if (!player) return;

    selectedPlayer = playerId;

    // Sauvegarder le joueur sélectionné
SaveSelectedPlayer(selectedPlayer);
    // Actualiser la bordure
    document.querySelectorAll(".selected").forEach(element => {
        element.classList.remove(
            "border-2",
            "border-indigo-500",
            "rounded-md"
        );
    });

    profile.classList.add(
        "border-2",
        "border-indigo-500",
        "rounded-md"
    );

}


// Fonction pour afficher le profil dans le jeu
export function DisplaySelectedPlayer() {

    const player = players.find(player => {
        return player.id === selectedPlayer;
    });

    if (!player) {
        alert("Choisissez un profil avant de jouer");
        return false;
    }

    const avatar = document.getElementById(player.avatar);

    const gameAvatar = document.getElementById("game-avatar");
    const gameName = document.getElementById("name-profile");

    gameAvatar.src = avatar.src;
    gameAvatar.classList.remove("hidden");

    gameName.textContent = player.nickname;

    return true;
}


// Fonction pour supprimer un joueur
export function removePlayers(button) {

    const playerElement = button.closest("[data-id]");

    const playerId = playerElement.dataset.id;

    players = players.filter(player => player.id !== playerId);

    // Si le joueur supprimé était sélectionné
   // Si le joueur supprimé était sélectionné
if (selectedPlayer === playerId) {
    selectedPlayer = null;
    RemoveSelectedPlayer();
}


    // Sauvegarder la nouvelle liste
SavePlayers(players);
    playerElement.remove();
}