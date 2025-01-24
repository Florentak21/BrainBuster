import { quizQuestions } from "./quiz.js";

const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const nextButton = document.getElementById('next-button');
const replayButton = document.getElementById('replay-button');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;

function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = '';

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(answer));
        answersContainer.append(button);
    });
}

function checkAnswer(selectedAnswer) {
    if (hasAnswered) return;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const answerButtons = answersContainer.querySelectorAll('button');
    answerButtons.forEach(button => {
        button.disabled = true;
    });

    if (selectedAnswer === currentQuestion.correctAnswer) {
        feedback.textContent = "Bravo, c'est Correct !";
        score++;
    } else {
        feedback.textContent = `Dommage ! La bonne réponse était : ${currentQuestion.correctAnswer}`;
    }
    scoreDisplay.textContent = `Score : ${score}`;

    hasAnswered = true;
}

nextButton.addEventListener('click', () => {
    hasAnswered = false;
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
        feedback.textContent = '';
    } else {
        alert(`Quiz terminé ! Votre score final est : ${score}/${quizQuestions.length}`);
        
        // Afficher le bouton "Rejouer"
        replayButton.style.display = 'block';
        nextButton.style.display = 'none';
    }
});

replayButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    hasAnswered = false;
    scoreDisplay.textContent = `Score : ${score}`;
    feedback.textContent = '';

    // Cacher le bouton "Rejouer" et réafficher le bouton "Suivant"
    replayButton.style.display = 'none';
    nextButton.style.display = 'block';

    // Redémarrage du quiz
    displayQuestion();
});

// Démarrage du quiz
displayQuestion();