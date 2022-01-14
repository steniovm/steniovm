//retorna o produtos de uma lista de elementos passados
function multipli(...nums){
    return nums.reduce((acc,item) => {return acc*item});
}
//chama a função passando uma lista de elementos
console.log(multipli(1,2,3,4));//24

//retorna um vetor que é a concatenação de outros dois
function concatarray(vet1,vet2){
    return [...vet1,...vet2];
}
const vetor1 = [1,2,3,4,5,6,7,8,9];
const vetor2 = ['a','b','c','d','e','f','g','h'];
//chama a função passando os dois vetores a serem concatenados em ordem
console.log(concatarray(vetor1,vetor2));

//sorteia 10 numeros entre 0 e 100 e retorna o meior deles
function maxrandomlist(){
    let list=[];
    for(let i=0;i<10;i++){
        list.push(Math.round(Math.random()*100));
    }
    console.log(list);//imprime a lista só para ver se está pegando o maior mesmo
    return maxval(...list);
}
//retorna o maior valor de uma lista
function maxval(...vet){
    let maxva = vet[0];
    for(let i=0;i<vet.length;i++){
        if (maxva<vet[i]) maxva = vet[i];
    }
    return maxva;
}
//chama a função que retorna o maior valor a ser sorteado
console.log(maxrandomlist());