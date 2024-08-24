const cells = document.querySelectorAll('.cell');
const questionContainer = document.getElementById('questionContainer');
const questionText = document.getElementById('questionText');
const answerInput = document.getElementById('answerInput');
const submitAnswer = document.getElementById('submitAnswer');

let currentPlayer = 'X';
let board = Array(16).fill(null);
let currentQuestionIndex = null;
let selectedCellIndex = null;

// Generate division questions with answers
function generateDivisionQuestions() {
    const questions = [];
    for (let i = 3; i <= 9; i++) { // Pembagi antara 3 sampai 9
        for (let j = 10; j < 100; j++) { // Pembilang antara 10 sampai 99
            if (j % i === 0 && j / i > 1) { // Hasil bagi lebih dari 1
                questions.push({
                    question: `${j} : ${i}`, // Mengganti "/" dengan ":"
                    answer: j / i
                });
            }
        }
    }
    return questions;
}

const questions = generateDivisionQuestions();

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] || questionContainer.classList.contains('visible')) {
        return;
    }

    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    questionText.textContent = questions[currentQuestionIndex].question;
    questionContainer.classList.add('visible');
    questionContainer.classList.remove('hidden');
    answerInput.focus();
    answerInput.value = '';
    selectedCellIndex = index;
}

function handleAnswerSubmission() {
    const answer = parseInt(answerInput.value);

    if (answer === questions[currentQuestionIndex].answer) {
        board[selectedCellIndex] = currentPlayer;
        cells[selectedCellIndex].textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        questionContainer.classList.remove('visible');
        questionContainer.classList.add('hidden');
        checkWinner();
    } else {
        alert('Jawaban salah! Giliran berikutnya.');
        questionContainer.classList.remove('visible');
        questionContainer.classList.add('hidden');
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleAnswerSubmission();
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c, d] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d]) {
            alert(`Pemain ${board[a]} menang!`);
            resetGame();
            return;
        }
    }

    if (board.every(cell => cell)) {
        alert('Permainan seri!');
        resetGame();
    }
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
submitAnswer.addEventListener('click', handleAnswerSubmission);
answerInput.addEventListener('keypress', handleKeyPress);