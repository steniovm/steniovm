//constantes e variaveis universais
const C = 299792458E0; // m/s
const UA = 1495978707E2; // m
const LY = 94607304725808E2; // m
const PC = 30856775814913673E0; // m
const canvasrefnave = document.getElementById('canvasrefnave');
const canvasrefplaneta = document.getElementById('canvasrefplaneta');
const ctxnave = canvasrefnave.getContext("2d");
const ctxplaneta = canvasrefplaneta.getContext("2d");
const massa = document.getElementById('massa');
const veloc = document.getElementById('veloc');
const distunit = document.getElementById('distunit');
const dist = document.getElementById('dist');
const startcond = document.getElementById('startcond');
const pausecond = document.getElementById('pausecond');
const naves = document.getElementsByName('imgnave');
const planets = document.getElementsByName('imgplanet');
const imgnaves = document.querySelectorAll('.imgnave');
const imgplanets = document.querySelectorAll('.imgplanet');
const titlescreen = document.querySelectorAll('.titlescreen');
const result = document.querySelectorAll('.result');
if (screen.width < 600){
    canvasrefnave.width = screen.width;
    canvasrefplaneta.width = screen.width;
}
const maxWidth = canvasrefnave.width;
const maxHeight = canvasrefnave.height;
const numberstarts = 200;
const stars = [];
let du = UA;
let lorentzf;
let timetravel = 1;
let owntime = 1;
let owndistance = 0.5;
let imgnave = imgnaves[0];
let imgplanet = imgplanets[0];
//estruturas das estrelas
function star(){
    this.x = Math.random()*maxWidth;
    this.y = Math.random()*maxHeight;
    this.size = Math.random()*1;
    let compred = 205 + Math.random()*50;
    let compgreen = 205 + Math.random()*50;
    let compblue = 205 + Math.random()*50;
    this.color = "rgb("+compred+","+compgreen+","+compblue+")";
}
//cria vetor de estrelas
for(let i=0; i<numberstarts; i++){
    stars.push(new star())
}
//calcula o fator de lorentz
function lorentzfactor(){
    return 1/Math.sqrt(1-Math.pow(veloc.value,2));
}
//calcula parametros:
//tempo proprio, distancia propria, tempo de viagem
function calcparam(){
    lorentzf = lorentzfactor();
    timetravel = (dist.value*du)/(veloc.value*C);
    owntime = timetravel*lorentzf;
    owndistance = (dist.value)/lorentzf;
    showresults();
    plotScreens();
}
//plota estrelas em elemento canva
function plotstars(n,ctx,d){
    ctx.beginPath();
    ctx.arc(stars[n].x*d, stars[n].y, stars[n].size, 0, 2*Math.PI);
    ctx.fillStyle = stars[n].color;
    ctx.fill();
}
//plota o fundo dos canvas com as estrelas
function plotBackground(){
    ctxplaneta.clearRect(0,0,maxWidth,maxHeight);
    ctxnave.clearRect(0,0,maxWidth,maxHeight);
    for(let i=0; i<numberstarts; i++){
        plotstars(i,ctxplaneta,1);
        plotstars(i,ctxnave,(1/lorentzf));
    }
}
//plota a nave e o planeta de destino
function plotAstros(pnave,pplanet){
    ctxplaneta.drawImage(imgplanet,(pplanet-(maxHeight/2)),0,maxHeight, maxHeight);
    ctxplaneta.drawImage(imgnave,(pnave*(maxWidth*0.95)),((maxHeight/2)-25),50,50);
    ctxnave.drawImage(imgplanet,((pplanet-(maxHeight/2))*(1/lorentzf)),0,(maxHeight*(1/lorentzf)), maxHeight);
    ctxnave.drawImage(imgnave,(pnave*(maxWidth*0.95)*(1/lorentzf)),((maxHeight/2)-25),(50*(1/lorentzf)),50);
}
//plota as telas
function plotScreens(nave=0,planeta=maxWidth){
    plotBackground();
    plotAstros(nave,planeta);
}
//mostra os resultados dos calculos
function showresults(){
    result[0].innerHTML = `γ  = ${lorentzf.toPrecision(4)}`;
    result[1].innerHTML = `L  = ${(dist.value*du).toPrecision(4)} m`;
    result[2].innerHTML = `L' = ${(dist.value*du/lorentzf).toPrecision(4)} m`;
    result[3].innerHTML = `t  = ${timetravel.toPrecision(4)} s`;
    result[4].innerHTML = `t' = ${owntime.toPrecision(4)} s`;
    result[5].innerHTML = `m  = ${(massa.value*1).toPrecision(4)} kg`;
    result[6].innerHTML = `m' = ${(massa.value*lorentzf).toPrecision(4)} kg`;
    result[7].innerHTML = `v  = ${(veloc.value*C).toPrecision(4)} m/s`;
    result[8].innerHTML = `E  = ${(lorentzf*0.5*massa.value*Math.pow(veloc.value*C,2)).toPrecision(4)} j`;
}
//inicia com calculos de parametros padrão telas padrão
calcparam();
plotScreens();
//simula a viagem
function playTravel(){
    let count = 0;
    let l, t;
    let timeinterval = setInterval(()=>{
        count += 0.01;
        plotScreens(count);
        l = (dist.value*du*count).toPrecision(4);
        t = (owntime*count).toPrecision(4);
        titlescreen[0].innerHTML = `Referencial do Planeta: L  = ${l} m ; t' = ${t} s`;
        l = ((dist.value*du/lorentzf)*count).toPrecision(4);
        t = (timetravel*count).toPrecision(4);
        titlescreen[1].innerHTML = `Referencial da Nave: L'  = ${l} m ; t = ${t} s`;
        if (count >= 1){
            clearInterval(timeinterval);
            count = 0;
        }
    },50);
}

//eventos
massa.addEventListener('click',calcparam);
veloc.addEventListener('click',calcparam);
distunit.addEventListener('change',function(){
    if (distunit.value == "UA") du = UA;
    else if (distunit.value == "ly") du = LY;
    else if (distunit.value == "pc") du = PC;
    calcparam();
});
dist.addEventListener('click',calcparam);
naves.forEach((item,index)=>{
    item.addEventListener('click',function(){
        imgnave = imgnaves[index];
        plotScreens();
    });
});
planets.forEach((item,index)=>{
    item.addEventListener('click',function(){
        imgplanet = imgplanets[index];
        plotScreens();
    });
});
startcond.addEventListener('click',playTravel);