const datein = document.getElementById('datein');
const titleimage = document.getElementById('titleimage');
const copyrightimage = document.getElementById('copyrightimage');
const imagefigure = document.getElementById('imagefigure');
const videoframe = document.getElementById('videoframe');
const explanationimage = document.getElementById('explanationimage');
const lowdownload = document.getElementById('lowdownload');
const highdownload =document.getElementById('highdownload');
const urlbase = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&thumbs=true&"
const dateobject = new Date();
let dataday;
console.log(formatDate(dateobject))

function formatDate(date) {
  const map = {
      mm: date.getMonth() + 1,
      dd: date.getDate(),
      aaaa: date.getFullYear()
  }
  return `${map.aaaa}-${map.mm}-${map.dd}`
}
function updateelements(data){
  titleimage.innerHTML = data.title;
  copyrightimage.innerHTML = data.copyright;
  if (data.media_type == "image") {
    videoframe.style.display = "none"
    imagefigure.src = data.url;
  }
  if (data.media_type == "video") {
    videoframe.style.display = "unset"
    imagefigure.src = data.thumbnail_url;
    videoframe.src = data.url;
  }
  imagefigure.alt = data.title;
  explanationimage.innerHTML = data.explanation;
  lowdownload.href = data.url;
  highdownload.href = data.hdurl;
}

function consultapi(parans){
  console.log(urlbase+parans);
  fetch(urlbase+parans).then(function(response){
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }
    response.json().then(function(data) {
      dataday = data;
      updateelements(dataday);
      console.log(JSON.stringify(data, null, " "))
      console.log(dataday);
    })
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  })
}

datein.value = formatDate(dateobject);
consultapi("date="+datein.value);
datein.addEventListener('change',function(){
  consultapi("date="+datein.value);
  console.log(datein.value);
});

fetchTranslation("translate this text");

function fetchTranslation(text){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Origin','http://localhost');

  fetch(`https://translate.google.com/?sl=en&tl=pt&text=${text}&op=translate`, {
    mode: 'no-cors',
    credentials: 'include',
    method: 'POST',
    headers: headers
  }).then(function(response){
    console.log(response);
    response.json().then(function(data){
      console.log(data);
    });
  });
}



/*
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

*/