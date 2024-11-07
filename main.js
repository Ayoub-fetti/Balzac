const questions = [
    {
        question: "Quelle est la capitale de la France ?",
        options: [
            "Marseille",
            "Paris",
            "Lyon"
        ],
        answer: "Paris" // reponse correcte
    },
    {
        question: "Quel est l'article défini pour le mot (chien) ?",
        options: [
            "Le",
            "La",
            "Les"
        ],
        answer: "Le" 
    },
    {
        question: "Quel est le synonyme de rapide ?",
        options: [
            "Lent",
            "Vite",
            "Doucement"
        ],
        answer: "Vite" 
    },
    {
        question: "Quel est le contraire de jour ?",
        options: [
            "Matin",
            "Soir",
            "Nuit"
        ],
        answer: "Nuit" 
    },
    {
        question: "Comment dit-on (hello) en français ?",
        options: [
            "Bonjour",
            "Salut",
            "Au revoir"
        ],
        answer: "Bonjour" 
    },
    {
        question: "Quel est le passé composé du verbe (manger) à la première personne du singulier ?",
        options: [
            "J'ai mangé",   
            "J'avais mangé",
            "Je mangeais"
        ],
        answer: "J'ai mangé" 
    },
    {
        question: "Quelle est la traduction de cat en français ?",
        options: [
            "Chien",
            "Chat",
            "Cheval"
        ],
        answer: "Chat" 
    },
    {
        question: "Quelle est la forme correcte pour (ils) au présent du verbe (aller) ?",
        options: [
            "Ils allent",
            "Ils vont",
            "Ils vas"
        ],
        answer: "Ils vont" 
    },
    {
        question: "Comment dit-on (please) en français ?",
        options: [
            "Merci",
            "S'il vous plaît",
            "Pardon"
        ],
        answer: "S'il vous plaît" 
    },
   
    {
        question: "Quel mot est un adjectif ?",
        options: [
            "Rapide",
            "Vitesse",
            "Rapidement"
        ],
        answer: "Rapidement" 
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Function demerer le quiz
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    document.querySelector('.quiz').style.display = 'flex';
    showQuestion();
}

function checkAnswer(selectedOption) {
    clearInterval(timer);
    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-item');
    const nextButton = document.querySelector('.next-button');
    
    optionButtons.forEach(button => {
        button.disabled = true;
        if (button.textContent === currentQuestion.answer) {
            button.classList.add('correct');
        } else if (button.textContent === selectedOption) {
            button.classList.add('incorrect');
        }
    });

    if (selectedOption === currentQuestion.answer) {
        score += 2; // Attribue 2 points par réponse correcte
    }

    nextButton.style.display = 'block';
}


// Function pour la premier question
function showQuestion() {
    const questionHeader = document.querySelector('.question-header h2');
    const optionsList = document.querySelector('.options-list');
    const nextButton = document.querySelector('.next-button');
    
    // Vider la liste des options précédentes
    optionsList.innerHTML = '';
    
    // Cacher le bouton suivant
    nextButton.style.display = 'none';

    // Vérifier si nous avons encore des questions
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        
        // Afficher la question
        questionHeader.textContent = currentQuestion.question;
        
        // Creer et afficher les options
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-item';
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(option));
            optionsList.appendChild(button);
        });

        // Mettre à jour le numéro de la question
        document.querySelector('.page-number').textContent = 
            `${currentQuestionIndex + 1}/${questions.length}`;
    }
    clearInterval(timer);
    timeLeft = 20;
    updateTimer();
    startTimer();
}

// Function pour passer a la question suivant
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}



// Event listeners
document.querySelector('.btn_about').addEventListener('click', startQuiz);
document.querySelector('.next-button').addEventListener('click', nextQuestion);
document.querySelector('.redemarer').addEventListener('click', startQuiz);




// fonction pour le scroll 
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// fonction pour afficher le resultat 
function showResult() {
    clearInterval(timer);
    const quizSection = document.querySelector('.quiz');
    const resultSection = document.querySelector('.result');
    const certificateDiv = resultSection.querySelector('.certificate');
    
    quizSection.style.display = 'none';
    resultSection.style.display = 'flex';

    const totalQuestions = questions.length;
    const maxScore = totalQuestions * 2;
    const correctAnswers = score / 2;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const level = determineLevel(score);

    certificateDiv.innerHTML = `
        <h1 class="votre">Votre résultat :</h1>
        <span style="font-weight: 600; font-size: 30px;">${score}/${maxScore}</span>
        <h1 class="good">Réponses correctes :</h1>
        <span style="font-weight: 600;font-size: 30px;">${correctAnswers}</span>
        <h1 class="bad">Réponses incorrectes :</h1>
        <span style="font-weight: 600;font-size: 30px;">${incorrectAnswers}</span>
        <h1 class="level">Votre niveau :</h1>
        <span style="font-weight: 600;font-size: 30px;">${level}</span>
    `;

    const restartButton = document.querySelector('.redemarer');
    restartButton.addEventListener('click', startQuiz);
}

// fonction pour determiner le level
function determineLevel(score) {
    if (score <= 4) return "A1";
    if (score <= 11) return "A2";
    if (score <= 15) return "B1";
    if (score <= 17) return "B2";
    if (score <= 19) return "C1";
    return "C2";
}



document.querySelector('.button_home').addEventListener('click', function(e) {
    e.preventDefault(); // pour le botton home 
    scrollToSection('about');
});

document.querySelector('.btn_about').addEventListener('click', function(e) {
    e.preventDefault(); // pour le botton cart 
    scrollToSection('quiz');
    startQuiz();
});

document.querySelector('.redemarer').addEventListener('click', function(e) {
    e.preventDefault(); // pour le botton home 
    scrollToSection('quiz');
});


// ************************fonction pour timer***********************
let timer;
let timeLeft = 20;

function updateTimer() {
    document.querySelector('.timer').textContent = `Temps restant : ${timeLeft} s`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

