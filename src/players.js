const RegexName =  /^[A-Za-z0-9]{3,15}$/ ;
 let selectedAvatar= "";
const avatars = document.querySelectorall("#avatars img")
avatars.forEach(avatar => {
    avatar.addEventListener("click", function(event) {
        selectedAvatar = event.target.id;
    });
});

 export function AddPlayer(){



const nickname = document.getElementById("nickname").value
if(!RegexName.test(nickname)) {
    alert("nick name invalide");
    return
}
if (selectedAvatar == "") {
    alert("selectioner un avatar ")
return;
 
if (nickname == ""){  alert("entrez un nick name")
return;
}
   
const player =
{    id: `p_${Date.now()}`,
     nickname: nickname,
    avatar : selectedAvatar,

    
}

}
 }

