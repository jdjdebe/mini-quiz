/**
 * Codice JavaScript per il Mini-Quiz Interattivo Open Day (6 Domande)
 * Utilizza la manipolazione del DOM per un'esperienza grafica superiore.
 */

// Lista delle 6 domande con risposte e feedback personalizzati
const quizData = [
    {
        domanda: "1. L'ITIS Carlo Grassi offre diversi indirizzi tecnici. Qual è l'indirizzo che unisce meccanica, elettronica e informatica per creare robot e sistemi automatici?",
        rispostaCorretta: "meccatronica",
        messaggioCorretto: "Fantastico! La Meccatronica è il futuro dell'automazione, un indirizzo chiave del Grassi!",
        messaggioErrato: "Sbagliato. La risposta era 'Meccatronica'. Un mix di materie super interessanti!"
    },
    {
        domanda: "2. L'Intelligenza Artificiale (AI) è come un cervello digitale. Qual è la caratteristica fondamentale che permette all'AI di migliorare nel tempo?",
        rispostaCorretta: "apprendimento", // Accetta anche 'ragionamento'
        messaggioCorretto: "Esatto! L'AI usa l'Apprendimento (Machine Learning) per diventare sempre più brava. Ottimo!",
        messaggioErrato: "Non proprio. La chiave è l'apprendimento, cioè la capacità di imparare dai dati."
    },
    {
        domanda: "3. Di solito il percorso per il Diploma Tecnico all'ITIS dura 5 anni. Qual è il percorso *sperimentale* che permette di ottenere lo stesso diploma in un periodo più breve?",
        rispostaCorretta: "quadriennale",
        messaggioCorretto: "Corretto! Il percorso Quadriennale permette di accorciare i tempi. Sei informatissimo!",
        messaggioErrato: "Non è quinquennale. La risposta era 'Quadriennale', per chi vuole fare veloce!"
    },
    {
        domanda: "4. Quale popolare assistente virtuale sul tuo smartphone utilizza l'Intelligenza Artificiale per rispondere alle tue domande o impostare sveglie?",
        rispostaCorretta: "siri", // Accettiamo anche 'alexa', 'google'
        messaggioCorretto: "Perfetto! Siri (o altri assistenti) è un chiaro esempio di AI nella vita di tutti i giorni.",
        messaggioErrato: "Non l'hai beccata. Pensa agli assistenti vocali come Siri o Alexa: usano l'AI per interagire con te."
    },
    {
        domanda: "5. Oltre alle lezioni teoriche, all'ITIS si usa molto la pratica. Quale scheda elettronica programmabile, molto popolare, si usa spesso nei laboratori per costruire piccoli progetti?",
        rispostaCorretta: "arduino",
        messaggioCorretto: "Wow! Arduino è la base per i progetti di programmazione fisica al Grassi. Complimenti!",
        messaggioErrato: "Sbagliato. La scheda più famosa per la prototipazione è Arduino. La imparerai qui!"
    },
    {
        domanda: "6. Quando un'AI viene addestrata con dati incompleti o sbagliati, può sviluppare dei 'pregiudizi'. Con quale termine tecnico si indica questo problema, fondamentale nell'etica dell'AI?",
        rispostaCorretta: "bias",
        messaggioCorretto: "Eccellente! Il 'Bias' è il pregiudizio che l'AI può avere. La tecnologia deve essere anche etica!",
        messaggioErrato: "Non è la risposta giusta. La parola tecnica per i 'pregiudizi' dell'AI è 'Bias'."
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Vecchio codice:
// const quizArea = document.getElementById('quiz-area');
// const startButton = document.getElementById('start-button');
// startButton.addEventListener('click', startQuiz);

// NUOVO CODICE (SOLUZIONE):
// Metti tutta la logica di avvio dentro un evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', (event) => {
    
    // Assicurati che tutte le costanti e le variabili siano dichiarate qui dentro:
    const quizArea = document.getElementById('quiz-area');
    const startButton = document.getElementById('start-button');
    
    // Aggiungi un listener per avviare il quiz al click del pulsante iniziale
    if (startButton) { // Aggiungiamo un controllo per sicurezza
        startButton.addEventListener('click', startQuiz);
    }

}); // Fine del blocco di codice sicuro.

// IL RESTO DEL TUO CODICE JAVASCRIPT (le funzioni 'startQuiz', 'showQuestion', ecc.)
// può restare invariato e deve essere subito dopo questo blocco nel file quiz.js.
// ... (startQuiz, showQuestion, checkAnswer, nextQuestion, showResults)

/**
 * Avvia il quiz resettando lo stato e mostrando la prima domanda.
 */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

/**
 * Mostra la domanda corrente nell'area quiz.
 */
function showQuestion() {
    if (currentQuestionIndex < quizData.length) {
        const item = quizData[currentQuestionIndex];
        
        quizArea.innerHTML = `
            <div class="question-box">
                <p class="question-text">${item.domanda}</p>
                <input type="text" id="user-answer" placeholder="Inserisci la parola chiave" onkeyup="if(event.keyCode === 13) checkAnswer()">
                <div id="feedback" class="feedback-message"></div>
                <button onclick="checkAnswer()">INVIA RISPOSTA</button>
            </div>
            <p style="text-align: right; color: #1e3c72; font-weight: bold;">Domanda ${currentQuestionIndex + 1} di ${quizData.length}</p>
        `;
        document.getElementById('user-answer').focus(); // Mette il focus sull'input
    } else {
        showResults();
    }
}

/**
 * Verifica la risposta dell'utente, mostra il feedback e procede alla domanda successiva.
 */
function checkAnswer() {
    const userInput = document.getElementById('user-answer').value.trim().toLowerCase();
    const item = quizData[currentQuestionIndex];
    const feedbackDiv = document.getElementById('feedback');
    
    // Lista di risposte accettate (per essere più flessibili)
    let acceptedAnswers = [item.rispostaCorretta];
    
    // Aggiungi alias per le risposte che potrebbero variare
    if (item.rispostaCorretta === "meccatronica") acceptedAnswers.push("aerospaziale");
    if (item.rispostaCorretta === "apprendimento") acceptedAnswers.push("ragionamento", "creatività");
    if (item.rispostaCorretta === "siri") acceptedAnswers.push("alexa", "google");
    
    const isCorrect = acceptedAnswers.includes(userInput);

    if (isCorrect) {
        score++;
        feedbackDiv.className = 'feedback-message feedback-correct';
        feedbackDiv.innerHTML = `✅ ${item.messaggioCorretto}`;
    } else {
        feedbackDiv.className = 'feedback-message feedback-wrong';
        feedbackDiv.innerHTML = `❌ ${item.messaggioErrato}`;
    }

    // Mostra il feedback
    feedbackDiv.style.display = 'block';

    // Disabilita l'input e il pulsante per evitare risposte doppie
    document.getElementById('user-answer').disabled = true;
    document.querySelector('button').innerText = 'PROSSIMA DOMANDA >>';
    document.querySelector('button').onclick = nextQuestion;
}

/**
 * Passa alla domanda successiva.
 */
function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

/**
 * Mostra la schermata finale dei risultati.
 */
function showResults() {
    let resultMessage = '';
    let emoji = '';
    
    if (score === quizData.length) {
        resultMessage = "Sei una leggenda! Punteggio perfetto. Ti aspettiamo al Grassi, il futuro è tuo!";
        emoji = '⭐';
    } else if (score >= quizData.length / 2) {
        resultMessage = "Ottimo lavoro! Conosci già bene il Grassi e il mondo AI. Ancora un piccolo sforzo!";
        emoji = '👍';
    } else {
        resultMessage = "Ben fatto! Hai ancora molto da imparare, ma non preoccuparti: l'ITIS Carlo Grassi è il posto giusto per te!";
        emoji = '🧠';
    }

    quizArea.innerHTML = `
        <h2 style="color: #ffcc00; font-size: 2.5em; margin-bottom: 10px;">QUIZ TERMINATO!</h2>
        <p style="font-size: 1.8em; font-weight: bold; margin-bottom: 30px; color: #1e3c72;">Il tuo punteggio è: ${score} su ${quizData.length} ${emoji}</p>
        <p style="font-size: 1.2em; color: #333;">${resultMessage}</p>
        <button onclick="startQuiz()">RIPROVA</button>
    `;
}
