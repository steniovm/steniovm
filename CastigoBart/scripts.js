//constantes
const LINESBOARD = 11;
const CARCTERLINES = 50;

//Variaveis Globais - referencias aos elementos
let phrase;
let ncoluns;
let nboards;
let nlines;
let phraseh2 = document.querySelector("#phrase");
let phr = document.querySelector(".phrases");
let results = document.querySelectorAll(".result");
let startbutton = document.querySelector("#start");
let numberphr = document.getElementById("numberphr");
let phrases = ['Eu não desperdiçarei giz.',
'Eu não andarei de skate nos corredores',
'Eu não arrotarei na aula',
'Eu não instigarei revoluções',
'Eu não vou desenhar mulheres nuas na sala de aula',
'Eu não vi Elvis',
'Eu não chamarei minha professora de Bolo Quente',
'Chiclete de alho não é engraçado',
'Eles estão rindo de mim, e não comigo.',
'Eu não gritarei “Fogo” em uma sala de aula cheia',
'Eu não incentivarei os outros a voarem',
'Alcatrão não é brincadeira',
'Eu não vou xerocar meu traseiro',
'Eu não trocarei de calças com os outros',
'Eu não sou uma velha de 32 anos.',
'Eu não vou fazer aquela coisa com minha língua',
'Eu não dirigirei o carro do diretor',
'Eu não vou jurar fidelidade ao Bart',
'Eu não venderei propriedades da escola',
'Não devo dar jeitinhos...',
'Eu não irei muito longe com essa atitude',
'Eu não farei barulhos de pum na sala de aula',
'Eu não venderei terras da florida',
'Eu não engordurarei as barras do macaco',
'Eu não me esconderei atrás da quinta emenda',
'Eu não farei nada de mau nunca mais',
'Não serei exibido.',
'Eu não vou dormir durante minha educação',
'Eu não sou dentista',
'Assoprar bolinhas de papel não é liberdade de expressão',
'Ninguém gosta de quem da tapa em queimaduras',
'Explosivos e a escola não se misturam',
'Eu não vou subornar o diretor Skinner.',
'Eu não rangerei o giz.',
'Eu terminarei o que com...',
'Bart Grana não é moeda corrente',
'Eu não vou fingir estar com rábia',
'Roupa de baixo deve ser vestida por baixo',
'A peça de Natal não fede',
'Eu não vou atormentar os emocionalmente frágeis',
'Eu não vou esculpir deuses',
'Eu não espancarei outros',
'Não vou mirar na cabeça',
'Eu não vou vomitar se não estiver doente',
'Eu não vou expor a ignorância dos professores',
'Eu não vi nada incomum na sala dos professores',
'Eu não conduzirei meu próprio exercício de incêndio',
'Barulhos engraçados não são engraçados',
'Eu não girarei a tartaruga',
'Eu não fingirei ter convulsões',
'Esta punição não é chata e sem sentido',
'Meu nome não é doutor morte',
'Eu não difamarei Nova Orleans',
'Eu não prescreverei medicação',
'Eu não enterrarei o garoto novo',
'Eu não ensinarei outros a voar',
'Eu não trarei carneiros para a aula',
'Um arroto não é uma resposta',
'Professora não é leprosa',
'Café não é para crianças',
'Eu não comerei coisas por dinheiro',
'Eu não vou gritar "ela morreu" durante a chamada',
'A peruca do diretor não é um frisbee',
'Eu não vou chamar o diretor de "cabeça de batata"',
'Peixes dourados não saltam',
'A lama não é um dos 4 grupos de alimentos',
'Ninguém está interessado nas minhas cuecas',
'Eu não venderei curas milagrosas',
'Eu devolverei o cão-guia',
'Eu não tenho imunidade diplomática',
'Eu não vou cobrar entrada para o banheiro',
'Eu nunca ganharei um “Emmy”',
'A frigideira do refeitório não é brinquedo',
'Muito trabalho e pouca diversão fazem de Bart um bobão',
'Eu não direi “Springfield” apenas para ser aplaudido',
'Eu não estou autorizado a demitir professoras substitutas',
'Minha lição não foi roubada por um homem sem um braço',
'Eu não vou chegar perto da tartaruga do jardim da infância',
'Eu não sou deliciosamente atrevido',
'Transplantes de órgãos são melhores quando deixados para os profissionais',
'O juramento à bandeira não termina com saudações ao Satanás',
'Eu não vou comemorar marcos sem sentido',
'Há muitas negócios como o dos espetáculos',
'Eu não vou retransmitir sem a permissão da Major League Baseball',
'Cinco dias não é muito para esperar por uma arma',
'Os feijões não são frutas nem musical',
'Eu não usarei abrev.',
'Eu não sou a reencarnação de Sammy Davis Jr.',
'Eu não enviarei banha pelo correio',
'Eu não vou dissecar coisas sem permissão',
'Eu não vou passar sabão nas escadas',
'Ralph não vai "transformar" se espreme-lo bastante',
'Dizer “é brincadeira” não me dá direito de insultar o diretor',
'“Homem do saco” não é uma carreira a ser escolhida',
'Escrita cursiva não significa o que eu acho que é',
'Na próxima vez pode ser eu no andaime',
'Eu não pendurarei donuts em minha pessoa',
'Eu lembrarei de tomar meu remédio',
'Eu não vou andar por ai como se o lugar fosse meu',
'Com bom humor o homem pode ir longe',
'Eu não tenho mandato para a primeira série',
'Gás de nervo não é brinquedo',
'Eu não vou zombar da sra. Cara de Trouxa',
'A primeira emenda não cobre arrotos',
'Isto não é uma pista... ou é?',
'Eu não me queixarei da solução quando a ouvir',
'"A Feiticeira" não promove o satanismo',
'Ninguém quer ouvir meu sovaco',
'Eu não sou uma desprezível máquina de cuspir',
'O dormitório dos garotos não é um parque aquático',
'Queimadura indiana não é nossa herança cultural',
'Cuecão não é saudável ​​para as crianças e outros seres vivos',
'Eu só vou fazer isso uma vez por ano',
'Eu vou parar de falar do pianista de 12 polegadas',
'Eu não sou certificado para remover asbesto',
'Eu não aprendi tudo que preciso no jardim de infância',
'Eu não tenho um gêmeo siamês perdido',
'A verdade não está la fora',
'Eu não sou licenciado pra fazer nada',
'Eu não vou esconder o Prozac da professora',
'Não é necessário haver fogo para o treinamento de incêndio',
'Eu não quero mais ver MTV',
'Todo mundo está cheio daquela história do Richard Gere',
'Eu não inventei a dança irlandesa',
'Eu não vou provocar gorduchos',
'Não há nenhum Deus romano chamado Peidacus',
'O nariz vermelho de Rudolph não está relacionado ao alcoolismo',
'Atirar bolas de tinta não é uma forma de arte',
'A dor não é o limpador',
'Silly String não é descongestionante nasal',
'Não me disseram para fazer isso',
'Minha bunda não merece um website',
'Eu não vou exigir o que eu mereço',
'Eu não vou bagunçar os créditos de abertura',
'Eu não sou o novo Dalai Lama',
'Eu não sou inspiração para Kraner',
'O especial de Halloween dos Simpsons IX',
'bunda.com não é o meu e-mail',
'Ninguém se importa o que é minha definição para “é”',
'Eu não gritarei por sorvete',
'Eu não estou licenciado para ser cabeleireiro',
'“O presidente fez isso!” não é desculpa',
'Minha mãe não está saindo com Jerry Seinfeld',
'Sherri não "voltou"',
'Eu não vou fazer o “the dirty bird”',
'Ninguém se importa com a minha ciática',
'Caipiras também são gente',
'Gramática não é perda de tempo',
'Não é um saco ser você',
'Eu não posso absolver pecados',
'Eu não vou desfigurar usando hieróglifos sempre que possível',
'Um macaco treinado não pode dar aula',
'Dentes moles não precisam da minha ajuda',
'Eu nunca estive lá e nem fiz aquilo',
'Eu estou muito cansado',
'Sexta-feira não é "calças opcionais"',
'Porco não é um verbo',
'Eu não sou o último Don',
'Eu não ganhei o Prêmio Nobel de Peidos',
'Eu nunca jamais usarei negativos duplos',
'Eu não posso ver pessoas mortas',
'Eu não vou vender meu rim no eBay',
'Eu não vou criar a arte do esterco',
'Vou parar de me desligar do que faço',
'Palhaço da turma não é uma profissão remunerada',
'Professores substitutos não são fura greve',
'Minha suspensão não foi "mutua"',
'Um arroto não é uma resposta oral',
'Queimada termina na quadra',
'"Não-inflamável" não é um desafio',
'Eu não fui tocado “lá” por um anjo',
'Eu não vou dançar no túmulo de ninguém',
'Eu não posso ter um estudante substituto',
'Eu não vou obedecer as vozes da minha cabeça',
'Eu não colocarei ALguma massagem subliminar aGORE',
'A Nova América não é um país medíocre',
'Eu não sou o presidente em atividade',
'Eu não era o sexto Beatle',
'Só fornecerei amostra de urina quando pedido',
'A enfermeira não negocia',
'Aula de ciências não deveria acabar em tragédia',
'Eu não deixarei os cachorros fugirem',
'Eu não publicarei o relatório de crédito do diretor',
'O hamster não teve uma vida cheia',
'Eu não vou comprar uma desculpa de presidente',
'Eu não vou assustar o vice presidente',
'Fogo não é o curador',
'Genética não é desculpa',
'Hoje é dia das mães',
'Eu não deveria ter 21 agora',
'Ninguém lê isso mais',
'Um arroto engarrafado não é projeto de ciências',
'Diversão não tem tamanho',
'Eu não sou Charlie Brown no ácido',
'Eu não tenho um cereal com meu nome',
'Eu não vou morder o Butterfinger que me alimenta',
'"A Arvore Generosa" não é idiota',
'Fazer o Milhouse chorar não é um projeto de ciências',
'Vampiro não é uma opção de carreira',
'Eu nunca irei mentir sobre cancelamento de novo',
'Peixes não gostam de café',
'O teste de piolhos do Milhouse não deu positivo',
'Esta escola não precisa de mudança de regime',
'Bob esponja não é um contraceptivo',
'Eu não vou',
'Minha caneta não é um lançador de meleca',
'Sanduíches não deveriam conter areia',
'Mais de 40 e solteiro não é engraçado',
'Eu não vou especular sobre o quanto quente o professor pode ser',
'Cutucar um guaxinim morto não é um trabalho de ciências',
'Cerveja numa caixa de leite não é leite',
'Meleca não é marcador de livro',
'Alguma criança ainda faz isso?',
'Eu não sou mais esperto que o presidente',
'A professora não levou um fora, foi mutuo',
'Eu não vou embrulhar cocô de cachorro',
'Eu não virarei a sala de cabeça pra baixo',
'Não vou vazar o enredo do filme',
'Je ne parle pas français',
'Tenham todos um ótimo verão',
'Um bebê me bateu',
'Não estamos nus debaixo das roupas',
'Franquincenso não é um monstro',
'Tchau otários',
'O aquecimento global não comeu meu dever de casa',
'Não vou investigar o que a professora faz',
'Pérolas não são vômitos de ostra',
'Filme',
'Eu não farei download ilegal deste filme',
'Não venderei copias piratas desse filme',
'Eu não vou esperar 20 anos por outro filme',
'O Wall Street Journal está melhor do que nunca',
'Eu não sou um banco da FDIC',
'Não irei me divertir com brinquedos educativos.',
'Não há coisa pior que o iPoddy',
'Os peregrinos não são aliens ilegais',
'A capital de Montana não é Hannah',
'A professora de artes é gorda, e não grávida',
'Toda pessoa é uma pessoa , mesmo que seja o Ralph .',
'Este castigo não é medieval',
'A dieta da professora está funcionando.',
'O Hamster da sala não está só dormindo',
'O Batman não é nada sem seu cinto de utilidades',
'Final de lost: tudo foi um sonho do cachorro, nos assista',
'Quando eu dormi na sala de aula não era para ajudar o Leo Dicaprio',
'Bart ganhou um dia de folga!',
'Não usarei branco depois do dia do trabalho',
'Não vou desistir das eleições até Karl Rone permitir',
'Quero a separação, mas não sei em que estado estou',
'Mais 20 dias de roubo em lojas até o Natal',
'A professora não engordou nas férias.',
'Eu vou obedecer as regras da campanha do Oscar© de agora em diante',
'Não fui nomeado para "Melhor palavrão falado".',
'Me desculpe por ter quebrado o quadro negro.',
'As últimas palavras de Jesus não foram "Graças à Deus é sexta-feira".',
'Esta escola não está caindo aos pedaços.',
'25 anos e eles não conseguem inventar um novo castigo',
'“Muito trabalho e pouca diversão fazem de Jack um bobão.”',
'Sentiremos sua falta, Sra. K',
'Meu calendário escolar não inclui uma semana de despedida',
'Rocktubro não é seguido por socovembro',
'Eu vou parar de perguntar quando o Noel vai ao banheiro',
'Eu não vou chamar minha professora de "Prancer" e "Vixen"',
'Sacerdote Judas não é death metal',
'Meu pai já está bêbado paro o Dia de São Patrício',
'Não se pode fazer pegadinha de 1º de abril no dia 27',
'Alerta de spoiler: Infelizmente meu pai não morre',
'Carne de rena não tem gosto de frango',
'Bonecos de neve não têm pênis de cenoura',
'Pixel art não é arte de verdade',
'Eu não vou pagar a minha irmã para fazer o meu castigo',
'Eu não vou lutar contra o futuro',
'É injusto julgar um presidente nos primeiros 300 dias.'];

//inicia com sorteio de frase
function initphrase(){
    let x = Math.round((Math.random())*(phrases.length));
    phrase = phrases[x];
    phraseh2.innerHTML = phrase;
}
//escreve as frases
function writeboard(){
    let countphr = 0;
    let countcar = 0;
    let temp="";
    nboards = 0;
    nlines = 0;
    nlinetemp=0;
    ncoltemp= 0;
    while(countphr < numberphr.value){
        if (countcar < phrase.length){
            temp=temp.concat(phrase[countcar])
            phr.innerHTML = temp;
                countcar++;
        }else{
            countphr++;
            if(countphr < numberphr.value){
                if(ncoltemp < ncoluns){
                    temp = temp.concat('&emsp;');
                    phr.innerHTML = temp;
                    countcar = 0;
                    ncoltemp++;
                }else{
                    nlines++;
                    nlinetemp++;
                    countcar=0;
                    ncoltemp=0;
                    if(nlinetemp<LINESBOARD){
                        temp = temp.concat('<br>');
                        phr.innerHTML = temp;
                    }else{
                        nboards++;
                        nlinetemp=0;
                        temp="";
                        ncoltemp=0;
                    }
                }
            }
        }
    }
    phr.style.width = (CARCTERLINES*0.8)+'em';
    nlines++;
    results[0].innerHTML = nlines;
    results[1].innerHTML = nboards;
}

//inicia o quadro
function initboard(){
    if (numberphr.value <= 0){//testa numero de repetições maior que zero
        alert("numero invalido");
        return;
    } else{//calcula o numero de frases cabem numa linha
        ncoluns = Math.floor(CARCTERLINES / phrase.length);
        if (ncoluns == 0) ncoluns = 1;
        writeboard();
    }
}

//chamadas das funções
initphrase();

//eventos
startbutton.addEventListener('click', initboard);

