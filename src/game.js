
import {
    GetSelectedPlayer,
    SaveScores,
    GetScores,
    SaveGame
} from "./storage.js";

// Les cartes du joueur
export let joueur = [
    { name: "empereur", url: "src/images/empereur.png" },
    { name: "citoyen", url: "src/images/citoyen.png" },
    { name: "citoyen", url: "src/images/citoyen.png" },
    { name: "citoyen", url: "src/images/citoyen.png" },
    { name: "citoyen", url: "src/images/citoyen.png" }
];

// Les cartes de l'ordinateur
export let ordinateur = [
    { name: "esclave", url: "src/images/esclave.png" },
    { name: "citoyen", url: "src/images/citoyen.png" },
    { name: "citoyen", url: "src/images/citoyen.png" },
    { name: "citoyen", url: "src/images/citoyen.png" },
    { name: "citoyen", url: "src/images/citoyen.png" }
];

// Les scores
export let scoreJoueur = 0;
export let scoreOrdinateur = 0;

export let manche = 1;
export let campJoueur = "empereur";
export let campOrdinateur = "esclave";

// Récupérer les scores sauvegardés
export function ChargerScores() {
    const playerId = GetSelectedPlayer();
    const scores = GetScores(playerId);

    scoreJoueur = scores.scoreJoueur;
    scoreOrdinateur = scores.scoreOrdinateur;

    AfficherScores();
}


// Sauvegarder les scores
export function SauvegarderScores() {
    const playerId = GetSelectedPlayer();

    SaveScores(
        playerId,
        scoreJoueur,
        scoreOrdinateur
    );
}


// Afficher les scores dans HTML
export function AfficherScores() {
    const scorePlayerHTML = document.getElementById("score");
    const scoreComputerHTML = document.querySelector(".score");

    if (scorePlayerHTML) {
        scorePlayerHTML.textContent = scoreJoueur;
    }

    if (scoreComputerHTML) {
        scoreComputerHTML.textContent = scoreOrdinateur;
    }
}



export function DistributionDesCartes() {

    joueur = creerMain(campJoueur);
    ordinateur = creerMain(campOrdinateur);

    // Afficher les cartes du joueur
    const joueur_carte = document.getElementById("zone-des-cartes");

    joueur_carte.innerHTML = "";

    joueur.forEach((carte) => {

        joueur_carte.innerHTML += `
            <div class="py-4">
                <img src="${carte.url}"
                     alt="cartes"
                     class="carteDeJoeur border border-1 border-[#990000] shadow-xl h-25 w-15"
                     data-nom="${carte.name}">
            </div>
        `;
   
    });

    // Afficher les cartes cachées de l'ordinateur
    const bot = document.getElementById("bot");

    bot.innerHTML = "";

    ordinateur.forEach(() => {

        bot.innerHTML += `
            <div class="py-4">
                <img src="src/images/back.jpg"
                     alt="carte cachée"
                     class="h-25 w-15">
            </div>
        `;
    });
 AfficherInfosManche();
}

// Comparer les cartes
export function duel(carteJoueur, carteOrdinateur) {

    if (carteJoueur === carteOrdinateur) {
        return "égalité";
    }

    if (
        carteJoueur === "empereur" &&
        carteOrdinateur === "citoyen"
    ) {
        return "victoire";
    }

    if (
        carteJoueur === "citoyen" &&
        carteOrdinateur === "esclave"
    ) {
        return "victoire";
    }

    if (
        carteJoueur === "esclave" &&
        carteOrdinateur === "empereur"
    ) {
        return "victoire";
    }

    return "défaite";
}




export function AppliquerResultat(carteJoueur, carteOrdinateur) {

    const resultat = duel(
        carteJoueur.name,
        carteOrdinateur.name
    );

    if (resultat === "égalité") {
        return resultat;
    }

    if (resultat === "victoire") {

        if (campJoueur === "empereur") {
            scoreJoueur += 1;
        } else {
            scoreJoueur += 5;
        }

    } else {

        if (campOrdinateur === "empereur") {
            scoreOrdinateur += 1;
        } else {
            scoreOrdinateur += 5;
        }
    }

    AfficherScores();
    SauvegarderScores();

    return resultat;
}



// Afficher les deux cartes
export function JouerUneCarte(carteJoueur, carteDeOrdi) {

    const zoneDeBattleDeOrdi =
        document.getElementById("zone-de-jeux-ordi");

    const zoneDeBattle =
        document.getElementById("zone-de-jeux");

    zoneDeBattle.innerHTML = `
        <div>
            <img src="${carteJoueur.url}"
                 alt="${carteJoueur.name}"
                 class="h-55 flip">
        </div>
    `;

    zoneDeBattleDeOrdi.innerHTML = `
        <div>
            <img src="${carteDeOrdi.url}"
                 alt="${carteDeOrdi.name}"
                 class="h-55 flip">
        </div>
    `;
}
export function ChangerCamp() {

    campJoueur = campJoueur === "empereur"
        ? "esclave"
        : "empereur";

    campOrdinateur = campOrdinateur === "empereur"
        ? "esclave"
        : "empereur";

}
export function creerMain(camp) {

    const cartes = [
        { name: "citoyen", url: "src/images/citoyen.png" },
        { name: "citoyen", url: "src/images/citoyen.png" },
        { name: "citoyen", url: "src/images/citoyen.png" },
        { name: "citoyen", url: "src/images/citoyen.png" }
    ];

    if (camp === "empereur") {
        cartes.push({
            name: "empereur",
            url: "src/images/empereur.png"
        });
    } else {
        cartes.push({
            name: "esclave",
            url: "src/images/esclave.png"
        });
    }

    return cartes;
}



export function FinManche() {

    // Vérifier si les 12 manches sont terminées
    if (manche === 12) {
        return false;
    }

    // Passer à la manche suivante
    manche++;

    // Changer les camps après chaque groupe de 3 manches
    if (manche === 4 || manche === 7 || manche === 10) {
        ChangerCamp();
    }

    // Vider les anciennes cartes jouées
    document.getElementById("zone-de-jeux").innerHTML = "";
    document.getElementById("zone-de-jeux-ordi").innerHTML = "";

    // Distribuer 5 nouvelles cartes aux deux joueurs
    DistributionDesCartes();

    return true;
}
export function AfficherInfosManche() {

    const roundsHTML = document.getElementById("Rounds");
    const groupHTML = document.getElementById("Group");
    const campHTML = document.getElementById("Camp");

    roundsHTML.textContent = `${manche} / 12`;

    const groupe = Math.ceil(manche / 3);
    groupHTML.textContent = `${groupe} / 4`;

    campHTML.textContent = campJoueur;
}

export function AfficherResultatFinal() {

    const page2 = document.getElementById("page2");
    const page3 = document.getElementById("page3");

    const winnerHTML = document.getElementById("winner");
    const scorePlayerHTML = document.getElementById("final-score-player");
    const scoreBotHTML = document.getElementById("final-score-bot");

    page2.classList.add("hidden");
    page3.classList.remove("hidden");

    scorePlayerHTML.textContent = scoreJoueur;
    scoreBotHTML.textContent = scoreOrdinateur;

    if (scoreJoueur > scoreOrdinateur) {
        winnerHTML.textContent = "Félicitations ! Vous avez gagné 🎉";
    } 
    else if (scoreJoueur < scoreOrdinateur) {
        winnerHTML.textContent = "L'ordinateur a gagné !";
    } 
    else {
        winnerHTML.textContent = "Match nul !";
    }
}

export function EnregistrerPartie() {
    const playerId = GetSelectedPlayer();

    const result =
        scoreJoueur > scoreOrdinateur
            ? "victoire"
            : scoreJoueur < scoreOrdinateur
                ? "défaite"
                : "égalité";

   const game = {
    id: `g_${Date.now()}`,
    playerId: playerId,
    date: new Date().getFullYear() + "-" +
        String(new Date().getMonth() + 1).padStart(2, "0") + "-" +
        String(new Date().getDate()).padStart(2, "0") + "T" +
        String(new Date().getHours()).padStart(2, "0") + ":" +
        String(new Date().getMinutes()).padStart(2, "0"),
    playerScore: scoreJoueur,
    computerScore: scoreOrdinateur,
    result: result
};

    SaveGame(game);
}
