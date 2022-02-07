//classe calculadora
class calculadora {
    constructor(){
        this.memorys = [0,1,2,3,4,5,6,7,8];
        this.memorys.forEach((element,index) => {this.memorys[index] = this.randomizevalues()});
        this.resut = 0;
        this.operand1 = 0;
        this.operand2 = 0;
        this.operation = '=';
    }
    randomizevalues(){
        return Math.random() * 100;
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
    }
    setReMam(index){
        return this.setMam(index,this.resut);
    }
    setOperand1(_operand1){
        this.operand1 = parseFloat(_operand1);
    }
    getOperand1(){
        return this.operand1;
    }
    setOperand2(_operand2){
        this.operand2 = parseFloat(_operand2);
    }
    getOperand2(){
        return this.operand2;
    }
    setOperation(_operation){
        this.operation = _operation;
    }
    getOperation(){
        return this.operation;
    }
    clearCalculator(){
        this.memorys = [0,0,0,0,0,0,0,0,0];
        this.resut = 0;
        this.operand1 = 0;
        this.operand2 = 0;
        this.operation = '=';
    }
    getResults(){
        return this.resut;
    }
}
//arrendonda valor com duas casas decimais
function arrend(numberlong){
    if (Number.isFinite(numberlong))
        return Math.round(numberlong*100)/100;
    return numberlong;
}
//instacia objeto calc
var calc = new calculadora();
//valores iniciais
$(document).ready(function(){
    $(".memory>label").each(function(index){
        $(this).html(arrend(calc.getMam(index)));
    });
    $("#numberA").val("0");
    $("#numberB").val("0");
    $("#result").html("0.00");
});
//pegar valores memorizados
$(".mA").each(function(index){
    $(this).click(function(){$("#numberA").val(calc.getMam(index))});
});
$(".mB").each(function(index){
    $(this).click(function(){$("#numberB").val(calc.getMam(index))});
});
//realizar operações
$(".op").each(function(index){
    $(this).click(function(){
        calc.setOperand1($("#numberA").val());
         calc.setOperand2($("#numberB").val());
        if (index == 0) calc.setOperation('+');
        if (index == 1) calc.setOperation('-');
        if (index == 2) calc.setOperation('*');
        if (index == 3) calc.setOperation('/');
        if (index == 4) calc.setOperation('%');
        if (index == 5) {
            calc.setOperation('=');
            $("#numberA").val(calc.getResults());
            $("#numberB").val(calc.getResults());
        };
        if (index == 6) {
            calc.setOperation('C');
            $("#numberA").val('0');
            $("#numberB").val('0');
            $("#result").html('0');
            $(".memory>label").each(function(index){
                $(this).html('0');
            });
        };
        $("#result").html(arrend(calc.getResult()));
        console.log(calc.getResult());
    });
});
//memorizar resultado
$(".mR").each(function(index){
    $(this).click(function(){
        $(".memory>label").eq(index).html(arrend(calc.getResults()));
    });
});
//console.log(calc);