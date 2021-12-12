//constantes
const NCARS = 6;//numero maximo de carros
const NATRIB = 3;//atibutos sendo [vmin,vmax,derrapagem]

//variaveis globais
//let cars[NCARS][NATRIB];//carros
let cars=[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
let nvoltas = 10;
let numcars = document.getElementById("numbercars");
let bnext = document.getElementById("next");
let champ = document.querySelector(".result");
let caratrib = document.querySelectorAll(".caratribu");
let atribgraph = document.querySelectorAll(".atribgraph");
let carsdiv = document.querySelectorAll(".carsdiv");
let players = document.querySelectorAll(".players");
let carrum = document.querySelectorAll(".carrum");
let countvolts = document.querySelectorAll(".countvolts");
let voltsoption = document.querySelectorAll(".modalit");
let volts = document.querySelectorAll(".volts");


//funções
//inicia atributos dos carros
function initcars(){
    let temp = 50;
    //carro do pedro
    cars[0][0]=150;
    cars[0][1]=230;
    cars[0][2]=3;
    //carro do pedro
    cars[1][0]=120;
    cars[1][1]=260;
    cars[1][2]=5;
    //carro do pedro
    cars[2][0]=180;
    cars[2][1]=220;
    cars[2][2]=1;
    //outros carros
    for(let i=3;i < NCARS;i++){
        cars[i][0]=Math.floor(Math.random()*(150-100)+100);
        cars[i][1]=Math.floor(Math.random()*(280-200)+200);
        cars[i][2]=Math.floor(Math.random()*(8-1)+1);
    }
}
//inicia elementos html com valores dos carros
function initelements(){
    let i=0;
    //inicia mostradores dos carros
    for (let j=0; j<NCARS ; j++){
        atribgraph[j*3].style.width = (((cars[j][0])/150)*100)+'%';
        atribgraph[j*3+1].style.width = (((cars[j][1])/280)*100)+'%';
        atribgraph[j*3+2].style.width = (((cars[j][2])/8)*100)+'%';
        for (let k=0; k<NATRIB; k++){
            caratrib[i].innerHTML = cars[j][k];
            i++;
        }
    }
}
//torna visivel os carros competidores
function showelements(){
    let i = 0;
    for (i=0; i<NCARS; i++){
        if (i<parseInt(numcars.value)){
            players[i].style.visibility = "visible";
            carrum[i].style.visibility = "visible";
            countvolts[i].style.visibility = "visible";
        }else{
            players[i].style.visibility = "hidden";
            carrum[i].style.visibility = "hidden";
            countvolts[i].style.visibility = "hidden";
        }
    }
}
//inicia jogo
function startgame(){
    if (voltsoption[0].checked){
        nvoltas = 10;
    }else if (voltsoption[1].checked){
        nvoltas = 70;
    }else if (voltsoption[2].checked){
        nvoltas = 160;
    }
    playgame();        
}
//jogar
function playgame(){
    let avanco = [0,0,0,0,0,0];
    let avancoimg = [0,0,0,0,0,0];
    let vvictory = [0,0,0,0,0,0];
    let vitvolt=0;
    let vitoriy=0;
    for(let i=0;i<nvoltas;i++){
        for(let j=0;j<parseInt(numcars.value);j++){
            avanco[j]=((Math.random()*(cars[j][1]-cars[j][0]))+cars[j][0])*(1-(cars[j][2]/100));
                if(avanco[j] > avanco[vitvolt]){
                    vitvolt=j;
            }
        }
        vvictory[vitvolt]++;
        avancoimg[vitvolt] += (100/nvoltas);
            if(vvictory[i] > vvictory[vitoriy]){
                vitoriy=i;
        }
    }
    for (let i=0; i < parseInt(numcars.value); i++){
        carrum[i].style.marginLeft = (avancoimg[i]+'%');
        volts[i].innerHTML = vvictory[i];
    }
    champ.innerHTML = (vitoriy+1);
}

//chamada de funções
initcars();
initelements();
showelements();

//enventos
numcars.addEventListener('click',showelements);
bnext.addEventListener('click',startgame);
