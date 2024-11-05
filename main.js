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
    document.querySelector('.quiz').style.display = 'flex'; // Show quiz section
    showQuestion();
}

// Function pour la premier question
function showQuestion() {
    const questionHeader = document.querySelector('.question-header h2');
    const optionsList = document.querySelector('.options-list');
    const nextButton = document.querySelector('.next-button');
    optionsList.innerHTML = ''; // Clear previous options
    nextButton.style.display = 'none'; // Hide next button initially

    const currentQuestion = questions[currentQuestionIndex];
    questionHeader.innerText = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const li = document.createElement('li');
        li.className = 'option-item';
        li.innerHTML = `
            <label>
                <input type="radio" name="option" class="custom-radio" value="${option}">
                ${option}
            </label>
        `;
        li.querySelector('input').addEventListener('change', () => {
            nextButton.style.display = 'block'; // Show next button when an option is selected
        });
        optionsList.appendChild(li);
    });
}

// Function pour passer a la question suivant
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Veuillez sélectionner une réponse !");
        return;
    }

    // Store the answer 
    const userAnswer = selectedOption.value;
    // You can store user answers in an array if you want to process them later
    // userAnswers.push(userAnswer);

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Function pour montrer le result
function showResult() {
    document.querySelector('.quiz').style.display = 'none'; // Hide quiz section
    
    // Calculate the score here
    score = questions.reduce((acc, question, index) => {
        const userAnswer = document.querySelector(`input[name="option"]:checked`).value;
        return acc + (userAnswer === question.answer ? 1 : 0);
    }, 0);

    alert(`Votre score final est ${score} sur ${questions.length}`);
}

// Event listeners
document.querySelector('.btn_about').addEventListener('click', startQuiz);
document.querySelector('.next-button').addEventListener('click', nextQuestion);