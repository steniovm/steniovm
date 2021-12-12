//constantes
const NCARS = 5;//numero maximo de carros por cada jogador
const NPLAYERS = 3;//numero de jogadores

//variaveis globais
let carsrum= [0,5,9];//armazena os numeros dos carros da corrida
let cars = [[],[],[]]//armazena os carros de cada jogador ([0]pedro)([1]juca)([2]edna)
let nvoltas = 10;
let carsp = document.querySelectorAll(".carsp")
let gercarbutton = document.querySelectorAll(".gercar");
let carimg = document.querySelectorAll(".carimg");
let caratrib = document.querySelectorAll(".caratribu");
let atribgraph = document.querySelectorAll(".atribgraph");
let optcar = document.querySelectorAll(".optcar");
let carrum = document.querySelectorAll(".carrum");
let carimgr = document.querySelectorAll(".carimgr");
let voltsoption = document.querySelectorAll(".modalit");
let bnext = document.getElementById("next");
let volts = document.querySelectorAll(".volts");
let champ = document.querySelector(".result");

const CAR = {//objeto do carro
    dono: 'nomedodono';
    cor: 'numero da image que vai ilustar o carro';
    raridadesort: 0;//raridade do carro
    raridade: 'modelo do carro';
    velocMax: { min: '180', max: '230' };
    velocMin: { min: '110', max: '160' };
    derrapagem: { min: '1', max: '4' };
    level: 0;
    points: 0
}

function geracarro(carrob){//função geradora do carro
    carrob.cor = Math.floor(Math.random()*6);
    carrob.raridadesort = Math.random();
    carrob.raridade = raridad(carrob.raridadesort);
    carrob.velocMax.min = maxmin (carrob.raridadesort);
    carrob.velocMax.max = maxmax (carrob.raridadesort);
    carrob.velocMin.min = minmin (carrob.raridadesort);
    carrob.velocMin.max = minmax (carrob.raridadesort);
    derrapagem.min = derrapmin(carrob.raridadesort);
    derrapagem.max = derrapmax(carrob.raridadesort);
}

//gera a raridade (Categoria) do carro
function raridad(rarid) {
    if (rarid < 0.6){
        return 'Popular';}
    else if (rarid < 0.95){
        return 'Sport';}
    else{
        return 'Super Sport';}
}
//gera a velocidade maxima do carro
function maxmin(rarid){
    if (rarid < 0.6)
            return 180;
        else if (rarid < 0.95)
            return 195;
        else
            return 210;
}
function maxmax(rarid){
    if (rarid < 0.6)
            return 200;
        else if (rarid < 0.95)
            return 215;
        else
            return 230;
}
//gera a velocidade minima do carr
function minmin(rarid){
    if (rarid < 0.6)
            return 110;
        else if (rarid < 0.95)
            return 125;
        else
            return 140;
}
function minmax(rarid){
    if (rarid < 0.6)
            return 130;
        else if (rarid < 0.95)
            return 145;
        else
            return 160;
}
//gera o indice de derrapagem do carro
function derrapmin(rarid) {
    if (rarid < 0.6)
        return 3;
    else if (rarid < 0.95)
        return 2;
    else
        return 1;
}
function derrapmax(rarid) {
    if (rarid < 0.6)
        return 4;
    else if (rarid < 0.95)
        return 3;
    else
        return 1.75;
}
//gera carro se ainda não tiver 5 carros
function gercar(p){
    let nome;
    //define dono do carro
    if (p == 0) nome = "Pedro";
    else if (p == 1) nome = "Juca";
    else if (p == 2) nome = "Edna";
    //gera carro
    if (cars[p].length<NCARS){
        cars[p][cars[p].length]= CAR;
        cars[p][cars[p].length-1].dono = nome;
        geracarro(cars[p][cars[p].length]);
    }
    //publica dados do carro
    carimg[NCARS*p + cars[p].length -1].src = ("img/car"+(cars[p][cars[p].length-1].cor + 1)+".png");
    caratrib[(NCARS*p + cars[p].length -1)*3].innerHTML = Math.floor(cars[p][cars[p].length-1].velocMin);
    caratrib[(NCARS*p + cars[p].length -1)*3 + 1].innerHTML = Math.floor(cars[p][cars[p].length-1].velocMax);
    caratrib[(NCARS*p + cars[p].length -1)*3 + 2].innerHTML = (Math.floor(cars[p][cars[p].length-1].derrapagem *10)/10);
    atribgraph[(NCARS*p + cars[p].length -1)*3].style.width = (Math.floor(cars[p][cars[p].length-1].velocMin -110)*(100/50))+'%';
    atribgraph[(NCARS*p + cars[p].length -1)*3 + 1].style.width = (Math.floor(cars[p][cars[p].length-1].velocMax - 180)*(100/50))+'%';
    atribgraph[(NCARS*p + cars[p].length -1)*3 + 2].style.width = (Math.floor(cars[p][cars[p].length-1].derrapagem)*(100/4))+'%';
    carsp[NCARS*p + cars[p].length -1].style.visibility = "visible";
}
//coloca os carros na pista
function gerpista(car){
    if (car < NCARS){
        carrum[0].style.visibility = "visible";
        carimgr[0].src = ("img/car"+(cars[0][car].cor + 1)+".png");
        carsrum[0]=car;
    }else if (car<(2*NCARS)){
        carrum[1].style.visibility = "visible";
        carimgr[1].src = ("img/car"+(cars[1][car-5].cor + 1)+".png");
        carsrum[1]=car-5;
    }else if (car<(3*NCARS)){
        carrum[2].style.visibility = "visible";
        carimgr[2].src = ("img/car"+(cars[2][car-10].cor + 1)+".png");
        carsrum[2]=car-10;
    }
}
//inicia a corrida de acordo com o numero de voltas
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
//durante a corrida cada volta contabiliza o melhor motorista
function playgame(){
    let avanco = [0,0,0];
    let avancoimg = [0,0,0];
    let vvictory = [0,0,0];
    let vitvolt=0;
    let vitoriy=0;
    //intera volta a volta
    for(let i=0;i<nvoltas;i++){
        for(let j=0;j<NPLAYERS;j++){
            let sorte = Math.random();
            let vmax = cars[j][carsrum[j]].velocMax;
            let vmin = cars[j][carsrum[j]].velocMin;
            let derr = cars[j][carsrum[j]].derrapagem;
            avanco[j]=(sorte*(vmax-vmin)+vmin)*(1-(derr/100));
                if(avanco[j] > avanco[vitvolt]){
                    vitvolt=j;
            }
        }
        vvictory[vitvolt]++;//contabiliza a melhor volta
        avancoimg[vitvolt] += (100/nvoltas);
            if(vvictory[vitvolt] > vvictory[vitoriy]){
                vitoriy=vitvolt;
        }
    }
    //atualiza os elementos html
    for (let i=0; i < NPLAYERS; i++){
        volts[i].innerHTML = vvictory[i];
        carrum[i].style.marginLeft = (avancoimg[i]+'%');
        volts[i].innerHTML = vvictory[i];
    }
    //mostra o vencedor
    if (vitoriy == 0){
        champ.innerHTML = ("PEDRO");
        alert("PARABENS PEDRO - VOCE VENCEU "+vvictory[0]+" VOLTAS");
    }else if (vitoriy == 1){
        champ.innerHTML = ("JUCA");
        alert("PARABENS JUCA - VOCE VENCEU "+vvictory[1]+" VOLTAS");
    }else if (vitoriy == 2){
        champ.innerHTML = ("EDNA");
        alert("PARABENS EDNA - VOCE VENCEU "+vvictory[2]+" VOLTAS");
    }
}
//enventos
//clicar em gerar carro
for (let i=0;i<gercarbutton.length;i++)
    gercarbutton[i].addEventListener('click',function(){gercar(i)});
//clicar no carro escolhido
for (let i=0;i<optcar.length;i++)
    optcar[i].addEventListener('click',function(){gerpista(i)});
//clicar em iniciar corrida
bnext.addEventListener('click',startgame);
