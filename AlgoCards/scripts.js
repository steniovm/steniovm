//variaveis globais
let countinstruct = 0;
let typegame = "";
let seqcards=[];//sequencia de instruções
let person = {
    px : 0,
    py : 0,
    dx : 0,
    dy : 0
}

//funções referentes ao drag and drop
function dropCopy(ev){
    ev.preventDefault();
    console.log(ev.toElement.id)
    if(ev.toElement.id=="algol"){
        let id = ev.dataTransfer.getData("text");
        let nodeCopy = document.getElementById(id).cloneNode(true);
        nodeCopy.id = "intr"+countinstruct++;
        ev.currentTarget.style.background = "transparent";
        ev.target.appendChild(nodeCopy);
    }
}
function deleteitem(itemid){
    if(itemid.path[1].id == "algol"){
        document.getElementById(itemid.path[0].id).remove()
    }
}
function dragoverhandler(ev) {
 ev.currentTarget.style.background = "lightblue";
 ev.preventDefault();
}
function dragstarthandler(ev) {
 console.log("dragStart");
 ev.currentTarget.style.border = "dashed 1px silver";
 ev.dataTransfer.setData("text", ev.target.id); 
}

//configuração do tipo de jogo escolhido
function initgame(ev){
    typegame = ev.target.id
    document.getElementById('modalinit').style.display = "none";
    let cards = document.getElementsByClassName('instruction')
    switch (typegame){
        case "btACF":
            for( let i=0; i<cards.length; i++){
                cards[i].classList.remove('notinst');
            }
        break;
        case "btACL":
            for( let i=0; i<cards.length; i++){
                if (i==1||i==3||i==6||i==7||i==11||i==12||i==13){
                    cards[i].classList.add('notinst');
                }else{
                    cards[i].classList.remove('notinst');
                }
            }
        break;
        case "btACM":
            for( let i=0; i<cards.length; i++){
                if (i==1||i==3||i==6||i==7||i==13){
                    cards[i].classList.add('notinst');
                }else{
                    cards[i].classList.remove('notinst');
                }
            }
        break;
        case "btACR":
            for( let i=0; i<cards.length; i++){
                cards[i].classList.remove('notinst');
            }
        break;
        case "btACZ":
            for( let i=0; i<cards.length; i++){
                if (i==1||i==3||i==6||i==7||i==11||i==12){
                    cards[i].classList.add('notinst');
                }else{
                    cards[i].classList.remove('notinst');
                }
            }
        break;
        default:
            for( let i=0; i<cards.length; i++){
                if (i==1||i==3||i==6||i==7||i==11||i==12||i==13){
                    cards[i].classList.add('notinst');
                }else{
                    cards[i].classList.remove('notinst');
                }
            }
        break;
    }
}

//funções de cada card
function gireEsquerda(){
    const gx = -person.gy;
    const gy = person.gx;
    person.gx = gx;
    person.gy = gy;
    return "Gire Esquerda"
}
function gireDireita(){
    const gx = person.gy;
    const gy = -person.gx;
    person.gx = gx;
    person.gy = gy;
    return "Gire Direita"
}
function girDireita(angulo){
    const radianos = angulo * Math.PI / 180;
    const gx = person.gx * Math.cos(radianos) - person.gy * Math.sin(radianos);
    const gy = person.gx * Math.sin(radianos) + person.gy * Math.cos(radianos);
    person.gx = gx;
    person.gy = gy;
    return "Gire "+angulo+"graus para Direita"
}
function girEsquerda(angulo){
    const radianos = angulo * Math.PI / 180;
    const gy = person.gx * Math.cos(radianos) - person.gy * Math.sin(radianos);
    const gx = person.gx * Math.sin(radianos) + person.gy * Math.cos(radianos);
    person.gx = gx;
    person.gy = gy;
    return "Gire "+angulo+"graus para Esquerda"
}
function meiaVolta(){
    const gx = -person.gy;
    const gy = -person.gx;
    person.gx = gx;
    person.gy = gy;
    return "Gire Direita"
}
function paraFrente(){
    person.px += person.gx;
    person.py += person.gy;
    return "Passo pra Frente"
}
function paraTras(){
    person.px -= person.gx;
    person.py -= person.gy;
    return "Passo pra Tras"
}
function paraEsquerda(){
    const px = person.gy;
    const py = person.gx;
    person.px += px;
    person.py += py;
    return "Passo pra Esquerda"
}
function paraDireita(){
    const px = -person.gy;
    const py = -person.gx;
    person.px += person.gy;
    person.py += person.gx;
    return "Passo pra Direita"
}
function coringa(){
    return "CORINGA"
}
function acao(text){
    return text.toUpperCase
}
function repita(){
    //a fazer
}
function abreBloco(){
    //a fazer
}
function fechaBloco(){
    //a fazer
}

// executa o algoritimo do usuario
function playAlgo(){
    document.getElementById('modalplay').style.display = "flex";
    //preencher o vetor seqcards
    //executar o seqcards
}

/*
as opções de jogo serão:
btACF - livre - não mostra tabuleiro, somente sequencia
btACL - AlgoLabirinto - percorrer um caminho
btACM - AlgoMovimento - fazer um desenho
btACR - AlgoRitimo - Coreografia
btACZ - Algozumbi - tiro e labirinto
*/