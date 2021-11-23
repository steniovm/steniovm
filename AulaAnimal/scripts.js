//constantes
const RADIUS = 10;
const COLOR1 = '#f9f9f9';
const COLOR2 = '#ffeabf';
const COLOR3 = '#efdfdf';
const COLORTEXTE = "#1a1a1a"

//Variaveis Globais - referencias aos elementos
let body = document.querySelector("body");
let header = document.querySelector("header");
let divinfo = document.querySelector(".divinfo");
let myimg = document.querySelector(".myimg");
let figure = document.querySelector("figure");
let logo = document.querySelectorAll(".logo");
let main = document.querySelector("main");
let span = document.querySelectorAll("span");
let title1 = document.querySelectorAll("h1");
let title2 = document.querySelectorAll("h2");
let par = document.querySelectorAll(".ocorr > p");
let filog = document.querySelectorAll(".filogenia > div > span");
let espec = document.querySelectorAll(".especies > span");

//propriedades de elementos
function colors(){
    body.style.backgroundColor = COLOR1;
    header.style.backgroundColor = COLOR2;
    main.style.backgroundColor = COLOR3;
    for(let i=0; i<span.length ;i++){
    span[i].style.color = COLORTEXTE;    
    }
    for(let i=0; i<title1.length ;i++){
        title1[i].style.color = COLORTEXTE;
        title1[i].style.textAlign = "center";    
    }
    for(let i=0; i<title2.length ;i++){
        title2[i].style.color = COLORTEXTE;    
    }
}
function stylesforms(){
    header.style.borderRadius = RADIUS+"px";
    divinfo.style.justify = 'flex-start';
    myimg.style.margin = '0 '+ RADIUS/2 +'px 0 '+ RADIUS/2 + 'px';
    myimg.style.borderRadius = RADIUS+'px';
    figure.style.width = 90*RADIUS+'px';
    figure.style.borderRadius = RADIUS+"px";
    main.style.borderRadius = RADIUS+"px";
    for(let i=0; i<logo.length ;i++){
        logo[i].style.borderRadius = RADIUS+'px';    
    }
}

//preenchimento dos elementos

//header
function fillheader(){
    document.getElementById("myname").innerHTML = "Nome: Stênio";
    document.getElementById("myage").innerHTML = "idade: 38 anos";
    document.getElementById("myhome").innerHTML = "local: Belo Horizonte / MG";
}

//sessão ocorrencia
function fillocorr(param){
    param[0].innerHTML = "Tatus ocorrem na América do Sul, América Central e apenas uma espécie, o tatu-galinha (Dasypus novemcinctus), ocorre na América do Norte.";
    param[1].innerHTML = "Os tatus podem ocorrer nos mais diferentes habitats (floresta, pantanos, savanas, etc.) dependendo da especie.";
}

//sessão filogenia
function fillfilog(param){
    param[0].innerHTML = "Reino: Animalia";
    param[1].innerHTML = "Filo: Chordata";
    param[2].innerHTML = "Classe: Mammalia";
    param[3].innerHTML = "Infraclasse: Eutheria";
    param[4].innerHTML = "Superordem: Xenartros";
    param[5].innerHTML = "Ordem: Cingulata";
    param[6].innerHTML = "Família: Dasipodídeos";
    param[7].innerHTML = "Género: Dásipo";
}
//subsessão espécie
function fillespec(param){
    param[0].innerHTML = "Reino: Animalia";
    param[1].innerHTML = "Filo: Chordata";
    param[2].innerHTML = "Classe: Mammalia";
    param[3].innerHTML = "Infraclasse: Eutheria";
    param[4].innerHTML = "Superordem: Xenartros";
    param[5].innerHTML = "Ordem: Cingulata";
    param[6].innerHTML = "Família: Dasipodídeos";
    param[7].innerHTML = "Género: Dásipo";
}

//chamadas das funções
colors();
stylesforms();
fillheader();
fillocorr(par);
fillfilog(filog);
fillespec(espec)