const RegexName = /^[A-Za-z0-9]{3,15}$/;
let selectedAvatar = "";
const Avatars = document.querySelectorAll("#avatars img")
let players = [];
 

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
<div  class="flex gap-4 pt-5 " data-id="${player.id}"> 
   
<div class="selected inline-flex items-center gap-2 w-fit p-1">
    <img src="${images.src}" class="w-10 h-10"></img>
    <p class  = "text-white ">
        ${player.nickname}
    </p> 
    </div>

    <div>
    <button type ="button"  class=" remove border border-indigo-600 rounded-xl text-white w-25" > Suprimer </button>
    </div>
    

</div>`
}
   
  
        const playerslist = document.getElementById("players-list")
    playerslist.addEventListener("click",event =>
    {
        const selected = event.target.closest(".selected")
        if (!selected) return;

        const playerElement = selected.closest("[data-id]")
        if (!playerElement) return;

        const playerId = playerElement.dataset.id;
        
        const player  = players.find(player =>
            player.id === playerId
        );
        if (!player) return;
         document.querySelectorAll(".selected").forEach(profile => {
        profile.classList.remove(
            "border-2",
            "border-indigo-500",
            "rounded-md"
        );
    });
          
         // Add border to selected profile
 selected.classList.add(
        "border-2",
        "border-indigo-500",
        "rounded-md"
    );
        const avatar = document.getElementById(player.avatar);
        const profile = document.getElementById("img")

        profile.innerHTML = 

         `
         <img src="${avatar.src}" class="w-15 h-15 border border-2 rounded-md">
        <p class="text-white font-serif">${player.nickname}</p>
    `;

       localStorage.setItem("selectedPlayer", playerId);

    });




export function removePlayers (button){

    const playerElement = button.closest("[data-id]");

    const playerId = playerElement.dataset.id;

    players = players.filter(player => player.id !== playerId);

    playerElement.remove();

}    

// export function selection() {
    
// }


