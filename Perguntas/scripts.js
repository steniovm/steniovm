let QUESTION = [
    {
     "category": "Categoria 1",
     "question": "Questão 1",
     "answer": "Resposta 1"
    },
    {
    "category": "Categoria 2",
    "question": "Questão 3",
    "answer": "Resposta 3"
    }
]
console.log(QUESTION);

const main = document.getElementById("mainprin")
const board = document.getElementById("board")
const categorysboard = document.getElementById("categorys")
const textmessage = document.getElementById("textmessage")
const startbutton = document.getElementById("startgame")
const eq1 = document.getElementById("eq1")
const eq2 = document.getElementById("eq2")
const timegame = document.getElementById("timegame")
const roundsgame = document.getElementById("roundsgame")
const roundtofinish = document.getElementById("roundtofinish")
const scores = document.getElementById("scores")
const filebox = document.getElementById("questionsfile")
const filejsonbt = document.getElementById("filejson")
const exemplobt = document.getElementById("exemplobt")
const exemplotxt = document.getElementById("exemplo")
const questionbox = document.getElementById("question")
const answerbox = document.getElementById("answer")
const timeshow = document.getElementById("timeshow")
const respbt = document.getElementById("resp")
const respcor = document.getElementById("resp1")
const respinc = document.getElementById("resp2")
const musicplay = document.getElementById("background-music")
const musiccontrol = document.querySelectorAll(".audiobtn")

let categorys = new Set(QUESTION.map(value => value.category))
let exem = false
let teans = Array(2)
let timeanswer
let rounds
let sectedcategory
let activeplayer = 0
let scoresteans = [0,0]
let statusgame = 1
let next = false; // this is to be changed on user input
let next1 = false;
let breakbt = false;
const timeout = async ms => new Promise(res => setTimeout(res, ms));//para esperar clicar
async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
}

listcategorys()
console.log(categorys)

respbt.addEventListener("click", function(){
    breakbt = true;
    respcor.style.visibility = "visible"
    respinc.style.visibility = "visible"
    respbt.style.visibility = "hidden"
    answerbox.style.visibility = "visible"
})
respcor.addEventListener("click", function(){
    scoresteans[activeplayer]++
    respcor.style.visibility = "hidden"
    respinc.style.visibility = "hidden"
    respbt.style.visibility = "hidden"
    scores.innerHTML = teans[0]+" - "+scoresteans[0]+" X "+scoresteans[1]+" - "+teans[1]
    console.log(scoresteans)
    next1 = true;
})
respinc.addEventListener("click", function(){
    scoresteans[(activeplayer+1)%2]++
    respcor.style.visibility = "hidden"
    respinc.style.visibility = "hidden"
    respbt.style.visibility = "hidden"
    scores.innerHTML = teans[0]+" - "+scoresteans[0]+" X "+scoresteans[1]+" - "+teans[1]
    console.log(scoresteans)
    next1 = true;
})

exemplobt.addEventListener("click", function(){
    if (!exem){
        exemplotxt.style.display = "block"
        exemplobt.innerHTML = "esconder exemplo"
        exem = true
    } else {
        exemplotxt.style.display = "none"
        exemplobt.innerHTML = "mostra exemplo"
        exem = false
    }
})

filejsonbt.addEventListener("change", function(){
    let filelist = new FileReader()
    filelist.readAsText(filejsonbt.files[0])
    filelist.onload = function() {
        QUESTION = JSON.parse(filelist.result)
        console.log(QUESTION)
        categorys.clear()
        QUESTION.forEach(item => {
            categorys.add(item.category)
        })
        console.log(categorys)
        listcategorys()
        filebox.style.visibility = "hidden"
      };
    filelist.onerror = function() {
        console.log(filelist.error);
      };
    main.style.visibility = "visible"
})

async function waitUserInput(callback) {
    callback()
    while (next === false) await timeout(5); // pause script but avoid browser to freeze ;)
    next = false; // reset var
}

async function timecheck(){
    while (next1 === false) await timeout(5); // pause script but avoid browser to freeze ;)
    next1 = false; // reset var
}

function listcategorys(){
    categorysboard.innerHTML = null
    categorys.forEach(it => {
        item = it.replace(" ", "");
        let newcategory = document.createElement("div")
        newcategory.id = "cat"+item
        newcategory.innerHTML = (it.toUpperCase())
        let red = Math.floor(Math.random()*255);
        let green = Math.floor(Math.random()*255);
        let blue = Math.floor(Math.random()*255);
        newcategory.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
        newcategory.style.backgroundColor = 'rgb(' + (255 - red) + ',' + (255 - green) + ',' + (255 - blue) + ')';
        categorysboard.append(newcategory)
        newcategory.addEventListener('click', function(){
            sectedcategory = it
            console.log(it)
            categorysboard.style.visibility = "hidden";
            if (statusgame == 99) statusgame = 1;
            next = true;
        })
    })
    console.log(categorys)
}

async function tempAnswer(){
    respbt.style.visibility = "visible"
    timeshow.style.visibility = "visible"
    //audio de fundo
    musicplay.play();
    musicplay.volume = 0.5;
    for (let i=timeanswer*10; i>=0 ; i--){
        timeshow.innerHTML = i/10
        if (breakbt) {
            musicplay.pause()
            await timecheck();
            next = true
            return;
        } else {
            await delay(100)
        }
        if (i==0){
            next = true
            scoresteans[(activeplayer+1)%2]++
            answerbox.style.visibility = "visible"
            respbt.style.visibility = "hidden"
            scores.innerHTML = teans[0]+" - "+scoresteans[0]+" X "+scoresteans[1]+" - "+teans[1]
            console.log(scoresteans)
            await delay(100)
        } 
    }
    musicplay.pause()
}

async function gameplay(){
    let message = ""
    let nquestion = 0
    let quest = {}

    while (rounds){
        console.log("statusgame: "+statusgame)
        switch (statusgame){
            case 1://inicio do game
                statusgame = 99;//pausa o jogo até que execute todos os passoas, inclusive escolha da categoria
                roundtofinish.innerHTML = "rodadas restantes: "+rounds
                message = teans[activeplayer]+" - Selecione uma categoria"
                scores.innerHTML = teans[0]+" - "+scoresteans[0]+" X "+scoresteans[1]+" - "+teans[1]
                categorysboard.style.visibility = "visible"
                textmessage.innerHTML = message
                console.log(message)
                await waitUserInput(listcategorys);
                statusgame = 2;
            break
            case 2://mostra a pergunta e inicar o tempo
                statusgame = 99;
                let selQuests =QUESTION.filter(item => item.category == sectedcategory)
                nquestion = Math.floor(Math.random()*selQuests.length)
                quest = selQuests[nquestion]
                console.log("questão: "+nquestion)
                console.log(quest)
                message = teans[activeplayer]+" - Responda a pergunta"
                textmessage.innerHTML = message
                questionbox.innerHTML = quest.question
                answerbox.innerHTML = quest.answer
                questionbox.style.visibility = "visible"
                answerbox.style.visibility = "hidden"
                await waitUserInput(tempAnswer);
                activeplayer = (activeplayer+1)%2
                console.log("activeplayer = "+activeplayer)
                statusgame = 1;
                rounds--;
                breakbt = false;
            break
            default:
        }
    }
    roundtofinish.innerHTML = "rodadas restantes: 0"
    message = "Fim de Jogo"
    textmessage.innerHTML = message
}

function startgame(){
    teans[0] = eq1.value ? eq1.value : eq1.placeholder
    teans[1] = eq2.value ? eq2.value : eq2.placeholder
    timeanswer = timegame.value ? timegame.value : timegame.placeholder
    rounds = roundsgame.value ? roundsgame.value : roundsgame.placeholder
    console.log(teans[0]+" "+teans[1]+"  "+timeanswer+"  "+rounds)
    activeplayer = 0
    console.log("activeplayer = "+activeplayer)
    questionbox.style.visibility = "hidden"
    answerbox.style.visibility = "hidden"
    scoresteans = [0,0]
    statusgame = 1
    next = false;
    next1 = false;
    breakbt = false;
    gameplay()
}

musiccontrol[0].addEventListener("click", function(){
    musicplay.volume = 0;
})
musiccontrol[1].addEventListener("click", function(){
    if(musicplay.volume>=0.1){
        musicplay.volume -= 0.1;
    }
})
musiccontrol[2].addEventListener("click", function(){
    if(musicplay.volume<=0.9){
        musicplay.volume += 0.1;
    }
})
musiccontrol[3].addEventListener("click", function(){
    musicplay.volume = 1;
})

startbutton.addEventListener('click', startgame)