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
    Seu placar final é de:<br>
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
    {question: "Qual desses é uma das fases do ciclo do carbono?",
     answers: [
        { text: "Morte", correct: true },
        { text: "Fertilização", correct: false },
        { text: "Lixiviação", correct: false },
        { text: "Calefação", correct: false }
    ]},
    {question: " No meio aquático qual dessas alternativas tem relação direta no ciclo?",
     answers: [
        { text: "Fitoplâncton", correct: true },
        { text: "Intemperismo", correct: false },
        { text: "Citrato", correct: false },
        { text: "Rochas Ígneas", correct: false }
    ]},
    {question: "Qual item não tem relação com o ciclo do carbono?",
     answers: [
        { text: "Liberação de fosfato", correct: true },
        { text: "Queima de combustíveis fósseis", correct: false },
        { text: "Queima de florestas", correct: false },
        { text: "Respiração dos animais", correct: false}
    ]},
    {question: "Qual a influência do oceano nesse ciclo?",
     answers: [
        { text: "A vida nos oceanos consome grandes quantidades de CO2, uma vez que baixas temperaturas no oceano aumentam a absorção do CO2 atmosférico, enquanto temperaturas mais altas podem causar emissão de CO2.", correct: true },
        { text: "A vida nos oceanos consome grandes quantidades de CO2, uma vez que altas temperaturas no oceano diminuem a absorção do CO2 atmosférico, enquanto temperaturas mais baixas podem causar emissão de CO2.", correct: false },
        { text: "É dissolvido das rochas durante o intemperismo e vai para o solo, é essencial para a manutenção da vegetação continental , pois assim o nutriente fica disponível para ser absorvido por plantas terrestres.", correct: false },
        { text: "Não influência.", correct: false}
    ]},
    {question: "O que é difusão?",
     answers: [
        { text: "É um fenômeno de transporte de massa devido à diferença de concentração.", correct: true },
        { text: "Tratamento que consiste na remoção de líquido e substâncias tóxicas do sangue.", correct: false },
        { text: "Movimento de água através de uma membrana semipermeavel ocasionado por diferenças da pressão osmótica.", correct: false },
        { text: "É a passagem atual de pequenas moléculas através do membrana plasmática.", correct: false }
    ]},
    {question: "O ciclo do carbono na terra inclui os oceanos",
     answers: [
        { text: "Verdadeiro", correct: true },
        { text: "Falso", correct: false }
    ]},
    {question: "O ciclo do carbono é relativamente rápido, exceto quando é",
     answers: [
        { text: "Armazenado em madeira.", correct: true },
        { text: "Liberado pela respiração.", correct: false },
        { text: "Liberados com CO2.", correct: false },
        { text: "Dissolvido em ecossistemas aquáticos.", correct: false }
    ]},
    {question: "Em relação ao ciclo do carbono na natureza, é correto afirmar que",
     answers: [
        { text: "Um dos fatores que tem aumentado muito a liberação de CO2 na atmosfera é aqueimada das florestas.", correct: true },
        { text: "Os depósitos de carbono fósseis, como carvão, turfa e petróleo, são inesgotáveis uma vez que vão sendo supridos por todos os organismos que morrem.", correct: false },
        { text: "Esse elemento provém da atmosfera e é incorporado diretamente aos seres vivos.", correct: false },
        { text: "Nenhumas das opções está correta.", correct: false }
    ]},
    {question: "A utilização de combustíveis fósseis interfere no ciclo do carbono, pois provoca",
     answers: [
        { text: "Aumento na quantidade de carbono presente na atmosfera.", correct: true },
        { text: "Redução na taxa de fotossíntese dos vegetais superiores.", correct: false },
        { text: "Aumento da produção de carboidratos de origem vegetal.", correct: false },
        { text: "Aumento da porcentagem de carbono contido na terra.", correct: false }
    ]}
]
