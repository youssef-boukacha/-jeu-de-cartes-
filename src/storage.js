export function SavePlayers(players) {
    localStorage.setItem("players", JSON.stringify(players));
}

export function GetPlayers() {
    return JSON.parse(localStorage.getItem("players")) || [];
}

export function SaveSelectedPlayer(playerId) {
    localStorage.setItem("selectedPlayer", playerId);
}

export function GetSelectedPlayer() {
    return localStorage.getItem("selectedPlayer");
}

export function RemoveSelectedPlayer() {
    localStorage.removeItem("selectedPlayer");
}
// Sauvegarder les scores
export function SaveScores(playerId, scoreJoueur, scoreOrdinateur) {
    if (!playerId) return;

    const allScores = JSON.parse(localStorage.getItem("scores")) || [];

    allScores[playerId] = {
        scoreJoueur: scoreJoueur,
        scoreOrdinateur: scoreOrdinateur
    };

    localStorage.setItem("scores", JSON.stringify(allScores));
}

// Récupérer les scores
export function GetScores(playerId) {
    const allScores = JSON.parse(localStorage.getItem("scores")) || [];

    return allScores[playerId] || {
        scoreJoueur: 0,
        scoreOrdinateur: 0
    };
}

// Historique des parties

export function SaveGame(game) {
    const history = JSON.parse(localStorage.getItem("history")) || [];

    history.push(game);

    localStorage.setItem("history", JSON.stringify(history));
}

export function GetHistory() {
    return JSON.parse(localStorage.getItem("history")) || [];
}
export function DeleteGame(gameId) {
    const history = GetHistory();

    const updatedHistory = history.filter(game => {
        return game.id !== gameId;
    });

    localStorage.setItem("history", JSON.stringify(updatedHistory));
}