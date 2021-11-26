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
    //valueA = randomizevalues();
    //valueB = randomizevalues();
    //result = randomizevalues();
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
function mentovalueA0(){
    valueA = memorys[0];
    inpA.value = arrend(memorys[0]);
}
function mentovalueA1(){
    valueA = memorys[1];
    inpA.value = arrend(memorys[1]);
}
function mentovalueA2(){
    valueA = memorys[2];
    inpA.value = arrend(memorys[2]);
}
function mentovalueA3(){
    valueA = memorys[3];
    inpA.value = arrend(memorys[3]);
}
function mentovalueA4(){
    valueA = memorys[4];
    inpA.value = arrend(memorys[4]);
}
function mentovalueA5(){
    valueA = memorys[5];
    inpA.value = arrend(memorys[5]);
}
function mentovalueA6(){
    valueA = memorys[6];
    inpA.value = arrend(memorys[6]);
}
function mentovalueA7(){
    valueA = memorys[7];
    inpA.value = arrend(memorys[7]);
}
function mentovalueA8(){
    valueA = memorys[8];
    inpA.value = arrend(memorys[8]);
}
//resgaste em B
function mentovalueB0(){
    valueB = memorys[0];
    inpB.value = arrend(memorys[0]);
}
function mentovalueB1(){
    valueB = memorys[1];
    inpB.value = arrend(memorys[1]);
}
function mentovalueB2(){
    valueB = memorys[2];
    inpB.value = arrend(memorys[2]);
}
function mentovalueB3(){
    valueB = memorys[3];
    inpB.value = arrend(memorys[3]);
}
function mentovalueB4(){
    valueB = memorys[4];
    inpB.value = arrend(memorys[4]);
}
function mentovalueB5(){
    valueB = memorys[5];
    inpB.value = arrend(memorys[5]);
}
function mentovalueB6(){
    valueB = memorys[6];
    inpB.value = arrend(memorys[6]);
}
function mentovalueB7(){
    valueB = memorys[7];
    inpB.value = arrend(memorys[7]);
}
function mentovalueB8(){
    valueB = memorys[8];
    inpB.value = arrend(memorys[8]);
}
//Salvar resultado
function saveR0(){
    memorys[0] = result;
    memolabel[0].innerHTML = arrend(result);
}
function saveR1(){
    memorys[1] = result;
    memolabel[1].innerHTML = arrend(result);
}
function saveR2(){
    memorys[2] = result;
    memolabel[2].innerHTML = arrend(result);
}
function saveR3(){
    memorys[3] = result;
    memolabel[3].innerHTML = arrend(result);
}
function saveR4(){
    memorys[4] = result;
    memolabel[4].innerHTML = arrend(result);
}
function saveR5(){
    memorys[5] = result;
    memolabel[5].innerHTML = arrend(result);
}
function saveR6(){
    memorys[6] = result;
    memolabel[6].innerHTML = arrend(result);
}
function saveR7(){
    memorys[7] = result;
    memolabel[7].innerHTML = arrend(result);
}
function saveR8(){
    memorys[8] = result;
    memolabel[8].innerHTML = arrend(result);
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
menA[0].addEventListener('click',mentovalueA0);
menA[1].addEventListener('click',mentovalueA1);
menA[2].addEventListener('click',mentovalueA2);
menA[3].addEventListener('click',mentovalueA3);
menA[4].addEventListener('click',mentovalueA4);
menA[5].addEventListener('click',mentovalueA5);
menA[6].addEventListener('click',mentovalueA6);
menA[7].addEventListener('click',mentovalueA7);
menA[8].addEventListener('click',mentovalueA8);
//clicar em resgatar memoria em A
menB[0].addEventListener('click',mentovalueB0);
menB[1].addEventListener('click',mentovalueB1);
menB[2].addEventListener('click',mentovalueB2);
menB[3].addEventListener('click',mentovalueB3);
menB[4].addEventListener('click',mentovalueB4);
menB[5].addEventListener('click',mentovalueB5);
menB[6].addEventListener('click',mentovalueB6);
menB[7].addEventListener('click',mentovalueB7);
menB[8].addEventListener('click',mentovalueB8);
//clicar em memorizar resultado
menR[0].addEventListener('click',saveR0);
menR[1].addEventListener('click',saveR1);
menR[2].addEventListener('click',saveR2);
menR[3].addEventListener('click',saveR3);
menR[4].addEventListener('click',saveR4);
menR[5].addEventListener('click',saveR5);
menR[6].addEventListener('click',saveR6);
menR[7].addEventListener('click',saveR7);
menR[8].addEventListener('click',saveR8);
//clicar em operação
ops[0].addEventListener('click',op0);
ops[1].addEventListener('click',op1);
ops[2].addEventListener('click',op2);
ops[3].addEventListener('click',op3);
ops[4].addEventListener('click',op4);