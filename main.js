document.addEventListener('DOMContentLoaded', () => {
    const resultSection = document.querySelector('.result');
    resultSection.style.display = 'none'; // Cacher la section result
    const aboutSection = document.querySelector('.about');
    aboutSection.classList.add('hidden'); // Cacher la section about 
    const quizSection = document.querySelector('.quiz');
    quizSection.style.display = 'none';   // Cacher la section quiz
    loadLastScore();
});

// tableau pour stocker toute  les reponses correcte ou incorrecte
// ********************************** 

let userAnswers = [];

// database des questions 
// ******************************************



const questions = [
    {
        question: "Quelle est la capitale de la France ?",
        options: [
            "Marseille",
            "Paris",
            "Lyon"
        ],
        answer: "Paris" 
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
        question: "Quelle est la traduction de (cat) en français ?",
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

// Function demarer le quiz & les questions sont par oordre aleatoire
// ****************************************


function startQuiz() {
    
    const shuffledQuestions = shuffleArray([...questions]); // copie pour original array 
    
    // Remplacez le tableau de questions global par le tableau melange

    questions.length = 0; // Vide le tableau original
    questions.push(...shuffledQuestions); // ajoute les questions melange
    
    score = 0;
    currentQuestionIndex = 0;
    document.querySelector('.quiz').style.display = 'flex';
    showQuestion();
}

// fonction pour melanger les questions 
// *************************************


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// fonction pour verifier la reponse correcte ou incorrecte 
// ****************************************

function checkAnswer(selectedOption) {
    clearInterval(timer);
    const currentQuestion = questions[currentQuestionIndex];
    userAnswers[currentQuestionIndex] = selectedOption; // stocker les reponses des utilisateur 
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
        score += 2; // 2 pts pour la reponse correcte
    }

    nextButton.style.display = 'block';
}


// Function pour la premier question
// ********************************************


function showQuestion() {
    const questionHeader = document.querySelector('.question-header h2');
    const optionsList = document.querySelector('.options-list');
    const nextButton = document.querySelector('.next-button');
    
    // Vider la liste des options precedent
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
// ******************************************


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
// document.querySelector('.accueil').addEventListener('click', startQuiz);





// fonction pour le scroll 
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}


// fonction pour afficher le resultat 
// ***********************************



function showResult() {
    clearInterval(timer);
    const quizSection = document.querySelector('.quiz');
    const resultSection = document.querySelector('.result');
    const certificateDiv = resultSection.querySelector('.certificate');
    const lastScoreElement = document.querySelector('.last_score');
    
    quizSection.style.display = 'none';
    resultSection.style.display = 'flex';

    const totalQuestions = questions.length;
    const maxScore = totalQuestions * 2;
    const correctAnswers = score / 2;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const level = determineLevel(score);

    // Sauvegarde du score
    saveScore(score, maxScore);

    // Mettre à jour et afficher le dernier score
    lastScoreElement.innerHTML = `Votre dernier score : <span class="last_note">${score}/${maxScore}</span>`;
    lastScoreElement.style.display = 'block'; // Assurez-vous que c'est visible

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
   
    // creer un button pour pdf
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Télécharger le rapport PDF';
    downloadButton.className = 'download-report';
    downloadButton.addEventListener('click', generatePDF);
    resultSection.appendChild(downloadButton);
}

// fonction pour determiner le level
// *********************************

function determineLevel(score) {
    if (score <= 4) return "A1";
    if (score <= 11) return "A2";
    if (score <= 15) return "B1";
    if (score <= 17) return "B2";
    if (score <= 19) return "C1";
    return "C2";
}



document.querySelector('.button_home').addEventListener('click', function(e) {
    e.preventDefault();
    const aboutSection = document.querySelector('.about');
    aboutSection.classList.remove('hidden'); // Afficher la section about
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

document.querySelector('.accueil').addEventListener('click', function(e) {
    e.preventDefault(); // pour le botton home 
    scrollToSection('home');
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


// Fonction pour sauvegarder le score
// **************************************
function saveScore(score, maxScore) {
    localStorage.setItem('lastScore', JSON.stringify({
        score: score,
        maxScore: maxScore,
        date: new Date().toLocaleString()
    }));
}

// Fonction pour charger et afficher le dernier score
// **************************************************
function loadLastScore() {
    const lastScoreElement = document.querySelector('.last_score');
    const lastScoreData = JSON.parse(localStorage.getItem('lastScore'));
    
    // Cacher par défaut lors de la première visite
    lastScoreElement.style.display = 'none';
    
    if (lastScoreData) {
        lastScoreElement.innerHTML = `Votre dernier score : <span class="last_note">${lastScoreData.score}/${lastScoreData.maxScore}</span>`;
        lastScoreElement.style.display = 'block'; // Afficher seulement s'il y a un score précédent
    }
}

// fonction pour generer un pdf 
// ********************************

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Rapport de test', 20, 20);

    // Configuration de la position initiale
    let yPosition = 30;
    const lineHeight = 15; // Espace entre les lignes
    const pageHeight = 280; // Hauteur d'une page A4 (en mm)

    // Liste des questions, réponses et résultats
    questions.forEach((question, index) => {
        doc.setFontSize(12);
        
        // Texte des questions et réponses
        doc.text(`Question ${index + 1}: ${question.question}`, 15, yPosition);
        doc.text(`Votre réponse: ${userAnswers[index]}`, 15, yPosition + lineHeight);
        doc.text(`Réponse correcte: ${question.answer}`, 15, yPosition + 2 * lineHeight);
        
        // Mise à jour de la position verticale pour la prochaine entrée
        yPosition += 3 * lineHeight;

        // Passer à une nouvelle page si on dépasse la hauteur de la page
        if (yPosition > pageHeight - 15) { 
            doc.addPage();
            yPosition = 15; // Repositionner en haut de la nouvelle page
        }
    });

    // Passer à la deuxième page pour le score et niveau
    doc.addPage();
    doc.setFontSize(16);
    doc.text(`Score total: ${score}/${questions.length * 2}`, 15, 30);
    doc.text(`Niveau atteint: ${determineLevel(score)}`, 15, 50);

    // Téléchargement du PDF
    doc.save('rapport_quiz.pdf');
}


