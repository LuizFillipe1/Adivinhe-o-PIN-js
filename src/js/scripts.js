// Seleção de elementos e declaração de variáveis 

const newGameBtn = document.querySelector("#new-game-btn")
const guessBtn = document.querySelector("#guess-btn")
const guessInput = document.querySelector("#guess-number")
const guessResult = document.querySelector("#guess-result span");
const attemptsUser = document.querySelector("#attempts span");
const guessContainer = document.querySelector("#guess-response-container");
const infoContainer = document.querySelector("#info-container");
const info = document.getElementById("info");
let flag = 0;
let userNumbers = [];
let attempts = 0;

// Funções

//Função que já é inicialida ao abrir o HTML e é responsavél por gerar o número aleatório de 4 dígitos
function init() {
    computerNumber = Math.floor(Math.random() * 9000) + 1000;
    console.log(computerNumber);
}

//Função responsável por reiniciar o jogo, zerando todos os parâmetros já armazenados
function newGame() {
    window.location.reload();
}

//Função responsável por limpar o valor de entrada inserida pelo usuário
function cleanInput() {
    guessInput.value = "";
}

//Função responsável por mostrar ou ocultar a div de tentativas e dicas ao usuário
function showOrHideResults() {
    guessContainer.classList.toggle("hide");
}

//Função Responsável por verificar a entrada inserida pelo usuário, caso a entrada seja inválida, é mostrado uma mensagem
function verifyNumbers(userGuess) {
    if (userGuess < 1000 || userGuess > 9999) {
        info.innerText = ("Tente um número de 1000 a 9999");
        infoContainer.classList.remove("hide");
        return true;
    }
    return false;
}

//Acionamento do botão "adivinhar"
guessBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let userGuess = parseInt(Number(guessInput.value));

    //Verifica se o número está correto
    if (verifyNumbers(userGuess)) {
    }
    else {
        infoContainer.classList.add("hide");
        let computerQuartil = computerNumber * 0.25;
        attempts++;
        attemptsUser.innerText = attempts;
        userNumbers.push(' ' + userGuess);
        document.getElementById('guess-numbers').innerHTML = userNumbers;

        //Apenas para informar ao console as dicas para se chegar ao número sorteado
        if (flag == 0) {
            console.log(`Numero computador: ${computerNumber} \n 1/4 do numero: ${computerQuartil}\n Numero menor: >${computerNumber - computerQuartil}\n Numero maior: <${computerNumber + computerQuartil}`);
            showOrHideResults();
            flag = 1;
        }
        //Verificação do número do usuário com o computado
        if (computerNumber == userGuess) {
            guessResult.innerText = "Número correto! Parabéns";
        }
        else if (userGuess < computerNumber && userGuess > (computerNumber - computerQuartil)) {
            guessResult.innerText = "Número menor que o correto";
        }
        else if (userGuess <= computerNumber) {
            guessResult.innerText = "Número muito menor que o correto";
        }
        else if (userGuess > computerNumber && userGuess < (computerNumber + computerQuartil)) {
            guessResult.innerText = "Número maior que o correto";
        }
        else if (userGuess >= computerNumber) {
            guessResult.innerText = "Número muito maior que o correto";
        }
        cleanInput();
    }
});

//Chamada da função newGame para reinicar o desafio
newGameBtn.addEventListener("click", (e) => {
    e.preventDefault();
    newGame();
})
