const title = document.getElementById('quiz-title')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const resultButton = document.getElementById('result-btn')
const restartButton = document.getElementById('restart-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const results = document.getElementById('results')
const resultDisplay = document.getElementById('result-display')
const answerButtonsElement = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex
let total = 0

startButton.addEventListener('click', startGame) 
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
resultButton.addEventListener('click', showResults)
restartButton.addEventListener('click', () => {
    document.location.reload()
})
function startGame() {
    title.classList.add('hide')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5).slice(0, 5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.sort(() => Math.random() - .5)
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        button.disabled = true
    })

    if (correct) {
        total += 1
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')   
    } else {
        resultButton.classList.remove('hide')
    }

}

function showResults() {
    clearStatusClass(document.body)
    questionContainerElement.classList.add('hide')
    resultButton.classList.add('hide')
    resultDisplay.innerHTML = `<b>Agradecemos por jogar!<br><br></b>
    Seu placar final ?? de:<br>
    <score>${total}/${shuffledQuestions.length}<score> acertos
    `

    results.classList.remove('hide')
    restartButton.classList.remove('hide')
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(
            answerButtonsElement.firstChild
        )
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {question: "Qual desses ?? uma das fases do ciclo do carbono?",
     answers: [
        { text: "Morte", correct: true },
        { text: "Fertiliza????o", correct: false },
        { text: "Lixivia????o", correct: false },
        { text: "Calefa????o", correct: false }
    ]},
    {question: " No meio aqu??tico qual dessas alternativas tem rela????o direta no ciclo?",
     answers: [
        { text: "Fitopl??ncton", correct: true },
        { text: "Intemperismo", correct: false },
        { text: "Citrato", correct: false },
        { text: "Rochas ??gneas", correct: false }
    ]},
    {question: "Qual item n??o tem rela????o com o ciclo do carbono?",
     answers: [
        { text: "Libera????o de fosfato", correct: true },
        { text: "Queima de combust??veis f??sseis", correct: false },
        { text: "Queima de florestas", correct: false },
        { text: "Respira????o dos animais", correct: false}
    ]},
    {question: "Qual a influ??ncia do oceano nesse ciclo?",
     answers: [
        { text: "A vida nos oceanos consome grandes quantidades de CO2, uma vez que baixas temperaturas no oceano aumentam a absor????o do CO2 atmosf??rico, enquanto temperaturas mais altas podem causar emiss??o de CO2.", correct: true },
        { text: "A vida nos oceanos consome grandes quantidades de CO2, uma vez que altas temperaturas no oceano diminuem a absor????o do CO2 atmosf??rico, enquanto temperaturas mais baixas podem causar emiss??o de CO2.", correct: false },
        { text: "?? dissolvido das rochas durante o intemperismo e vai para o solo, ?? essencial para a manuten????o da vegeta????o continental , pois assim o nutriente fica dispon??vel para ser absorvido por plantas terrestres.", correct: false },
        { text: "N??o influ??ncia.", correct: false}
    ]},
    {question: "O que ?? difus??o?",
     answers: [
        { text: "?? um fen??meno de transporte de massa devido ?? diferen??a de concentra????o.", correct: true },
        { text: "Tratamento que consiste na remo????o de l??quido e subst??ncias t??xicas do sangue.", correct: false },
        { text: "Movimento de ??gua atrav??s de uma membrana semipermeavel ocasionado por diferen??as da press??o osm??tica.", correct: false },
        { text: "?? a passagem atual de pequenas mol??culas atrav??s do membrana plasm??tica.", correct: false }
    ]},
    {question: "O ciclo do carbono na terra inclui os oceanos",
     answers: [
        { text: "Verdadeiro", correct: true },
        { text: "Falso", correct: false }
    ]},
    {question: "O ciclo do carbono ?? relativamente r??pido, exceto quando ??",
     answers: [
        { text: "Armazenado em madeira.", correct: true },
        { text: "Liberado pela respira????o.", correct: false },
        { text: "Liberados com CO2.", correct: false },
        { text: "Dissolvido em ecossistemas aqu??ticos.", correct: false }
    ]},
    {question: "Em rela????o ao ciclo do carbono na natureza, ?? correto afirmar que",
     answers: [
        { text: "Um dos fatores que tem aumentado muito a libera????o de CO2 na atmosfera ?? aqueimada das florestas.", correct: true },
        { text: "Os dep??sitos de carbono f??sseis, como carv??o, turfa e petr??leo, s??o inesgot??veis uma vez que v??o sendo supridos por todos os organismos que morrem.", correct: false },
        { text: "Esse elemento prov??m da atmosfera e ?? incorporado diretamente aos seres vivos.", correct: false },
        { text: "Nenhumas das op????es est?? correta.", correct: false }
    ]},
    {question: "A utiliza????o de combust??veis f??sseis interfere no ciclo do carbono, pois provoca",
     answers: [
        { text: "Aumento na quantidade de carbono presente na atmosfera.", correct: true },
        { text: "Redu????o na taxa de fotoss??ntese dos vegetais superiores.", correct: false },
        { text: "Aumento da produ????o de carboidratos de origem vegetal.", correct: false },
        { text: "Aumento da porcentagem de carbono contido na terra.", correct: false }
    ]}
]
