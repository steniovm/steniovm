//Elementos HTML
const categorys = document.getElementById("cats");
const canva = document.getElementById("graph");
const audioContext = new AudioContext();
console.log(audioContext.state);
// Obtenha o contexto 2D da tela
const canvaContext = canva.getContext("2d");
//Variaveis Globais
let playing = false;

//cria categorias e botões tocadores
songs.forEach((cate) => createCategory(cate, categorys));
//cria categorias e botões tocadores
function createCategory(cate, locale) {
  const div1 = document.createElement("div");
  locale.appendChild(div1);
  const h3 = document.createElement("h3");
  div1.appendChild(h3);
  h3.innerText = translats[cate.cat] || cate.cat;
  const div2 = document.createElement("div");
  div1.appendChild(div2);
  if (cate.cates) {
    cate.cates.forEach((cate) => createCategory(cate, div1));
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
    cate.songs.forEach((song, index) => {
      const opt = document.createElement("option");
      opt.value = song;
      opt.innerHTML = (translats[cate.cat] || cate.cat) + " " + (index + 1);
      select.appendChild(opt);
    });
    button.addEventListener("click", () => {
      if (!playing) {
        let audiourl;
        if (select.value == "rand") {
          const ind = Math.floor(Math.random() * cate.songs.length);
          audiourl = "./Songs/" + cate.cat + "/" + cate.songs[ind];
        } else {
          audiourl = "./Songs/" + cate.cat + "/" + select.value;
        }
        plotgraph(audiourl);
      }
    });
  }
}
function plotgraph(audiourl) {
  fetch(audiourl)
    .then((response) => {
      console.log(response);
      return response.arrayBuffer();
    })
    .then((downloadedBuffer) => {
      console.log(downloadedBuffer);
      return audioContext.decodeAudioData(downloadedBuffer);
    })
    .then((decodedBuffer) => {
      // configuraAudioBufferSourceNode
      const sourceNode = new AudioBufferSourceNode(audioContext, {
        buffer: decodedBuffer,
        loop: false,
      });
      console.log(audioContext.state);
      // configura audio analyser e javascript node
      const analyserNode = new AnalyserNode(audioContext);
      const javascriptNode = audioContext.createScriptProcessor(1024, 1, 1);
      console.log(audioContext.state);
      // Conecta os nodes juntos
      sourceNode.connect(audioContext.destination);
      console.log(audioContext.state);
      sourceNode.connect(analyserNode);
      analyserNode.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);
      console.log(audioContext.state);
      // Toca audio
      sourceNode.start(0);
      // Configure o manipulador de eventos que é acionado sempre que amostras suficientes são coletadas
      // em seguida, acione a análise de áudio e extraia os resultados
      javascriptNode.onaudioprocess = () => {
        // Lé os valores de frequência
        const amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
        // Obtem os dados no domínio do tempo para esta amostra
        analyserNode.getByteTimeDomainData(amplitudeArray);
        console.log(amplitudeArray.length);
        // Desenhe a tela quando o áudio estiver sendo reproduzido
        if (audioContext.state === "running") {
          // Desenhe o domínio do tempo na tela
          requestAnimationFrame(() => {
            // Limpe a tela
            //canvaContext.clearRect(0, 0, canva.width, canva.height);
            canvaContext.fillStyle = "#22222210";
            canvaContext.fillRect(0, 0, canva.width, canva.height);
            // Desenhe a amplitude dentro da tela
            for (let i = 0; i < amplitudeArray.length; i++) {
              //const value = amplitudeArray[i] / canva.height;
              //const y = canva.height - canva.height * value;
              const y = canva.height - amplitudeArray[i] / 2;
              canvaContext.fillStyle = "white";
              canvaContext.fillRect(i, y, 2, 2);
            }
          });
          // Limpe a tela
          canvaContext.clearRect(0, 0, canva.width, canva.height);
        }
      };
      //setTimeout(() => {
      //audioContext.close();
      //console.log(audioContext);
      //audioContext.suspend();
      //console.log(audioContext);
      //}, 1000);
    })
    .catch((e) => {
      console.error(`Error: ${e}`);
    });
}
