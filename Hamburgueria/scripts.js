//constantes
const RADIUS = 10;

//Variaveis Globais - referencias aos elementos
let state = 0;//variavel de estado
let header = document.querySelector("header");
let myimg = document.querySelector(".myimg");
let main = document.querySelector("main");
let footer = document.querySelector("footer");
let fiset = document.querySelectorAll("fieldset");
let imputs = document.querySelectorAll("input");
let buttons = document.querySelectorAll("button");
let namesped = document.querySelectorAll(".namesped");
let chasped = document.querySelectorAll(".chasped");
let vtotal = document.querySelector("#tot");
let optcash = [0,3,8,6,0,13,10,12,0,1.5,1.5,3,0,3,3,5];
let optname = ['Sem pão','Pão francês','Pão Australiano','Pão de Brioche',
                'Sem Hambúrguer','Hambúrguer de picanha','Hamburguer de costela','Hamburguer Vegano',
                'Sem salada','Alface','Tomate','Pickles',
                'Sem queijo','Mussarela','Prato','Cheddar'];
let payment = [0,0,0,0,0];
//propriedades de elementos
function stylesforms(){
    header.style.borderRadius = RADIUS+'px'; 
    myimg.style.borderRadius = RADIUS+'px';
    main.style.borderRadius = RADIUS+'px';
    footer.style.borderRadius = RADIUS+"px";
    fiset[0].style.visibility = "visible";
    fiset[0].style.height = "unset";
}

//preenchimento dos elementos
//header
function fillheader(){
    document.getElementById("myname").innerHTML = "Nome: Stênio";
    document.getElementById("myage").innerHTML = "Idade: 38 anos";
    document.getElementById("myhome").innerHTML = "Local: Belo Horizonte / MG";
}

//mudança de sessão
function nextform(){
    switch (state){
        case 0:
            fiset[1].style.visibility = "visible";
            fiset[1].style.height = "unset";
            fiset[0].style.visibility = "hidden";
            fiset[0].style.height = "0px";
        break;
        case 1:
            fiset[2].style.visibility = "visible";
            fiset[2].style.height = "unset";
            fiset[1].style.visibility = "hidden";
            fiset[1].style.height = "0px";
        break;
        case 2:
            fiset[3].style.visibility = "visible";
            fiset[3].style.height = "unset";
            fiset[2].style.visibility = "hidden";
            fiset[2].style.height = "0px";
        break;
        case 3:
            fiset[4].style.visibility = "visible";
            fiset[4].style.height = "unset";
            fiset[3].style.visibility = "hidden";
            fiset[3].style.height = "0px";
        break;
    }
    state++;
}
function backform(){
    state--;
    switch (state){
        case 0:
            fiset[0].style.visibility = "visible";
            fiset[0].style.height = "unset";
            fiset[1].style.visibility = "hidden";
            fiset[1].style.height = "0px";
        break;
        case 1:
            fiset[1].style.visibility = "visible";
            fiset[1].style.height = "unset";
            fiset[2].style.visibility = "hidden";
            fiset[2].style.height = "0px";
        break;
        case 2:
            fiset[2].style.visibility = "visible";
            fiset[2].style.height = "unset";
            fiset[3].style.visibility = "hidden";
            fiset[4].style.height = "0px";
        break;
        case 3:
            fiset[3].style.visibility = "visible";
            fiset[3].style.height = "unset";
            fiset[4].style.visibility = "hidden";
            fiset[4].style.height = "0px";
        break;
    }
}
//atualizar conta
function noteupdate(){
    let optpao = document.querySelectorAll(".optpao");
    let optburguer = document.querySelectorAll(".optburguer");
    let optsalt = document.querySelectorAll(".optsalt");
    let optchess = document.querySelectorAll(".optchess");
    for(let i=0;i<imputs.length;i++){
        if(imputs[i].checked){
            if (i<optpao.length){
                namesped[0].innerHTML = optname[i];
                chasped[0].innerHTML = 'R$ '+ optcash[i];
                payment[0]=optcash[i];
            }else if(i<(optpao.length+optburguer.length)){
                namesped[1].innerHTML = optname[i];
                chasped[1].innerHTML = 'R$ '+ optcash[i];
                payment[1]=optcash[i];
            }else if(i<(optpao.length+optburguer.length+optsalt.length)){
                namesped[2].innerHTML = optname[i];
                chasped[2].innerHTML = 'R$ '+ optcash[i];
                payment[2]=optcash[i];
            }else if(i<(optpao.length+optburguer.length+optsalt.length+optchess.length)){
                namesped[3].innerHTML = optname[i];
                chasped[3].innerHTML = 'R$ '+ optcash[i];
                payment[3]=optcash[i];
            }
        }
    }
    payment[payment.length-1]=0;
    for (let i=0;i<payment.length-1;i++)
        payment[payment.length-1]+=payment[i];
    vtotal.innerHTML = 'Total: R$ '+payment[payment.length-1];
}
//limpar
function resetvalues(){
    for (let i=0;i<namesped.length;i++){
        namesped[i].innerHTML="";
        chasped[i].innerHTML="R$ 0,00"
    }
    for (let i=0;i<payment.length;i++){
        payment[i]=0;
    }
    vtotal.innerHTML = 'Total: R$ 0,00';
    fiset[0].style.visibility = "visible";
    fiset[1].style.visibility = "hidden";
    fiset[2].style.visibility = "hidden";
    fiset[3].style.visibility = "hidden";
    fiset[4].style.visibility = "hidden";
    fiset[0].style.height = "unset";
    fiset[1].style.height = "0px";
    fiset[2].style.height = "0px";
    fiset[3].style.height = "0px";
    fiset[4].style.height = "0px";
    state=0;
}
//enviar
function sendvalues(){
    let name = document.querySelector("#name");
    if (name.value!=""){
        //enviar para o chapeiro namesped[0 ao 3] e nome
        resetvalues();
        alert(name.value+", agradeçemos a preferencia. Aguarde seu pedido, será chamado pelo seu nome.");
    }else{
        alert("Digite seu nome");
    }
}

//chamadas das funções
stylesforms();
fillheader();

//eventos
//passagem de sessão
for(let i=0;i<imputs.length-3;i++)
    imputs[i].addEventListener('click',nextform);

for(let i=0;i<buttons.length;i++)
    buttons[i].addEventListener('click',backform);

//atribuição de valores
for(let i=0;i<imputs.length;i++)
    imputs[i].addEventListener('click',noteupdate);

//final de formulario
document.querySelector("#subm").addEventListener('click',sendvalues);
document.querySelector("#rese").addEventListener('click',resetvalues);

