const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex, score

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  score = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
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

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (correct) {
    score++
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    alert('Your score is ' + score + ' out of ' + questions.length)
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
  {
    question: 'Дети сидят в... (класс)',
    answers: [
      { text: 'классе', correct: true },
      { text: 'классу', correct: false },
      { text: 'классы', correct: false },
      { text: 'класса', correct: false }
    ]
  },
  {
    question: 'Автобус стоит на...(улица)',
    answers: [
      { text: 'улице', correct: true },
      { text: 'улицы', correct: false },
      { text: 'улицам', correct: false },
      { text: 'улицо', correct: false }
    ]
  },
  {
    question: 'Мой папа работает в...(банк)',
    answers: [
      { text: 'банку', correct: false },
      { text: 'банке', correct: true },
      { text: 'банки', correct: false },
      { text: 'банка', correct: false }
    ]
  },
  {
    question: 'Моя сестра учится в... (школа)',
    answers: [
      { text: 'школу', correct: false },
      { text: 'школе', correct: true },
      { text: 'школа', correct: false },
      { text: 'школы', correct: false }
    ]
  }
]