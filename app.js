// decla des variables

let elementInput = document.getElementById("element");
let avertissement = document.getElementById("avertissement");
let element;
let formElements = document.getElementById("form");
let pListe = document.getElementById("p-liste");
let pResteAchats = document.getElementById("p-resteAchats");
let pALaMaison = document.getElementById("p-aLaMaison");

//  FCT récuperer la valeur de l'input element
function recupInput(){
    element = elementInput.value;
    checkString(element);
}

// FCT checkString
function checkString(element){
    element = elementInput.value; 
    if((!isNaN(element)) || (element == "")){
        // afficher avertissment en cas de type nombre ou champ vide
        avertissement.style.display = "block";
        avertissement.innerHTML = "veuillez vous assurez d'avoir entrer un nom!!";  
       setTimeout(()=>{
        avertissement.style.display = "none";
        }, 4000)
    }else{
    putElementInList();   
    }
}

// On mets une écoute d'event sur le formulaire
formElements.addEventListener("submit", function(event){

    event.preventDefault();

    recupInput();
})

// FCT envoyer element ds liste de course
function putElementInList(){
    let p1 = document.createElement("p");
    p1.textContent = "liste de courses:";
    p1.style.margin = "15px";
    p1.style.fontWeight = "bold";
    p1.style.color = "white";
    document.getElementById("p-liste").appendChild(p1);
    let li = document.createElement("li");
    li.textContent = element;
    li.style.listStyleType = "none";
    li.style.border = "3px solid black";
    li.style.borderRadius = "3px";
    li.style.margin = "10px";
    li.style.padding = "15px";
    li.style.color = "black";
    li.setAttribute("draggable", true);
   document.getElementById("p-liste").appendChild(li);
}

// FCT faire une boucle de taches + écoute d'évènement taches

let tableauDropList = [pListe, pResteAchats, pALaMaison];
bouclerTaches();
function bouclerTaches(){
    for( let i = 0; i < tableauDropList.length; i++){
        tableauDropList[i].addEventListener("dragover", dragOver);
        tableauDropList[i].addEventListener("dragenter", dragEnter);
        tableauDropList[i].addEventListener("dragleave", dragLeave);
        tableauDropList[i].addEventListener("drop", dragDrop);
    }
}

//j'écoute tout le DOM. S'il y a un élément qui est glisser/déplacer
// l'évènement est capturé. A partir de la capture d'évènement, je peux connaitre QUI était ciblé par l'évènement. C'est ce qu'on appelle la target (le "e.target")
document.addEventListener("dragstart", function(e){
    console.log("cible:",e.target);
    // je lance la fonction avec comme paramètre l'élément qui est en cours de déplacement 
    dragStart(e.target);
    // on stocke dans la variable item, l'élément qui est déplacé, pour s'en resservir dans l'écoute d'événement plus bas, au niveau du 'drop'
    item = e.target;
});
document.addEventListener("dragend", function(e){
    dragEnd(e.target);
});

function dragStart(param) {
    param.className += ' tenu';
}

function dragEnd(param) {
    param.className = 'base';
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';
}

function dragLeave() {
    this.className = 'case';
}

function dragDrop(param) {
    this.className = 'case';
    console.log(this);
    this.append(item);
}