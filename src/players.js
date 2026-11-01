const RegexName = /^[A-Za-z0-9]{3,15}$/;
let selectedAvatar = "";
const Avatars = document.querySelectorAll("#avatars img")
const players = [];
 

    Avatars.forEach(avatar => {
    avatar.addEventListener("click", function (event) {
        selectedAvatar = event.target.id;
    });
});

export function AddPlayer() {

    const nickname = document.getElementById("nickname").value

    if (nickname.trim() === "") {
        alert("entrez un nickname")
        return;
    }

    if (!RegexName.test(nickname)) {
        alert("nick name invalide");
        return;
    }
    if (selectedAvatar == "") {
        alert("selectioner un avatar ")
        return;
    }



const existingPlayer = players.find((player) => {
    return player.nickname.toLowerCase() === nickname.toLowerCase()
})
if (existingPlayer) {
    alert("ce nick name existe deja")
    return;
}
const player =
{
    id: `p_${Date.now()}`,
    nickname: nickname,
    avatar: selectedAvatar
}
players.push(player);
const playerslist = document.getElementById("players-list")
const images = document.getElementById(player.avatar)
playerslist.innerHTML += `
<div  class="flex gap-4 pt-5"> 
   
    <img src="${images.src}" class="w-10 h-10"></img>
    <p class  = "text-white ">
        ${player.nickname}
    </p>
    

</div>`
}

export function removePlayers (){
    const playerslist = document.getElementById("players-list")
    playerslist.innerHTML= "";
}

