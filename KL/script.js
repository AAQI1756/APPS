const numbers = {
  1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five",
  6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten",
  11: "Eleven", 12: "Twelve", 13: "Thirteen", 14: "Fourteen",
  15: "Fifteen", 16: "Sixteen", 17: "Seventeen",
  18: "Eighteen", 19: "Nineteen", 20: "Twenty"
};

const bgColors = [
  "#ff9a9e", "#a1c4fd", "#fbc2eb",
  "#84fab0", "#fccb90", "#d4fc79"
];

let score = 0;
let questionCount = 0;
const totalQuestions = 10;
let currentNumber = 0;

function newQuestion() {
  if (questionCount >= totalQuestions) {
    showResult();
    return;
  }

  questionCount++;
  document.getElementById("counter").innerText =
    `${questionCount} / ${totalQuestions}`;

  document.body.style.background =
    bgColors[Math.floor(Math.random() * bgColors.length)];

  document.getElementById("optionsBox").innerHTML = "";

  currentNumber = Math.floor(Math.random() * 20) + 1;
  document.getElementById("numberBox").innerText = currentNumber;

  let correctWord = numbers[currentNumber];
  let options = [correctWord];

  while (options.length < 4) {
    let rand = numbers[Math.floor(Math.random() * 20) + 1];
    if (!options.includes(rand)) options.push(rand);
  }

  options.sort(() => Math.random() - 0.5);

  options.forEach(word => {
    let btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = word;
    btn.onclick = () => checkAnswer(btn, word);
    document.getElementById("optionsBox").appendChild(btn);
  });
}

function checkAnswer(button, selected) {
  document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);

  if (selected === numbers[currentNumber]) {
    button.classList.add("correct");
    document.getElementById("correctSound").play();
    document.getElementById("mascot").innerText = "😄🐻";
    score++;
  } else {
    button.classList.add("wrong");
    document.getElementById("wrongSound").play();
    document.getElementById("mascot").innerText = "😢🐻";
  }

  setTimeout(() => {
    document.getElementById("mascot").innerText = "🐻";
    newQuestion();
  }, 900);
}

function showResult() {
  document.getElementById("numberBox").style.display = "none";
  document.getElementById("optionsBox").style.display = "none";
  document.getElementById("counter").style.display = "none";

  let emoji = "😢";
  if (score >= 8) {
    emoji = "🎉😄";
    document.getElementById("winSound").play();
    confettiEffect();
  } else if (score >= 5) {
    emoji = "😊";
  }

  document.getElementById("emoji").innerText = emoji;
  document.getElementById("scoreText").innerText =
    `You scored ${score} out of ${totalQuestions}`;

  document.getElementById("resultBox").style.display = "block";
}

function confettiEffect() {
  for (let i = 0; i < 40; i++) {
    let c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background =
      bgColors[Math.floor(Math.random() * bgColors.length)];
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3000);
  }
}

function restartGame() {
  score = 0;
  questionCount = 0;

  document.getElementById("numberBox").style.display = "flex";
  document.getElementById("optionsBox").style.display = "grid";
  document.getElementById("resultBox").style.display = "none";
  document.getElementById("counter").style.display = "block";

  newQuestion();
}

newQuestion();
