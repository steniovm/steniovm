//Elementos HTML
const categorys = document.getElementById("cats");
const canva = document.getElementById("graph");
const stopbt = document.getElementById("stopbt");
const loopbt = document.getElementById("loopbt");
const volctr = document.getElementById("volctr");
const audio = new Audio();
audio.autoplay = true;
// Obtenha o contexto 2D da tela
const canvaContext = canva.getContext("2d");
//let sourceNode = undefined;
let savedoptions = [];
let analyser, source, context, amplitudeArray;
let init = true;
//let savedoptions = localStorage.getItem(opts) || [];

//cria categorias e botões tocadores
songs.forEach((cate) => {
  const newcat = { cat: cate.cat, cates: [] };
  savedoptions.push(newcat);
  createCategory(cate, categorys, newcat);
});
//cria categorias e botões tocadores
function createCategory(cate, locale, savcat) {
  const div1 = document.createElement("div");
  locale.appendChild(div1);
  const h3 = document.createElement("h3");
  div1.appendChild(h3);
  h3.innerText = translats[cate.cat] || cate.cat;
  const div2 = document.createElement("div");
  div1.appendChild(div2);
  if (cate.cates) {
    cate.cates.forEach((ca) => {
      const newcat = { cat: ca.cat, cates: [] };
      savcat.cates.push(newcat);
      createCategory(ca, div1, newcat);
    });
  }
  if (cate.songs) {
    const select = document.createElement("select");
    select.id = (Math.random() * 1e17).toString();
    div2.appendChild(select);
    div2.classList.add("songcell");
    const button = document.createElement("button");
    div2.appendChild(button);
    const imgbt = document.createElement("img");
    imgbt.src = "./img/" + (cate.img || "sond.svg");
    button.appendChild(imgbt);
    const optrand = document.createElement("option");
    optrand.value = "rand";
    optrand.innerHTML = "Aleatório";
    optrand.selected = true;
    select.appendChild(optrand);
    savcat.opt = select.value;
    cate.songs.forEach((song, index) => {
      const opt = document.createElement("option");
      opt.value = song;
      opt.innerHTML = (translats[cate.cat] || cate.cat) + " " + (index + 1);
      select.appendChild(opt);
    });
    select.addEventListener("change", () => {
      savcat.opt = select.value;
      console.log(savcat);
    });
    button.addEventListener("click", () => {
      let audiourl;
      if (select.value == "rand") {
        const ind = Math.floor(Math.random() * cate.songs.length);
        audiourl = "./Songs/" + cate.cat + "/" + cate.songs[ind];
      } else {
        audiourl = "./Songs/" + cate.cat + "/" + select.value;
      }
      //plotgraph(audiourl);
      playandplot(audiourl);
    });
  }
}

function playandplot(audiourl) {
  audio.src = audiourl;
  if (init) {
    context = new AudioContext();
    analyser = context.createAnalyser();
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    init = false;
  }
  stopbt.classList.remove("btactived");
  frameLooper();
}
let initial = false;
function frameLooper() {
  if (!audio.paused && !initial) {
    stopbt.classList.remove("btactived");
    initial = true;
  } else if (audio.paused && initial) {
    initial = false;
    stopbt.classList.add("btactived");
    return;
  }
  requestAnimationFrame(frameLooper);
  amplitudeArray = new Uint8Array(analyser.frequencyBinCount);
  // Obtem os dados no domínio do tempo para esta amostra
  analyser.getByteFrequencyData(amplitudeArray);

  //canvaContext.clearRect(0, 0, canva.width, canva.height);
  canvaContext.fillStyle = "#22222210";
  canvaContext.fillRect(0, 0, canva.width, canva.height);
  canvaContext.fillStyle = "#83F44240";
  for (let i = 0; i < amplitudeArray.length; i++) {
    const amplitude = (canva.height * amplitudeArray[i]) / 255;
    const y = canva.height - amplitude;
    canvaContext.fillRect(i, y, 2, y / 4);
  }
}

stopbt.addEventListener("click", () => {
  audio.pause();
});

loopbt.addEventListener("click", () => {
  loopbt.classList.toggle("btactived");
  audio.loop = !audio.loop;
});

volctr.addEventListener("change", () => {
  audio.volume = volctr.value;
  console.log(audio.volume);
});
/*
Save Data to Local Storage
localStorage.setItem(key, value);
Read Data from Local Storage
let lastname = localStorage.getItem(key);
Remove Data from Local Storage
localStorage.removeItem(key);
Remove All (Clear Local Storage)
localStorage.clear();
*/
