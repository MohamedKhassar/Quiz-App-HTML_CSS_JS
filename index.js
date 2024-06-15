const quiz = [
  {
    question: "What is Node.js primarily used for?",
    answers: [
      "Front-end development",
      "Back-end development",
      "Mobile app development",
      "Database management",
    ],
    correct: "Back-end development",
  },
  {
    question: "Which of the following is a NoSQL database?",
    answers: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    correct: "MongoDB",
  },
  {
    question: "What does REST stand for in RESTful API?",
    answers: [
      "Real-time State Transfer",
      "Representational State Transfer",
      "Recursive State Transfer",
      "Random State Transfer",
    ],
    correct: "Representational State Transfer",
  },
  {
    question:
      "Which of the following is a popular JavaScript framework for building user interfaces?",
    answers: ["Laravel", "Django", "React", "Spring"],
    correct: "React",
  },
  {
    question: "What is the purpose of Docker in a development environment?",
    answers: [
      "To manage front-end libraries",
      "To run and manage containers",
      "To compile code",
      "To manage databases",
    ],
    correct: "To run and manage containers",
  },
  {
    question: "Which HTTP method is used to create a new resource?",
    answers: ["GET", "POST", "PUT", "DELETE"],
    correct: "POST",
  },
  {
    question: "What is the purpose of using Express in Node.js?",
    answers: [
      "To handle HTTP requests and responses",
      "To manage databases",
      "To compile JavaScript",
      "To create native mobile apps",
    ],
    correct: "To handle HTTP requests and responses",
  },
  {
    question: "Which of the following is a version control system?",
    answers: ["Git", "NPM", "Webpack", "Babel"],
    correct: "Git",
  },
  {
    question: "What does CRUD stand for in database operations?",
    answers: [
      "Create, Read, Update, Delete",
      "Create, Remove, Update, Delete",
      "Create, Read, Upload, Delete",
      "Create, Read, Update, Deploy",
    ],
    correct: "Create, Read, Update, Delete",
  },
  {
    question:
      "Which tool can be used for automating tasks in a development workflow?",
    answers: ["Webpack", "Gulp", "Jenkins", "All of the above"],
    correct: "All of the above",
  },
];

var i = 0;
let score = 0;
let container = document.querySelector(".container");

const fillQuestions = () => {
  const questions = quiz[i];
  container.innerHTML = `
  <div class="answer-card">
            <div class="question">
                <p class="quiz-title">question ${i + 1} of ${quiz.length}</p>
                <p class="quiz-question">${questions.question}</p>
            </div>
            <div class="answers">
            ${questions.answers
              .map(
                (an, index) =>
                  `
                <div class="answer" id="${an.replace(
                  /[^a-zA-Z0-9]/g,
                  ""
                )}" disabled onclick="checkAnswer('${an}')" key=${index}>
                    <div>
                        <label>${an}</label>
                    </div>
                </div>`
              )
              .join("")}
            </div>
            <div class="btn-section">
                <button class="next-btn" onclick="nextQuestion()">next question</button>
            </div>
            </div>
    `;
};

window.addEventListener("load", () => fillQuestions());

const fillScore = () => {
  container.innerHTML = `
    <div class="score">
            <div class="score-circle">
                <div class="progress-circle">
                    <svg viewBox="0 0 36 36" class="circular-chart">
                        <path class="circle-bg" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path class="circle" stroke-dasharray="${
                          (score / quiz.length) * 100
                        }, 100" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div class="percentage"><span>${score}</span>/${
    quiz.length
  }</div>
                </div>
                <div class="score-text">
                    <p>You answered</p>
                    <p>${score}/${quiz.length} questions</p>
                </div>
            </div>
            <div class="score-btns">
                <a href="/" class="exit-btn">Back to Home Page</a>
                <a href="/quiz.html" class="restart-btn">Restart The quiz</a>
            </div>
        </div>
    `;
};

const nextQuestion = () => {
  if (i < quiz.length - 1) {
    i++;
    fillQuestions();
  } else {
    i = 0;
    fillScore();
  }
};

const checkAnswer = (answer) => {
  let correct = document.querySelector(
    `#${quiz[i].correct.replace(/[^a-zA-Z0-9]/g, "")}`
  );
  let wrong = document.querySelector(`#${answer.replace(/[^a-zA-Z0-9]/g, "")}`);
  const questions = quiz[i];

  if (answer == quiz[i].correct) {
    score++;
  } else {
    wrong.innerHTML += "<img src=img/x.svg alt=``>";
    wrong.classList.replace("answer", "wrong");
  }
  for (let index = 0; index < questions.answers.length; index++) {
    let disabled = document.querySelector(
      `#${questions.answers[index].replace(/[^a-zA-Z0-9]/g, "")}`
    );
    console.log(disabled);
    disabled.removeAttribute("onclick");
    disabled.style.cursor = "not-allowed";
  }
  console.log(correct);
  correct.innerHTML += "<img src=img/check.svg alt=``>";
  correct.classList.replace("answer", "correct");
};
