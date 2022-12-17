//constantes

//Variaveis Globais - referencias aos elementos
let playgamer = document.getElementById("playgamer");
let champ = document.getElementById("champ");
let bboard = document.querySelectorAll(".buttonboard");
let tabela = document.getElementById('tabHist');//tabela de jogos
let state = 'O';//variavel de estado - 'O' = vez do jogador O - 'X' = vez do jogador X - 'F' = Jogo finalizado
let boardstate = [['-','-','-'],
                  ['-','-','-'],
                  ['-','-','-']];//matriz do jogo
let jogoN =  0;//numero do jogo

//preenchimento dos elementos
function updateboard(){
    for (let i=0;i<3;i++){
        for (let j=0;j<3;j++){
            bboard[i+(3*j)].innerHTML=boardstate[i][j];
        }
    }
}
//marcar posição
function markposition(posit){
    let ph = posit % 3;//posição horizontal
    let pv = (posit - ph)/3;//posição vertical
    let tempchamp = state;
    //marca a jogada
    if (state=='O'){
        if(boardstate[pv][ph]=='-'){
            boardstate[pv][ph]='O';
            bboard[posit].innerHTML='O';
            if (verfinsh()){
                state='F';
                printhisto(1);
            }else{
                state='X';
                playgamer.innerHTML=state;
            }
        }

    }else if(state=='X'){
        if(boardstate[pv][ph]=='-'){
            boardstate[pv][ph]='X';
            bboard[posit].innerHTML='X';
            if (verfinsh()){
                state='F';
                printhisto(3);
            }else{
                state='O';
                playgamer.innerHTML=state;
            }
        }
    }
    //quando o jogo termina
    if (state=='F'){
        champ.innerHTML=tempchamp;
        resetgame(tempchamp);
        /*if(tempchamp=='F' || tempchamp=='VELHA'){
            resetgame();
        }else if(tempchamp=='O' || tempchamp!='X'){
            resetgame(tempchamp);
        }*/
    } else if(vervelha()){
        champ.innerHTML='VELHA';
        playgamer.innerHTML='VELHA';
        tempchamp=='VELHA';
        printhisto(2);
        state='F';
    }
}

function verfinsh(){
    let test = false;
    //teste horizontal e vertical
    for(let i=0;i<3;i++){
        //teste horizontal
        if(boardstate[i][0]==state &&
            boardstate[i][1]==state &&
            boardstate[i][2]==state){
                test = true;
            }
        //teste vertical
        if(boardstate[0][i]==state &&
            boardstate[1][i]==state &&
            boardstate[2][i]==state){
                test = true;
            }
    }
    //teste diegonal
    if((boardstate[0][0]==state &&
        boardstate[1][1]==state &&
        boardstate[2][2]==state) ||
       (boardstate[2][0]==state &&
        boardstate[1][1]==state &&
        boardstate[0][2]==state)){
            test = true;
        }
    return test;
}
function vervelha(){
    let test=true;
    if(!verfinsh()){
        for(let i=0;i<3;i++)
        for(let j=0;j<3;j++){
            if(boardstate[i][j]=='-'){
                test=false;
            }
        }
    }
    return test;
}

function resetgame(cha){
    boardstate = [['-','-','-'],
                  ['-','-','-'],
                  ['-','-','-']];
    if (cha=='O') state = 'X';
    else state = 'O';
    updateboard();
    champ.innerHTML='';
    playgamer.innerHTML=state;
}

//imprime hitórico
function printhisto(v){
    let linha = document.createElement("tr");//cria linha de tabela
    let cel = new Array(4);
    cel[0] = document.createElement("td");//cria primira celula da linha
    cel[0].innerHTML = (++jogoN);
    linha.append(cel[0]);
    for (let i=1; i<=3;i++){
      cel[i] = document.createElement("td");//cria celula
      if (i==v){
        cel[i].innerHTML = '*';//celula vencedora
      } else{
        cel[i].innerHTML = '-';//celula perdedora
      }
      linha.append(cel[i]);
    }
    tabela.append(linha);//adciona linha à tabela
  }

//chamadas das funções
updateboard();

//eventos
for (let i=0;i<9;i++)
    bboard[i].addEventListener('click',function (){markposition(i)});