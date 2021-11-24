//constantes
const RADIUS = 10;
const COLOR1 = '#f9f9f9';
const COLOR2 = '#ffeabf';
const COLOR3 = '#efdfdf';
const COLORTEXTE = "#1a1a1a";
const QUEST = ["Nome:","Cordialidade:","Ambiente:","Tempo de Atendimento:","Tempo de Agendamento","Sabor da Comida:","Possibilidade de recomendar a um amigo:","Possibilidae de retornar:","Sugestões e elogios:"];

//Variaveis Globais - referencias aos elementos
let body = document.querySelector("body");
let header = document.querySelector("header");
let divinfo = document.querySelector(".divinfo");
let myimg = document.querySelector(".myimg");
let main = document.querySelector("main");
let span = document.querySelectorAll("span");
let title1 = document.querySelectorAll("h1");
let title2 = document.querySelectorAll("h2");
let par = document.querySelectorAll(".tanks > p");
let footer = document.querySelector("footer");
let valu = document.querySelectorAll(".questions>input");
let rets = document.querySelectorAll(".results");

//propriedades de elementos
function colors(){
    body.style.backgroundColor = COLOR1;
    header.style.backgroundColor = COLOR2;
    for(let i=0; i<span.length ;i++){
    span[i].style.color = COLORTEXTE;    
    }
    for(let i=0; i<title2.length ;i++){
        title2[i].style.color = COLORTEXTE;    
    }
    footer.style.backgroundColor = COLOR2;

}
function stylesforms(){
    header.style.borderRadius = RADIUS+"px";
    divinfo.style.justify = 'flex-start';
    myimg.style.margin = '0 '+ RADIUS/2 +'px 0 '+ RADIUS/2 + 'px';
    myimg.style.borderRadius = RADIUS+'px';
    main.style.borderRadius = RADIUS+'px';
    for(let i=0; i<title1.length ;i++){
        title1[i].style.textAlign = "center";    
    }
    footer.style.borderRadius = RADIUS+"px";
    document.getElementById("results").style.visibility = "hidden";
}

//preenchimento dos elementos

//header
function fillheader(){
    document.getElementById("myname").innerHTML = "Nome: Stênio";
    document.getElementById("myage").innerHTML = "idade: 38 anos";
    document.getElementById("myhome").innerHTML = "local: Belo Horizonte / MG";
}
//form
function fillquest(){
    let questo = document.querySelectorAll(".questions > label");
    for(let i=0;i<QUEST.length;i++){
        questo[i].innerHTML = QUEST[i];
    }
}
//result
function fillresults(){
    for(let i=0;i<(QUEST.length-1);i++){
        rets[i].innerHTML = QUEST[i]+" "+valu[i].value;
    }
    rets[QUEST.length-1].innerHTML = QUEST[QUEST.length-1]+document.getElementById('area1').value;
    document.getElementById("results").style.visibility = "visible";
}

//funções de click
function clickmain(){
    document.querySelector("h1").innerHTML="Super Churrascaria do Samir";
    main.style.borderRadius = "100px";
    for(let i=0; i<100; i++){
        setTimeout(function(){
            main.style.borderRadius = i+"%";
        },50);
    }
    for(let i=100; i>0; i--){
        setTimeout(function(){
            main.style.borderRadius = i+"%";
        },50);
    }
}


//chamadas das funções

colors();
stylesforms();
fillheader();
fillquest();

//eventos
document.getElementById("mainprin").onclick = function() {clickmain()};
document.getElementById("submit").onclick = function() {fillresults()};