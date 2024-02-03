const questions = [
    {
        question: "Which of the following is a perfect square?",
        answers: [
            { text: "1057", correct: false },
            { text: "625", correct: true },
            { text: "7928", correct: false },
            { text: "64000", correct: false },
        ]
    },
    {
        question: "What is 3 times 4 divided by 2?",
        answers: [
            { text: "12", correct: false },
            { text: "8", correct: true },
            { text: "18", correct: false },
            { text: "32", correct: false }
        ]
    },
    {
        question: "How many natural numbers lie between 9^2 and 10^2?",
        answers: [
            { text: "10", correct: false },
            { text: "9", correct: false },
            { text: "18", correct: true },
            { text: "20", correct: false }
        ]
    },
    {
        question: "What is the sum of the first four odd natural numbers?",
        answers: [
            { text: "16", correct: true },
            { text: "17", correct: false },
            { text: "18", correct: false },
            { text: "20", correct: false }
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentquestionIndex = 0;
let score = 0;

function startQuiz() {
    currentquestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentquestion = questions[currentquestionIndex];
    let questionNo = currentquestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if (iscorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");  /* Corrected from Wrong to wrong */
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showscore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}

function handlenextButton() {
    currentquestionIndex++;
    if (currentquestionIndex < questions.length) {
        showQuestion();
    } else {
        showscore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentquestionIndex < questions.length) {
        handlenextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
