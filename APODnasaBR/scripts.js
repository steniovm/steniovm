const datein = document.getElementById('datein');
const titleimage = document.getElementById('titleimage');
const copyrightimage = document.getElementById('copyrightimage');
const imagefigure = document.getElementById('imagefigure');
const videoframe = document.getElementById('videoframe');
const explanationimage = document.getElementById('explanationimage');
const lowdownload = document.getElementById('lowdownload');
const highdownload = document.getElementById('highdownload');
const mtitleimage = document.getElementById('mtitleimage');
const mcopyrightimage = document.getElementById('mcopyrightimage');
const mdateimage = document.getElementById('mdateimage');
const mimagefigure = document.getElementById('mimagefigure');
const mvideoframe = document.getElementById('mvideoframe');
const mexplanationimage = document.getElementById('mexplanationimage');
const mlowdownload = document.getElementById('mlowdownload');
const mhighdownload = document.getElementById('mhighdownload');
const datestart = document.getElementById('datestart');
const dateend = document.getElementById('dateend');
const btsearch = document.getElementById('btsearch');
const mosaic = document.getElementById('mosaic');
const modalmosaic = document.getElementById('modalmosaic');
const nrandom = document.getElementById('nrandom');
const btrand = document.getElementById('btrand');
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

function updateelementsod(data){
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

function updateelementsld(data){
  mosaic.innerHTML = '';
  data.forEach((element, index) => {
    let img = document.createElement('img');
    img.classList.add("mosaicimg");
    if (element.media_type == "image") {
      img.src = element.url;
    }
    if (element.media_type == "video") {
      img.src = element.thumbnail_url;
    }
    img.addEventListener('click',function(){
      showmodal(index);
      window.scrollTo(0, 0);
    })
    mosaic.append(img);
  });
}

function showmodal(index){
  console.log(dataday[index]);
  modalmosaic.style.display = "flex";
  mtitleimage.innerHTML = dataday[index].title;
  mcopyrightimage.innerHTML = dataday[index].copyright;
  mdateimage.innerHTML = dataday[index].date;
  if (dataday[index].media_type == "image") {
    mvideoframe.style.display = "none"
    mimagefigure.src = dataday[index].url;
  }
  if (dataday[index].media_type == "video") {
    mvideoframe.style.display = "unset"
    mimagefigure.src = dataday[index].thumbnail_url;
    mvideoframe.src = dataday[index].url;
  }
  mimagefigure.alt = dataday[index].title;
  mexplanationimage.innerHTML = dataday[index].explanation;
  mlowdownload.href = dataday[index].url;
  mhighdownload.href = dataday[index].hdurl;
}

function consultapi(parans,cb){
  console.log(urlbase+parans);
  fetch(urlbase+parans).then(function(response){
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }
    response.json().then(function(data) {
      dataday = data;
      cb(dataday);
      console.log(JSON.stringify(data, null, " "))
      console.log(dataday);
    })
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  })
}

datein.value = formatDate(dateobject);
consultapi("date="+datein.value, updateelementsod);

datein.addEventListener('change',function(){
  consultapi("date="+datein.value, updateelementsod);
  console.log(datein.value);
});

btsearch.addEventListener('click', function(){
  if(datestart.value && dateend.value){
    if(datestart.value < dateend.value){
      consultapi("start_date="+datestart.value+"&end_date="+dateend.value, updateelementsld);
      console.log(datestart.value+" - "+dateend.value);
    }else{
      alert("A data de termino deve ser maior que a data de inicio!")
    }
  }else{
    alert("As datas de inicio e termino da busca devem estar preenchidas!")
  }
});

btrand.addEventListener('click', function(){
  if(nrandom.value){
      consultapi("count="+nrandom.value, updateelementsld);
      console.log(nrandom.value);
  }else{
    alert("Insira um numero de imagens!")
  }
});

modalmosaic.addEventListener('click', function(){
  modalmosaic.style.display = "none";
});