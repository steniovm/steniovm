//variaveis globais
let outputext = document.getElementById('outputexts');
let numero = document.getElementById('numero');
let baction = document.getElementById('baction');


//promisses
const promresolve = new Promise((resolve, reject)=>{
  console.log('promisse suscess');
  setTimeout(() => resolve('resolve'), 2000);
});
const promreject = new Promise((resolve, reject)=>{
  console.log('promisse error');
  setTimeout(() => resolve('reject'), 2000);
});
console.log(promresolve);
console.log(promreject);
//funções
function eprimo(num){
  for (let i = 2; i < num; i++)
    if (num % i === 0) {
      return false;
    }
  return num > 1;
};
function verific(numero){
  if (numero%2 ==0){
    console.log('par');
    return promresolve();
  }else if(eprimo(numero)){
    console.log('primo');
    return promresolve();
  }else{
    console.log('não cumpre');
    return promreject;
  }
}

function clickbtn(){
  console.log('antes');
  let result = verific(numero.value);
  console.log(result);
  //outputext.value = result;
  console.log('depois');
}

//eventos
baction.addEventListener('click', clickbtn);
/*
var promiseCount = 0;
function testPromise() {
  var thisPromiseCount = ++promiseCount;

  var log = document.getElementById('log');
  log.insertAdjacentHTML('beforeend', thisPromiseCount +
      ') Started (<small>Sync code started</small>)<br/>');

  // Criamos uma nova promise: prometemos a contagem dessa promise (após aguardar 3s)
  var p1 = new Promise(
    // a função resolve() é chamada com a capacidade para resolver ou
    // rejeitar a promise
    function(resolve, reject) {
      log.insertAdjacentHTML('beforeend', thisPromiseCount +
          ') Promise started (<small>Async code started</small>)<br/>');
      // Isto é apenas um exemplo para criar assincronismo
      window.setTimeout(
        function() {
          // Cumprimos a promessa !
          resolve(thisPromiseCount)
        }, Math.random() * 2000 + 1000);
    });

  // definimos o que fazer quando a promise for realizada
  p1.then(
    // apenas logamos a mensagem e o valor
    function(val) {
      log.insertAdjacentHTML('beforeend', val +
          ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
    });

  log.insertAdjacentHTML('beforeend', thisPromiseCount +
      ') Promise made (<small>Sync code terminated</small>)<br/>');
}
Copy to Clipboard
if ("Promise" in window) {
  btn = document.getElementById("btn");
   btn.addEventListener("click",testPromise);
}
else {
  log = document.getElementById('log');
  log.innerHTML = "Live example not available as your browser doesn't support the Promise interface.";
}
*/