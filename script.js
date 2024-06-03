const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const questionImage = document.getElementById('question-image');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

const questions = [
    {
        question: 'What is 2 + 2?',
        image: 'images/math.jpg',
        answers: [
            { text: '4', correct: true },
            { text: '5', correct: false },
            { text: '3', correct: false },
            { text: '6', correct: false }
        ]
    },
    {
        question: 'What is the capital of France?',
        image: 'images/paris.jpg',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'London', correct: false },
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false }
        ]
    }
];

let currentQuestionIndex = 0;

function startGame() {
    currentQuestionIndex = 0;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    if (question.image) {
        questionImage.src = question.image;
        questionImage.classList.remove('hide');
    } else {
        questionImage.classList.add('hide');
    }
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('wrong');
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        button.removeEventListener('click', selectAnswer);
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Restart';
        nextButton.classList.remove('hide');
    }
}

nextButton.addEventListener('click', () => {
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
    } else {
        startGame();
    }
});

startGame();
