let seuVotoPara = document.querySelector('.d-1-1 span'); //selecionando o texto ''seu voto para'' pra manipulação
let cargo = document.querySelector('.d-1-2 span'); //selecionando o texto ''cargo'' para manipulação
let descricao = document.querySelector('.d-1-4'); //selecionando a div ''d-1-4'' para manipulação
let aviso = document.querySelector('.d-2'); //selecionando a div ''d-2'' para manipulação
let lateral = document.querySelector('.d-1-right'); //selecionando as imagens para manipulação
let numeros = document.querySelector('.d-1-3'); //selecionando os números para manipulação


let etapaAtual = 0; //a contagem começa no 0 em javascript, então aqui a etapa vai começar sempre do index 0, que no caso é o vereador.
let numero = '';
let votoBranco = false; //add na aula 7
let votos = []; //add na aula 8


function comecarEtapa() {
    /*essa é a tela inicial da urna, que obviamente tem que aparecer sem nenhuma informação
    por isso está quase tudo com ''none'' ou '' */

    let etapa = etapas[etapaAtual]; //passo 2 ( variável de acesso ao índex de etapas.js)

    let numeroHtml = '';
    numero = ''; //add na aula 7
    votoBranco = false; //add na aula 7

    for(i=0; i <etapa.numeros; i++){

        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>'
        }
    } /*se o número for igual a 0 o quadradinho vai piscar, caso contrário não. 
    O loop foi feito para que os quadradinhos se repitam de acordo com os números disponíveis para o cargo*/

    seuVotoPara.style.display = 'none'; //passo 1
    cargo.innerHTML = etapa.titulo; //passo 3
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() { //adicionada as variáveis na aula 6
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else {
            return false;
        }
    });

    if(candidato.length > 0 ){ //aqui é para quando existe/acha o candidato

        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos) { 
            if(candidato.fotos[i].url.small){ //condicional add na aula 7
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else{
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
            
        }

        lateral.innerHTML = fotosHtml;

    } else{ //para quando não acha/não existe candidato

        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO NULO</div>`;
    }
}

//Funções de clique nos botões add na aula 5
function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca'); //nextElementSibling serve para pegar o elemento ao lado
        } else {
            atualizaInterface();
        }
        /* Ou seja, se tiver um número ao lado pra ser preenchico, adicione o pisca,
        caso contrário, atualize a interface. */
    }
};

function branco() { //add na aula 7
    if(numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO EM BRANCO</div>`;
        lateral.innerHTML = '';
    } else {
        alert('Para votar em BRANCO não pode ter digitado nenhum número')
    }
};

function corrige() {
    comecarEtapa(); //add na aula 7. Clicar em corrige vai limpar a tela através da função comecarEtapa
};

function confirma() { // add na aula 7
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = `<div class="aviso-gigante pisca">FIM</div>`; //add na aula 8
            console.log(votos);
        }
    }
};


comecarEtapa();