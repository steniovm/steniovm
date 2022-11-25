let QUESTION = []
let number = 0

const filejsonbt = document.getElementById("filejson")
const questnumber = document.getElementById("questnumber")
const categoryedition = document.getElementById("categoryedition")
const questedition = document.getElementById("questedition")
const answeredition = document.getElementById("answeredition")
const btprev = document.getElementById("btprev")
const btnext = document.getElementById("btnext")
const btnewq = document.getElementById("btnewq")
const btinsert = document.getElementById("btinsert")
const messagetext = document.getElementById("messagetext")
const savefile = document.getElementById("savefile")
const filename = document.getElementById("filename")

async function delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

filejsonbt.addEventListener("change", function(){
    let filelist = new FileReader()
    filelist.readAsText(filejsonbt.files[0])
    filelist.onload = async function() {
        QUESTION = JSON.parse(filelist.result)
        filename.value = filejsonbt.files[0].name.split(".")[0]
        console.log(filejsonbt.files[0].name)
        number = QUESTION.length-1
        showquestions()
        messagetext.innerHTML = "Questões carregadas"
        await delay(500)
        messagetext.innerHTML = ""
      };
    filelist.onerror = function() {
        console.log(filelist.error);
      };
})
btprev.addEventListener("click", function() {
    if (number>0){
        number--
        showquestions()
    }
})
btnext.addEventListener("click", function(){
    if (number<(QUESTION.length-1)){
        number++
        showquestions()
    }
})
btnewq.addEventListener("click", async function() {
    let modelquestion = {
        "category": "",
        "question": "",
        "answer": ""
    }
    number = QUESTION.length
    QUESTION.push(modelquestion)
    showquestions()
    messagetext.innerHTML = "Nova questão adcionada"
    await delay(500)
    messagetext.innerHTML = ""
})
btinsert.addEventListener("click", async function() {
    QUESTION[number].category = categoryedition.value
    QUESTION[number].question = questedition.value
    QUESTION[number].answer = answeredition.value
    console.log(number)
    console.log(QUESTION[number])
    messagetext.innerHTML = "Questão alterada"
    await delay(500)
    messagetext.innerHTML = ""
})

savefile.addEventListener("click", async function(){
    let data = new Blob([JSON.stringify(QUESTION,false,1)]);
    let namestring = "QuestionBank"
    if (filename.value) namestring = filename.value
    let downloadLink = document.getElementById("aDownloadTxt");
    if (downloadLink == null) {
        downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', namestring+'.json');
        downloadLink.setAttribute('id', 'aDownloadTxt');
        document.body.appendChild(downloadLink);
    }
    downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    downloadLink.href = URL.createObjectURL(data);
    downloadLink.style.display = 'none';
    downloadLink.click();
    messagetext.innerHTML = "Banco de questões salva como: "+namestring+'.json'
    await delay(500)
    messagetext.innerHTML = ""
})

function showquestions(){
    console.log(number)
    console.log(QUESTION[number])
    questnumber.innerHTML = (number+1+"/"+QUESTION.length)
    categoryedition.value = QUESTION[number].category
    questedition.value = QUESTION[number].question
    answeredition.value = QUESTION[number].answer
}
