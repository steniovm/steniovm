//Constantes
const INITAL = 14;//inicia com 14 px

//variaveis globais
let buttonmais = document.getElementById('buttonmais');//botão mais
let buttonmenos = document.getElementById('buttonmenos');//botão menos
let texto = document.getElementById('pincipal');//seção principal da pagina

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

//eventos
buttonmais.addEventListener('click', aumentar);
buttonmenos.addEventListener('click', diminuir);

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

let buttonmulti = document.getElementById('buttonmult');//botão mult
buttonmulti.addEventListener('click', function(){
  console.log(multiplyBy5(tamanho.value()));
});