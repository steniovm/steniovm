//Constantes
const INITAL = 14;//inicia com 14 px

//variaveis globais
let buttonmais = document.getElementById('buttonmais');//botão mais
let buttonmenos = document.getElementById('buttonmenos');//botão menos
let buttoAa = document.getElementById('buttonAa');//botão caixa alta baixa
let buttonmulti = document.getElementById('buttonmult');//botão mult
let texto = document.getElementById('principal');//seção principal da pagina
let mainbox = document.querySelector('main');//main da pagina
let caixa = false; //false = caixa baixa, true = caixa alta;
let transp = true; //false = opaco, true = transparente;

//classe de clousures
let tamanho = (function() {
  let ftamanho = INITAL;
  function mudarv(val) {
    ftamanho += val;
  }
  //métodos privados com closures
  return {
    aumentar: function() {
      mudarv(1);
    },
    diminuir: function() {
      if(ftamanho>0)
        mudarv(-1);
    },
    value: function() {
      console.log(ftamanho);
      return ftamanho;
    }
  }
})();

//funções
function aumentar(){
  tamanho.aumentar();
  texto.style.fontSize = tamanho.value() + 'px';
}
function diminuir(){
  tamanho.diminuir();
  texto.style.fontSize = tamanho.value() + 'px';
}
function caixaaltabaixa(){
  if (!caixa){
    caixa = true;
    texto.style.textTransform = 'uppercase';
  }else{
    caixa = false;
    texto.style.textTransform = "none";
  }
}
//eventos
buttonmais.addEventListener('click', aumentar);
buttonmenos.addEventListener('click', diminuir);
buttoAa.addEventListener('click',caixaaltabaixa);

buttonmulti.addEventListener('click', function(){
  if (!transp){
    transp = true;
    mainbox.style.backgroundColor = '#aeaeae80';
  }else{
    transp = false;
    mainbox.style.backgroundColor = "#aeaeae";
  }
  //coisas do exercicios
  console.log(multiplyBy5(tamanho.value()));
});

//coisas do exercicios
//projeto de clousers, multiplica
function createMultiplier(value){
  return function (val){
    return value * val;
  };
}
let multiplyBy5 = createMultiplier(5);
console.log(multiplyBy5(10));//50
console.log(multiplyBy5(12));//60
console.log(multiplyBy5(7));//35

