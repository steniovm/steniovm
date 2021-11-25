//constantes
const RADIUS = 10;

//Variaveis Globais - referencias aos elementos
let header = document.querySelector("header");
let myimg = document.querySelector(".myimg");
let main = document.querySelector("main");
let footer = document.querySelector("footer");

//propriedades de elementos
function stylesforms(){
    header.style.borderRadius = RADIUS+'px'; 
    myimg.style.borderRadius = RADIUS+'px';
    main.style.borderRadius = RADIUS+'px';
    footer.style.borderRadius = RADIUS+"px";
}

//preenchimento dos elementos
//header
function fillheader(){
    document.getElementById("myname").innerHTML = "Nome: Stênio";
    document.getElementById("myage").innerHTML = "Idade: 38 anos";
    document.getElementById("myhome").innerHTML = "Local: Belo Horizonte / MG";
}

//chamadas das funções
stylesforms();
fillheader();

