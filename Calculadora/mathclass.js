let memolabel = document.querySelectorAll(".memory>label");
let inpA = document.getElementById("numberA");
let menA = document.querySelectorAll(".mA");
let inpB = document.getElementById("numberB");
let menB = document.querySelectorAll(".mB");
let reselem = document.getElementById("result");
let menR = document.querySelectorAll(".mR");
let ops = document.querySelectorAll(".op");

class calculadora {
    constructor(){
        this.memorys = [0,1,2,3,4,5,6,7,8];
        this.memorys.forEach(element => {element=randomizevalues()});
        this.resut = 0;
        this.operand1 = 0;
        this.operand2 = 0;
        this.operation = '=';
    }
    soma(a,b){
        this.resut = a+b;
        return this.resut;
    }
    subtrai(a,b){
        this.resut = a-b;
        return this.resut;
    }
    multiplica(a,b){
        this.resut = a*b;
        return this.resut;
    }
    divide(a,b){
        if (b != 0){
            this.resut = a/b;
        }else{
            this.resut = "err div/0";
        }
        return this.resut;
    }
    resto(a,b){
        if (b != 0){
            this.resut = a%b;
        }else{
            this.resut = "err div/0";
        }
        return this.resut;
    }
    getMam(index){
        return this.memorys[index];
    }
    setMam(index, valor){
        this.memorys[index] = valor;
        return this.memorys[index];
    }
    getResult(){
        let resul;
        switch (this.operation){
            case '+':
                resul = this.soma(this.operand1,this.operand2);
            break;
            case '-':
                resul = this.subtrai(this.operand1,this.operand2);
            break;
            case '*':
                resul = this.multiplica(this.operand1,this.operand2);
            break;
            case '/':
                resul = this.divide(this.operand1,this.operand2);
            break;
            case '%':
                resul = this.resto(this.operand1,this.operand2);
            break;
            case '=':
                resul = this.resut;
                this.operand2=this.operand1;
            break;
            case 'C':
                resul = 0;
                this.clearCalculator();
            break;
            default:
                resul = 'err';
        }
        return resul;
        //return this.resut;
    }
    setReMam(index){
        return this.setMam(index,this.resut);
    }
    setOperand1(_operand1){
        this.operand1 = _operand1;
    }
    getOperand1(){
        return this.operand1;
    }
    setOperand2(_operand2){
        this.operand2 = _operand2;
    }
    getOperand2(){
        return this.operand2;
    }
    setOperation(_operation){
        this.operation = _operation;
    }
    clearCalculator(){
        this.memorys = [0,0,0,0,0,0,0,0,0];
        this.resut = 0;
        this.operand1 = 0;
        this.operand2 = 0;
        this.operation = '=';
    }
}
var calc = new calculadora
//arrendonda valor com duas casas decimais
function arrend(numberlong){
    if (Number.isFinite(numberlong))
        return Math.round(numberlong*100)/100;
    return numberlong;
}

//gera um numero aleatorio de 0 a 100
function randomizevalues(){
    return Math.random() * 100;
}

//inicia as variaveis com valores aleatórios de 0 a 100
function initvalues(){
    for(let i=0;i<9;i++){
        calc.setMam(i, randomizevalues());
        memolabel[i].innerHTML = arrend(calc.getMam(i));
    }
    inpA.value = arrend(calc.getOperand1());
    inpB.value = arrend(calc.getOperand2());
    reselem.innerHTML = arrend(calc.getResult());
}

//manipulação de valores de memoria
//resgaste em A
function mentovalueA(mem){
    calc.setOperand1(calc.getMam(mem));
    inpA.value = arrend(calc.getOperand1());
}
//resgaste em B
function mentovalueB(mem){
    calc.setOperand2(calc.getMam(mem));
    inpB.value = arrend(calc.getOperand2());
}

//Salvar resultado
function save(mem){
    calc.setReMam(mem);
    memolabel[mem].innerHTML = arrend(calc.getResult());
}
//calculos
function op(opt){
    calc.setOperand1(parseFloat(inpA.value));
    calc.setOperand2(parseFloat(inpB.value));
    if (opt == 0) calc.setOperation('+');
    if (opt == 1) calc.setOperation('-');
    if (opt == 2) calc.setOperation('*');
    if (opt == 3) calc.setOperation('/');
    if (opt == 4) calc.setOperation('%');
    if (opt == 5) calc.setOperation('=');
    if (opt == 6) calc.setOperation('C');
    reselem.innerHTML = arrend(calc.getResult());
    if (opt == 5) {
        inpA.value = calc.getOperand1();
        inpB.value = calc.getOperand2();
    }
    if (opt == 6) {
        inpA.value = calc.getOperand1();
        inpB.value = calc.getOperand2();
        for(let i=0;i<9;i++){
            memolabel[i].innerHTML = arrend(calc.getMam(i));
        }
    }
    reselem.innerHTML = arrend(calc.getResult());

}

//chamadas de funções ao carregar pagina
initvalues();

//eventos
//clicar em resgatar/memorizar
for(let i=0;i<menA.length;i++){
    menA[i].addEventListener('click',function(){mentovalueA(i)});
    menB[i].addEventListener('click',function(){mentovalueB(i)});
    menR[i].addEventListener('click',function(){save(i)});
}
//clicar em operação
for(let i=0;i<ops.length;i++){
    ops[i].addEventListener('click',function(){op(i)});
}
console.log(calc);
console.log('teste initi');

//sem uso de classes
/*
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
    if (Number.isFinite(numberlong))
        return Math.round(numberlong*100)/100;
    return numberlong;
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
function mentovalueA(mem){
    valueA = memorys[mem];
    inpA.value = arrend(memorys[mem]);
}
//resgaste em B
function mentovalueB(mem){
    valueB = memorys[mem];
    inpB.value = arrend(memorys[mem]);
}

//Salvar resultado
function save(mem){
    memorys[mem] = result;
    memolabel[mem].innerHTML = arrend(result);
}
//calculos
//soma
function op(opt){
    valueA = parseFloat(inpA.value);
    valueB = parseFloat(inpB.value);
    if (opt == 0) result = valueA + valueB;
    if (opt == 1) result = valueA - valueB;
    if (opt == 2) result = valueA * valueB;
    if (opt == 3) {
        if (valueB != 0){
            result = valueA / valueB;
        }else{
            result = "err div/0";
        }
    }
    if (opt == 4) {
        if (valueB != 0){
            result = valueA % valueB;
        }else{
            result = "err div/0";
        }
    }
    reselem.innerHTML = arrend(result);
}

//chamadas de funções ao carregar pagina
initvalues();
initvalueselement();

//eventos
//clicar em resgatar/memorizar
for(let i=0;i<menA.length;i++){
    menA[i].addEventListener('click',function(){mentovalueA(i)});
    menB[i].addEventListener('click',function(){mentovalueB(i)});
    menR[i].addEventListener('click',function(){save(i)});
}
//clicar em operação
for(let i=0;i<ops.length;i++){
    ops[i].addEventListener('click',function(){op(i)});
}
*/