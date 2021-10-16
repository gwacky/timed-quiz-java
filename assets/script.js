var startButton = document.querySelector("#start-btn");
var timer = document.querySelector("#timer");
var timeInterval = 0;
var timeLeft = 60;
var penalty = 10;
var score = 0;
var questionsDiv = document.querySelector("#questionsDiv");
var questionIndex = 0;
var unorderedList = document.querySelector("#unorderedList");
var highScore = document.querySelector("#highscores");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// questions on quiz
var questions = [
    {
        title: "How do you write an IF statement in JavaScript?",
        choices: ["if i = 5 or else", "if i = 5 then", "if i == 5 then", "if(i === 5)"],
        answer: "if(i == 5)"
    },
    {
        title: "How does a FOR loop start?",
        choices: ["for (i = 0; i <= 5; i++", "for (i <= 5; i++)", "for i = 1 to 5", "for (i = 0; i <=5)"],
        answer: "for (i = 0; i <= 5; i++"
    },
    {
        title: "How do you write 'Hello World' in an alert box?",
        choices: ["msgBoc('Hello World')", "alertBox('Hello World')", "alert('Hello World')", "msg('Hello World)"],
        answer: "alert('Hello World')"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "Where is the correct place to insert JavaScript?",
        choices: ["the <head>", "the bottom of the <body>", "anywhere in the HTML", "anywhere in the stylesheet"],
        answer: "the bottom of the <body>"
    },
    {
        title: "How do you call a function called myFunction?",
        choices: ["myFunction()", "call myFunction()", "call function myFunction", "call select myFunction"],
        answer: "myFunction()"
    }
];

// when user clicks start buttion---
startButton.addEventListener("click", function() {
    // a timer starts
    if (timeInterval === 0) {
        timeInterval = setInterval(function() {
            timeLeft--;
            timer.textContent = timeLeft;
            // if there is no time left, time's up
            if (timeLeft <= 0) {
                clearInterval(timeInterval);
                timer.textContent = "Time's up!";
            }
        }, 1000)
    }
    render(questionIndex);
});

// renders questions and associated choices onto page
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    unorderedList.innerHTML = "";
    // presenting the questions
    for (var i = 0; i < questions.length; i++) {
        var userQuestions = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestions;
    }
    // changing choices for specific question
    userChoices.forEach(function(newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(unorderedList);
        unorderedList.addEventListener("click", (compare));
    })
    startButton.style.visability = "hidden";
};

// compares user choice with correct answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        // correct response
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!"
        } 
        // incorrect response
        else {
            // incorrect response takes 10 seconds from timer
            timeLeft = timeLeft - penalty;
            createDiv.textContent = "Incorrect. The correct answer is " + questions[questionIndex].answer;
        }
    }

    // what number question the user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // allDone function will append last page with user score
        allDone();
        createDiv.textContent = "You got " + score + "/" + questions.length + " correct.";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
};

allDone = function() {
    questionsDiv.innerHTML = "";
    startButton.style.visability = "hidden";

    // header
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Finish!";
    questionsDiv.appendChild(createH1);

    // paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

    // when all questions answered or time hits 0
    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var createP2 = document.createElement("p");
        clearInterval(timeInterval);
        createP.textContent = "Your final score is " + timeRemaining;
        questionsDiv.appendChild(createP2)
    }

    // user can save and initial final score
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // initials
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "Submit";
    
    questionsDiv.appendChild(createSubmit);

    // captures and saves initials/score
    createSubmit.addEventListener("click", function(event) {
        var initials = createInput.value;

        if (initials === null) {
            alert("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            // store initials and score to localStorage
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // travels to final page
            window.location.href = "highScores.html"
        }
    })
}