//constantes
const RADIUS = 10;
const COLOR1 = '#fafafaf';
const COLOR2 = '#fafaaf';
const COLOR3 = '#efdfdf';

//Variaveis Globais
let body = document.querySelector("body");
let header = document.querySelector("header");
let divinfo = document.querySelector(".divinfo");
let myimg = document.querySelector(".myimg");
let figure = document.querySelector("figure");
let logo = document.querySelector(".logo");
let main = document.querySelector("main");

//propriedades de elementos
body.style.backgroundColor = COLOR1;
header.style.backgroundColor = COLOR2;
header.style.borderRadius = RADIUS+"px";
divinfo.style.justify = 'flex-start';
myimg.style.margin = '0 '+ RADIUS/2 +'px 0 '+ RADIUS/2 + 'px';
myimg.style.borderRadius = RADIUS+'px';
figure.style.width = 90*RADIUS+'px';
figure.style.borderRadius = RADIUS+"px";
logo.style.borderRadius = RADIUS+'px';
main.style.backgroundColor = COLOR3;
main.style.borderRadius = RADIUS+"px";
