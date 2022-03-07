const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];
let gameStarted;
// Starting Quiz
const startCard = document.querySelector("#startCard");
const startButton = startCard.querySelector("button");
let countdownInterval;
startButton.addEventListener("click", () => {
  // Let remove startup card first;
  gameStarted = document.body
    .getElementsByTagName("main")[0]
    .removeChild(startCard);
  displayQuestion();
  countdownInterval = setInterval(countdown, 1000);
  questionCard.style.display = "flex";
});

//  Now add question in question card;
const questionCard = document.querySelector("#question");

// lets grab some elements before adding question on it
const h2 = questionCard.querySelector(".card-header h2");
const questionOptions = questionCard.querySelector(".card-body ul");
const statement = questionCard.querySelector(".card-footer span");
const allDoneCard = document.querySelector("#allDoneCard");
const timeBtn = document.querySelector("#time");
const submitScoreBtn = allDoneCard.querySelector(".card-footer button");
const userNameInp = allDoneCard.querySelector(".card-footer input");
const leaderboard = document.querySelector("#leaderboard");
const leaderboardCard = document.querySelector("#leaderboardCard");
const leaderboardCardList = leaderboardCard.querySelector("ol");
const leaderboardGoBackBtn = leaderboardCard.querySelector(
  ".card-footer > :first-child"
);
const leaderboardClearBtn = leaderboardCard.querySelector(
  ".card-footer > :last-child"
);

let score = 50;
function countdown() {
  timeBtn.innerText = score;
  if (score <= 0) {
    clearInterval(countdownInterval);
    console.log("game over");
    return;
  }
  score -= 1;
  console.log(score);
}

function displayQuestion() {
  // now add them a question
  h2.innerText = questions[i].questionText;

  let element = ``;
  questions[i].options.forEach((option) => {
    element += `<li onclick="isCorrect(questions[i],event)">${option}</li>`;
    questionOptions.innerHTML = element;
  });
}

function isCorrect(question, e) {
  if (e.target.innerText == question.answer) {
    statement.innerText = "Correct";
  } else {
    statement.innerText = "InCorrect";
    if (score <= 10) {
      score = 0;
    } else {
      score -= 10;
    }
  }
  showNext();
  displayQuestion();
}

// This function is for showing next question after current question answer is provided!
let i = 0;
function showNext() {
  if (i >= questions.length - 1) {
    clearInterval(countdownInterval);
    timeBtn.innerText = score;
    i = 0;
    allDoneCard.querySelector(
      ".card-body p"
    ).innerText = `You final score is ${score}`;
    questionCard.style.display = "none";
    allDoneCard.style.display = "flex";
    return;
  }
  i += 1;
}

submitScoreBtn.addEventListener("click", () => {
  let userName = userNameInp.value;
  if (userName != "") {
    userNameInp.value = "";
    let highscores = localStorage.getItem("highscores");
    if (highscores != null) {
      let highscoresArr = JSON.parse(highscores);
      console.log(highscoresArr);
      let data = new Object();
      data["userName"] = userName;
      data["score"] = score;
      console.log(data);
      highscoresArr.push(data);
      console.log(highscoresArr);
      highscoresArr = JSON.stringify(highscoresArr);
      localStorage.setItem("highscores", highscoresArr);
    } else {
      localStorage.setItem(
        "highscores",
        `[{"userName":"${userName}", "score":${score}}]`
      );
    }
    window.location.reload();
  } else {
    console.log("Enter Initals First");
  }
});

leaderboard.addEventListener("click", () => {
  console.log(gameStarted);
  if (!gameStarted) {
    startCard.style.display = "none";
    let items = "";
    let highscores = localStorage.getItem("highscores");
    if (highscores != null) {
      let highscoresArr = JSON.parse(highscores);
      highscoresArr.sort((a, b) => b.score - a.score);
      console.log(highscoresArr);

      highscoresArr.forEach((obj, index) => {
        if (index <= 9) {
          items += `<li>${obj.userName} - ${obj.score}</li>`;
        }
      });
      leaderboardCardList.innerHTML = items;
    }
    leaderboardCard.style.display = "flex";
  } else {
  }
});
leaderboardGoBackBtn.addEventListener("click", () => {
  leaderboardCard.style.display = "none";
  startCard.style.display = "flex";
});
leaderboardClearBtn.addEventListener("click", () => {
  localStorage.clear();
  leaderboardCardList.innerHTML = "Nothing here...";
});
