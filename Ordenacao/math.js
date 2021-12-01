//variaveis globais
let memorys = [0,0,0,0];
let valueA = 0;
let valueB = 0;
let result = 0;
let memolabel = document.querySelectorAll(".memory>label");
let inputs = document.querySelectorAll("input");
let menR = document.querySelectorAll(".mR");

//arrendonda valor com duas casas decimais
function arrend(numberlong){
    return Math.floor(numberlong*100)/100;
}

//gera um numero aleatorio de 0 a 100
function randomizevalues(){
    return Math.random() * 100;
}

//inicia as variaveis com valores aleatórios de 0 a 100
function initvalues(){
    for(let i=0;i<memorys.length;i++){
        memorys[i] = randomizevalues();
    }
}

//preenche campos
function initvalueselement(){
    for(let i=0;i<memorys.length;i++){
        memolabel[i].innerHTML = arrend(memorys[i]);
    }
}

//memorizar valores
function saveR(){
    for(let i=0;i<memorys.length;i++){
        memorys[i] = inputs[i].value;
        memolabel[i].innerHTML = arrend(inputs[i].value);
    }
}
//ordenar crescente
function sortup(){
    let temp=memorys[0];
    for (let i=0;i<memorys.length;i++){
        for(let j=i;j<memorys.length;j++){
            if (memorys[j]<memorys[i]){
                temp=memorys[i];
                memorys[i]=memorys[j];
                memorys[j]=temp;
            }
        }
        memolabel[i].innerHTML = arrend(memorys[i]);
    }
}
function sortdown(){
    let temp=memorys[0];
    for (let i=0;i<memorys.length;i++){
        for(let j=i;j<memorys.length;j++){
            if (memorys[j]>memorys[i]){
                temp=memorys[i];
                memorys[i]=memorys[j];
                memorys[j]=temp;
            }
        }
        memolabel[i].innerHTML = arrend(memorys[i]);
    }
}

//chamadas de funções ao carregar pagina
initvalues();
initvalueselement();

//eventos
//clicar em memorizar
menR[0].addEventListener('click',saveR);
//clicar em memorizar
menR[1].addEventListener('click',sortup);
//clicar em memorizar
menR[2].addEventListener('click',sortdown);