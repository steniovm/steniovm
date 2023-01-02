//NASA Image and Video Library API documentation:
//https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf
//const showcode = document.getElementById('showcode');
const intext = document.getElementById('intext');
const btsearch = document.getElementById('btsearch');
const mosaic = document.getElementById('mosaic');
const modalmosaic = document.getElementById('modalmosaic');
const modalmosaicclose = document.getElementById('modalmosaicclose');
const pageprev = document.getElementById('pageprev');
const pagenext = document.getElementById('pagenext');
const hitpage = document.getElementById('hitpage');
const infoimage = document.getElementById('infoimage');
const imagefigure = document.getElementById('imagefigure');
const videoframe = document.getElementById('videoframe');
const searchin = document.getElementById('searchin');
const asearchin = document.getElementById('asearchin');
const btasearch = document.getElementById('btasearch');
const abtbsearch = document.getElementById('abtbsearch');
const inq = document.getElementById('inq');
const incenter = document.getElementById('incenter');
const indescription = document.getElementById('indescription');
const indescription508 = document.getElementById('indescription508');
const inkeywords = document.getElementById('inkeywords');
const inlocation = document.getElementById('inlocation');
const inmediatype = document.getElementById('inmediatype');
const innasaid = document.getElementById('innasaid');
const inpage = document.getElementById('inpage');
const inphotographer = document.getElementById('inphotographer');
const insecondarycreator = document.getElementById('insecondarycreator');
const intitle = document.getElementById('intitle');
const inyearstart = document.getElementById('inyearstart');
const inyearend = document.getElementById('inyearend');
const abtsearch = document.getElementById('abtsearch');
const imgpage = document.getElementById('imgpage');
const imgprev = document.getElementById('imgprev');
const imgnext = document.getElementById('imgnext');
const colectiondata = document.getElementById('colectiondata');
const showurlimg = document.getElementById('showurlimg');
const urlbase = "https://images-api.nasa.gov/";
let prevurl = null;
let nexturl = null;
let pagenumber = 0;
let imgnumber = 0;
let imglist =[];

btasearch.addEventListener('click', function(){
  searchin.style.display = "none";
  asearchin.style.display = "flex";
});
abtbsearch.addEventListener('click', function(){
  searchin.style.display = "flex";
  asearchin.style.display = "none";
});
pageprev.addEventListener('click', function(){
  if (prevurl){
    pagenumber--;
    mosaic.innerHTML = '';
    consultapi(prevurl,printconsult);
  }else{
    hitpage.innerHTML = "Esta é a primeira pagina!"
  }
});
pagenext.addEventListener('click', function(){
  if (nexturl){
    pagenumber++;
    mosaic.innerHTML = '';
    consultapi(nexturl,printconsult);
  }else{
    hitpage.innerHTML = "Esta é a última pagina!"
  }
});
imgprev.addEventListener('click', function(){
  if (imgnumber>0){
    imgnumber--;
    openimg(imglist);
  }
});
imgnext.addEventListener('click', function(){
  if (imgnumber<(imglist.length-1)){
    imgnumber++;
    openimg(imglist);
  }
});
function consultapi(fullurl,cb){
  console.log(fullurl);
  fetch(fullurl).then(function(response){
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      if (response.status == 429) {
        modalerrror.style.display = "flex";
        }
      return;
    }
    response.json().then(function(data) {
      dataday = data;
      cb(dataday);
      //console.log(JSON.stringify(data, null, " "))
      //console.log(dataday);
    })
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
function printconsult(data){
  //showcode.innerHTML = JSON.stringify(data, null, " ");
  prevurl = null;
  nexturl = null;
  let hits = data.collection.metadata.total_hits;
  let items = data.collection.items;
  if (hits == 0){
    hitpage.innerHTML = "Nenhuma midia encontrada!"
  }else{
    hitpage.innerHTML = `${((pagenumber-1)*100)+1}-${(hits<((pagenumber)*100))?hits:((pagenumber)*100)} de ${hits}`;
  }
  data.collection.links.forEach(function(it){
    if (it.rel == "prev") prevurl = it.href;
    if (it.rel == "next") nexturl = it.href;
  });
  mosaic.innerHTML = '';
  items.forEach(function(item){
    let urlimg = item.links[0].href;
    let img = thumbimg(urlimg);
    img.addEventListener('click', function(){
      imgnumber = 0;
      modalmosaic.style.display = "flex";
      infoimage.innerHTML = JSON.stringify(item,null,' ');
      console.log(item);
      consultapi(item.href, reglist);
    });
    mosaic.append(img);
  })
}
function printaconsult(data){
  if ((inpage.value > 0) && (data.collection.metadata.total_hits > 0)){
    pagenumber = inpage.value;
  }
  pagenumber = 1;
  printconsult(data);
}
function reglist(data){
  imglist = data;
  window.scrollTo(0, 0);
  openimg(imglist);
}
function openimg(data){
  showurlimg.innerHTML = data[imgnumber];
  showurlimg.href = data[imgnumber];
  if (data[imgnumber].endsWith('jpg')){
    imagefigure.style.display = "flex";
    videoframe.style.display = "none";
    imagefigure.src = data[imgnumber];
  }else if (data[imgnumber].endsWith('mp4') || data[imgnumber].endsWith('srt') || data[imgnumber].endsWith('json')){
    imagefigure.style.display = "none";
    videoframe.style.display = "flex";
    videoframe.src = data[imgnumber];
  }
  imgpage.innerHTML = `${imgnumber+1} / ${data.length}`;
}
function thumbimg(urlimg){
  let img = document.createElement('img');
  img.classList.add("mosaicimg");
  img.src = urlimg;
  return img;
}
intext.addEventListener('keypress', function(e){
  if(e.key === 'Enter') {
    //showcode.innerHTML = intext.value;
    let urlparam = `${urlbase}search?q=${intext.value}`;
    pagenumber=1;
    consultapi(urlparam,printconsult);
  }
});
btsearch.addEventListener('click',function(){
  //showcode.innerHTML = intext.value;
  let urlparam = `${urlbase}search?q=${intext.value}`;
  pagenumber=1;
  consultapi(urlparam,printconsult);
});
abtsearch.addEventListener('click', function(){
  let parans = "";
  if (inq.value) parans += ("q="+inq.value+"&");
  if (incenter.value) parans += ("center="+incenter.value+"&");
  if (indescription.value) parans += ("description="+indescription.value+"&");
  if (indescription508.value) parans += ("description_508="+indescription508.value+"&");
  if (inkeywords.value) parans += ("keywords="+inkeywords.value+"&");
  if (inlocation.value) parans += ("location="+inlocation.value+"&");
  if (inmediatype.value) parans += ("media_type="+inmediatype.value+"&");
  if (innasaid.value) parans += ("nasa_id="+innasaid.value+"&");
  if (inpage.value) parans += ("page="+inpage.value+"&");
  if (inphotographer.value) parans += ("photographer="+inq.inphotographer+"&");
  if (insecondarycreator.value) parans += ("secondary_creator="+insecondarycreator.value+"&");
  if (intitle.value) parans += ("title="+intitle.value+"&");
  if (inyearstart.value) parans += ("year_start="+inyearstart.value+"&");
  if (inyearend.value) parans += ("year_end="+inyearend.value);
  //showcode.innerHTML = intext.value;
  mosaic.innerHTML = '';
  intext.value = parans;
  console.log(urlbase+"search?"+parans);
  searchin.style.display = "flex";
  asearchin.style.display = "none";
  consultapi(urlbase+"search?"+parans,printaconsult);
});
modalmosaicclose.addEventListener('click', function(){
  modalmosaic.style.display = "none";
  imagefigure.src = '';
  videoframe.src = '';
  infoimage.style.display = "none";
});
colectiondata.addEventListener('click', function(){
  infoimage.style.display = "flex";
});