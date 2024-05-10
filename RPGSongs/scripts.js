//valores tabelados
const songs = [
  {
    cat: "Attack",
    songs: [
      "Goblin_Attack_01.wav",
      "Goblin_Attack_02.wav",
      "Goblin_Attack_03.wav",
      "Goblin_Attack_04.wav",
      "Goblin_Attack_05.wav",
    ],
  },
  {
    cat: "Death",
    songs: [
      "Goblin_Death_01.wav",
      "Goblin_Death_02.wav",
      "Goblin_Death_03.wav",
      "Goblin_Death_04.wav",
      "Goblin_Death_05.wav",
    ],
  },
  {
    cat: "Grunt",
    songs: [
      "Goblin_Grunt_01.wav",
      "Goblin_Grunt_02.wav",
      "Goblin_Grunt_03.wav",
      "Goblin_Grunt_04.wav",
      "Goblin_Grunt_05.wav",
    ],
  },
  {
    cat: "Hurt",
    songs: [
      "Goblin_Hurt_01.wav",
      "Goblin_Hurt_02.wav",
      "Goblin_Hurt_03.wav",
      "Goblin_Hurt_04.wav",
      "Goblin_Hurt_05.wav",
    ],
  },
  {
    cat: "Idle",
    songs: [
      "Goblin_Idle_01.wav",
      "Goblin_Idle_02.wav",
      "Goblin_Idle_03.wav",
      "Goblin_Idle_04.wav",
      "Goblin_Idle_05.wav",
    ],
  },
  {
    cat: "Laugh",
    songs: [
      "Goblin_Laugh_01.wav",
      "Goblin_Laugh_02.wav",
      "Goblin_Laugh_03.wav",
      "Goblin_Laugh_04.wav",
      "Goblin_Laugh_05.wav",
    ],
  },
  {
    cat: "Surprise",
    songs: [
      "Goblin_Surprise_01.wav",
      "Goblin_Surprise_02.wav",
      "Goblin_Surprise_03.wav",
      "Goblin_Surprise_04.wav",
      "Goblin_Surprise_05.wav",
    ],
  },
  {
    cat: "Natureza",
    cates: [
      {
        cat: "humanos",
        songs: ["Surprise_01.wav", "Surprise_02.wav", "Surprise_03.wav"],
      },
      {
        cat: "dragões",
        songs: ["Surprise_01.wav", "Surprise_02.wav", "Surprise_03.wav"],
      },
    ],
  },
];
const translats = {
  Attack: "Ataque",
  Death: "Morte",
  Grunt: "Grunhido",
  Hurt: "Ferido",
  Idle: "Parado",
  Laugh: "Risada",
  Surprise: "Surpresa",
};
//Elementos HTML
const categorys = document.getElementById("cats");
var audio = new Audio();
songs.forEach((cate) => createCategory(cate, categorys));

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
    div2.appendChild(select);
    const button = document.createElement("button");
    div2.appendChild(button);
    button.innerHTML = "Tocar";
    const optrand = document.createElement("option");
    optrand.value = "rand";
    optrand.innerHTML = "Aleatório";
    optrand.selected = true;
    select.appendChild(optrand);
    cate.songs.forEach((song, index) => {
      const opt = document.createElement("option");
      opt.value = (translats[cate.cat] || cate.cat) + " " + (index + 1);
      opt.innerHTML = (translats[cate.cat] || cate.cat) + " " + (index + 1);
      select.appendChild(opt);
    });
    /*    cate.songs.forEach((song, index) => {
      const button = document.createElement("button");
      div2.appendChild(button);
      button.innerHTML = (translats[cate.cat] || cate.cat) + " " + (index + 1);
      button.addEventListener("click", () => {
        audio.src = "./Songs/" + cate.cat + "/" + song;
        audio.play();
      });
    });*/
  }
}
