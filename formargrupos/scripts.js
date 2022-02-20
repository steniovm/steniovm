//variaveis globais
let inputgrups = document.getElementById('inputgrups');
let outputgrups = document.getElementById('outputgrups');
let ngrups = document.getElementById('ngrups');
let baction = document.getElementById('baction');

//funções
// Randomize array in-place using Durstenfeld shuffle algorithm
function shuffleArray(_array) {
  let array = _array;
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

function goRandom(){
  const nunberGrups = ngrups.value;
  const listItens = inputgrups.value.split("\n");
  console.log(listItens);
  const shuffledArray = shuffleArray(listItens);
  let i = 1;
  let j = 1;
  let result = `====== grupo ${j} ======\n`;
  shuffledArray.forEach( (item) => {
    if (i < nunberGrups) {
      result += item + "\n";
      i++;
    } else {
      result += item + "\n";
      i = 1;
      j++;
      result += `====== grupo ${j} ======\n`;
    }
  });
  outputgrups.value=result;
  console.log(shuffledArray);
  console.log(result);
}



//eventos
baction.addEventListener('click', goRandom);

