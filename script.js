const quizData = [
    {
      question: "What is the capital of France?",
      choices: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: "Paris",
    },
    {
      question: "Who is the founder of Microsoft?",
      choices: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
      correct: "Bill Gates",
    },
    {
      question: "What does HTML stand for?",
      choices: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Tool Multi Language",
        "None of the above",
      ],
      correct: "Hyper Text Markup Language",
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const feedbackElement = document.getElementById("feedback");
  const scoreElement = document.getElementById("score");
  const submitButton = document.getElementById("submit");
  
  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
  
    currentQuestion.choices.forEach((choice) => {
      const li = document.createElement("li");
      li.innerHTML = `<input type="radio" name="answer" value="${choice}" id="${choice}">
                      <label for="${choice}">${choice}</label>`;
      choicesElement.appendChild(li);
    });
  }
  
  function getSelectedAnswer() {
    const radios = document.querySelectorAll('input[name="answer"]');
    let selectedAnswer = null;
    radios.forEach((radio) => {
      if (radio.checked) {
        selectedAnswer = radio.value;
      }
    });
    return selectedAnswer;
  }
  
  submitButton.addEventListener("click", () => {
    const selectedAnswer = getSelectedAnswer();
    if (!selectedAnswer) {
      feedbackElement.textContent = "Please select an answer!";
      feedbackElement.style.color = "red";
      return;
    }
  
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct) {
      feedbackElement.textContent = "Correct!";
      feedbackElement.style.color = "green";
      score++;
    } else {
      feedbackElement.textContent = `Wrong! The correct answer is ${currentQuestion.correct}.`;
      feedbackElement.style.color = "red";
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      setTimeout(() => {
        feedbackElement.textContent = "";
        loadQuestion();
      }, 1000);
    } else {
      setTimeout(() => {
        quizContainer.innerHTML = `
          <h2>Your final score is ${score}/${quizData.length}</h2>
          <p>Thank you for playing!</p>
          <button onclick="location.reload()">Restart Quiz</button>
        `;
      }, 1000);
    }
  });
  
  loadQuestion();
  