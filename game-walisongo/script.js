const waliData = [
    { name: "Sunan Ampel", img: "img/ampel.jpg" },
    { name: "Sunan Bonang", img: "img/bonang.jpg" },
    { name: "Sunan Drajat", img: "img/drajat.jpg" },
    { name: "Sunan Giri", img: "img/giri.jpg" },
    { name: "Sunan Gresik", img: "img/gresik.jpg" },
    { name: "Sunan Gunung Jati", img: "img/gunungjati.jpg" },
    { name: "Sunan Kalijaga", img: "img/kalijaga.jpg" },
    { name: "Sunan Kudus", img: "img/kudus.jpg" },
    { name: "Sunan Muria", img: "img/muria.jpg" }
];

let currentQuestions = [];
let currentIndex = 0;
let score = 0;

function startGame() {
    score = 0;
    currentIndex = 0;
    generateQuestions();
    showQuestion();
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
}

function generateQuestions() {
    currentQuestions = [];
    // Buat pola 5 Benar (true) dan 5 Salah (false)
    let patterns = [true, true, true, true, true, false, false, false, false, false];
    patterns = patterns.sort(() => Math.random() - 0.5);

    for (let isCorrect of patterns) {
        let randomWali = waliData[Math.floor(Math.random() * waliData.length)];
        let displayName = "";

        if (isCorrect) {
            displayName = randomWali.name;
        } else {
            let wrongWali;
            do {
                wrongWali = waliData[Math.floor(Math.random() * waliData.length)];
            } while (wrongWali.name === randomWali.name);
            displayName = wrongWali.name;
        }

        currentQuestions.push({
            image: randomWali.img,
            name: displayName,
            answer: isCorrect
        });
    }
}

function showQuestion() {
    const q = currentQuestions[currentIndex];
    document.getElementById('walisongo-img').src = q.image;
    document.getElementById('walisongo-name').innerText = q.name;
    document.getElementById('question-number').innerText = `Soal ${currentIndex + 1} / 10`;
    document.getElementById('score-display').innerText = `Skor: ${score}`;
}

function checkAnswer(playerChoice) {
    if (playerChoice === currentQuestions[currentIndex].answer) {
        score += 10;
    }

    currentIndex++;
    if (currentIndex < 10) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    
    // Pastikan ID ini sama dengan yang ada di HTML
    document.getElementById('final-score-value').innerText = score;
    
    let msg = "";
    if (score >= 80) msg = "Luar biasa! Kamu sangat mengenal Wali Songo.";
    else if (score >= 50) msg = "Bagus! Terus tingkatkan pengetahuanmu.";
    else msg = "Ayo belajar lagi tentang sejarah Wali Songo!";
    
    document.getElementById('result-message').innerText = msg;
}

function resetGame() {
    startGame();
}