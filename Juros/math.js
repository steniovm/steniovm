//variaveis globais
let memorys = [0,1,2,3,4,5,6,7,8];
let valueA = 0;
let valueB = 0;
let result = 0;
let memolabel = document.querySelectorAll(".memory>label");
let inpA = document.getElementById("numberA");
let menA = document.querySelectorAll(".mA");
let inpB = document.getElementById("numberB");
let menB = document.querySelectorAll(".mB");
let reselem = document.getElementById("result");
let menR = document.querySelectorAll(".mR");
let ops = document.querySelectorAll(".op");

//arrendonda valor com duas casas decimais
function arrend(numberlong){
    return Math.round(numberlong*100)/100;
}

//gera um numero aleatorio de 0 a 100
function randomizevalues(){
    return Math.random() * 100;
}

//inicia as variaveis com valores aleatórios de 0 a 100
function initvalues(){
    for(let i=0;i<9;i++){
        memorys[i] = randomizevalues();
    }
}

//preenche campos
function initvalueselement(){
    for(let i=0;i<9;i++){
        memolabel[i].innerHTML = arrend(memorys[i]);
    }
    inpA.value = arrend(valueA);
    inpB.value = arrend(valueB);
    reselem.innerHTML = arrend(result);
}

//manipulação de valores de memoria
//resgaste em A
function mentovalueA(memN){
    valueA = memorys[memN];
    inpA.value = arrend(memorys[memN]);
}

//resgaste em B
function mentovalueB(memN){
    valueB = memorys[memN];
    inpB.value = arrend(memorys[memN]);
}

//Salvar resultado
function saveR(memN){
    memorys[memN] = result;
    memolabel[memN].innerHTML = arrend(result);
}

//calculos
//soma
function op0(){
    valueA = parseFloat(inpA.value);
    valueB = parseFloat(inpB.value);
    result = valueA + valueB;
    reselem.innerHTML = arrend(result);
}
//subtração
function op1(){
    valueA = inpA.value;
    valueB = inpB.value;
    result = valueA - valueB;
    reselem.innerHTML = arrend(result);
}
//multiplicação
function op2(){
    valueA = inpA.value;
    valueB = inpB.value;
    result = valueA * valueB;
    reselem.innerHTML = arrend(result);
}
//divisão
function op3(){
    valueA = inpA.value;
    valueB = inpB.value;
    if (valueB != 0){
        result = valueA / valueB;
        reselem.innerHTML = arrend(result)
    }
    else{
        reselem.innerHTML = arrend("err div/0");
    }
}
//resto
function op4(){
    valueA = inpA.value;
    valueB = inpB.value;
    if (valueB != 0){
        result = valueA % valueB;
        reselem.innerHTML = arrend(result)
    }
    else{
        reselem.innerHTML = arrend("err div/0");
    }
}

//chamadas de funções ao carregar pagina
initvalues();
initvalueselement();

//eventos
//clicar em resgatar memoria em A
for(let i=0;i<menA.length;i++)
    menA[i].addEventListener('click',function (){mentovalueA(i)});
///clicar em resgatar memoria em B
for(let i=0;i<menB.length;i++)
    menB[i].addEventListener('click',function (){mentovalueB(i)});
//clicar em memorizar resultado
for(let i=0;i<menR.length;i++)
    menR[i].addEventListener('click',function (){saveR(i)});
//clicar em operação
ops[0].addEventListener('click',op0);
ops[1].addEventListener('click',op1);
ops[2].addEventListener('click',op2);
ops[3].addEventListener('click',op3);
ops[4].addEventListener('click',op4);