const questions = [
  {
    qstn: "The paper we use for voting is called what ______?",
    options: [
      "Apex Paper",
      "Higher Education",
      "80 Leaves",
      "Ballot",
      "Eection Paper",
    ],
    answer: 3,
  },
  {
    qstn: "Another name for VOTERS is?",
    options: [
      "Elect Elect",
      "Electorate",
      "Executioner",
      "Elevators",
      "Electorals",
    ],
    answer: 1,
  },
  {
    qstn: "How many colors does the Nigerian Flag have?",
    options: [
      "3",
      "2",
      "Many",
      "Plenty",  
      "why should I know?", 
    ],
    answer: 1,
  },
  {
    qstn: "What is your favorite channel on the Startdotng Workspace?",
    options: [
      "#Random", 
      "#General", 
      "#Announcement", 
      "#Class", 
      "#Game"],
    answer: 2,
  },
  {
    qstn: "______ can be used as pet in the house?",
    options: [
      "Dogs", 
      "Goats", 
      "Cattle", 
      "Goats", 
      "Man"],
    answer: 0,
  },
];

let questionTracker = 1;
let correctAnswers = 0;

const questionContainer = document.querySelector(".question");
let questionIndex = 0;
let index = 0;

function load(questionObject, index) {
  if (index > 0) {
    const attemptedQuestion = document.getElementById(`question_${index - 1}`);
    attemptedQuestion.innerHTML = "";
  }

  const attemptedQuestionCount = document.getElementById("attemptedQuestions");
  attemptedQuestionCount.innerText = `Question ${index + 1}`;

  const question = document.createElement("div");
  questionContainer.appendChild(question);
  question.setAttribute("id", `question_${index}`);
  question.setAttribute("class", "options");
  question.innerHTML = questionObject.qstn;

  const questionOptions = document.createElement("div");

  questionObject.options.forEach((objOption, optionIndex) => {
    const optionLabel = document.createElement("label");
    optionLabel.setAttribute("for", `question_${index}_option_${optionIndex}`);
    optionLabel.setAttribute("class", "questionOption");
    optionLabel.innerHTML = objOption + "<br>";

    const option = document.createElement("input");
    option.setAttribute("type", "radio");
    option.setAttribute("name", `question_${index}_option`);
    option.setAttribute("id", `question_${index}_option_${optionIndex}`);
    option.setAttribute("class", "questionButton");
    option.onclick = function() {markQuestion(this)}

    questionOptions.appendChild(option);
    questionOptions.appendChild(optionLabel);
    questionOptions.setAttribute("class", "optionDiv")
  });
  question.appendChild(questionOptions);
}

function nextButton() {
  if (questionTracker < questions.length) {
    load(questions[questionTracker], questionTracker);
    questionTracker += 1;
  } else {
    // Show final score
    const questionNode = document.getElementsByClassName("question");
    if(correctAnswers === questions.length) {
      questionNode[0].innerHTML = `<center><small class="doingwell">Fantabulous, OOIN....</small><h1>${correctAnswers}</h1><small>Here is your score</small></center>`;
      return;
    }
    if(correctAnswers >= questions.length/2) {
      questionNode[0].innerHTML = `<center><small class="doingwell">You are doing well... Ooin</small><h1>${correctAnswers}</h1><small>Here is your score</small></center>`;
    } else {
      questionNode[0].innerHTML = `<center><small class="notdoingwell">You are not doing well, but still... Ooin</small><h1>${correctAnswers}</h1><small>Here is your score</small></center>`;
    }
  }
}

function markQuestion(option) {
  // Disable all other options
  const allOptionsAttribute = option.getAttribute("name");
  const allOptions = document.getElementsByName(allOptionsAttribute);

  allOptions.forEach(allOpt => {
    allOpt.setAttribute("disabled", true)
  })

  option = option.getAttribute("id")
  const questionOptionId = option.split("_");
  const questionId = questionOptionId[1];
  const optionId = questionOptionId[3];

  const question = questions[questionId];
  const optionNode = document.getElementById(option).nextSibling;
  if(question.answer === parseInt(optionId)) {
    const correctSoFar = document.getElementById("correctSoFar");
    correctSoFar.innerText = ++correctAnswers;
    optionNode.setAttribute("class", "questionOption correct")
  } else {
    optionNode.setAttribute("class", "questionOption wrong")
    const correctOption = document.getElementById(`question_${questionId}_option_${question.answer}`).nextSibling
    correctOption.setAttribute("class", "questionOption correct")
  }
}

window.onload = function () {
  const questionCount = document.getElementById("questionTotal");
  questionCount.innerHTML = ` of ${questions.length}`;

  load(questions[0], 0);
};
