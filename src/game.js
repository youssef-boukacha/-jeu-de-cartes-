let joueur =
    [{ name: "empereure", url: "src/images/empereur.png" },
    { name: "citoyen", url: "src/images/citoyen.png" },
    { name: "citoyen", url: "src/images/citoyen.png" },
    { name: "citoyen", url: "src/images/citoyen.png" },
    { name: "citoyen", url: "src/images/citoyen.png" }]
let ordinateur =
    [{ name: "esclave", url: "src/images/back.jpg" },
    { name: "citoyen", url: "src/images/back.jpg" },
    { name: "citoyen", url: "src/images/back.jpg" },
    { name: "citoyen", url: "src/images/back.jpg" },
    { name: "citoyen", url: "src/images/back.jpg" }];

    
   

export  function DistributionDesCartes (){
         const ordinateur_carte = document.getElementById("bot")/* LE DIV DES CARTES DE ORDINATEURE*/
    const joueur_carte = document.getElementById("zone-des-cartes") /* LE DIV DES CARTES DE JOUEURE*/

    joueur.forEach( (carte) => {
        joueur_carte.innerHTML +=`<div class= "py-4">
        <img src= "${carte.url}" alt="cartes" 
        class= "border border-1 border-[#990000] gap-3 shadow-xl " id="carteDeJoue"> 
        </div> `
    })
   ordinateur.forEach( (carteOrdi) => {
        ordinateur_carte.innerHTML +=`<div class= "py-4">
        <img src= "${carteOrdi.url}" alt="cartes" 
        class= "border border-1 border-[#990000] gap-3 shadow-xl "> 
        </div> `
    })

}


