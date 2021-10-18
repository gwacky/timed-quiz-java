var startButton = $("#start-btn");
var timer = $("#timer");
var timeInterval = 0;
var timeLeft = 60;
var penalty = 10;
var score = 0;
var questionsDiv = $("#questionsDiv");
var questionIndex = 0;
var unorderedList = $("#unorderedList");
var highScore = $("#highscores");
var clear = $("#clear");
var goBack = $("#goBack");
var startScreen = $("#start-screen")
var generator = $("#generator");
var finish = $("#finish");
var gameActive = false;
var yourScore = $("#yourScore");

// timer
var countdown = function() {
    var timeTracker = setInterval(function(){
        timer.text(timeLeft);

        if (timeLeft == 0 || !gameActive) {
            clearInterval(timeTracker);
            finalScore();
        } else {
            timeLeft = timeLeft - 1;
        }
    }, 1000);
};

// questions on quiz
var questions = [
    {
        title: "How do you write an IF statement in JavaScript?",
        choices: [
            {question:"if i = 5 or else", answer: false},
            {question: "if i = 5 then", answer: false},
            {question: "if i == 5 then", answer: false},
            {question: "if(i === 5)", answer: true}]
    },
    {
        title: "How does a FOR loop start?",
        choices: [
            {question: "for (i = 0; i <= 5; i++", answer: true}, 
            {question: "for (i <= 5; i++)", answer: false}, 
            {question: "for i = 1 to 5", answer: false},
            {question: "for (i = 0; i <=5)", answer: false}]
    },
    {
        title: "How do you write 'Hello World' in an alert box?",
        choices: [
            {question:"msgBoc('Hello World')", answer: false},
            {question: "alertBox('Hello World')", answer: false},
            {question: "alert('Hello World')", answer: true},
            {question: "msg('Hello World)", answer: false}]
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: [
            {question: "strings", answer: false}, 
            {question: "booleans", answer: false}, 
            {question: "alerts", answer: true},
            {question: "numbers", answer: false}]
    },
    {
        title: "Where is the correct place to insert JavaScript?",
        choices: [
            {question: "the <head>", answer: false},
            {question: "the bottom of the <body>", answer: true},
            {question: "anywhere in the HTML", answer: false},
            {question: "anywhere in the stylesheet", answer: false}]
    },
    {
        title: "How do you call a function called myFunction?",
        choices: [
            {question: "myFunction()", answer: true},
            {question: "call myFunction()", answer: false},
            {question: "call function myFunction", answer: false},
            {question: "call select myFunction", answer: false}],

        answer: "myFunction()"
    }
];


// rendering the questions and answers
var generateQuestions = function() {

    questionsDiv.text(questions[questionIndex].title);

    unorderedList.text("");

    // loop for the answers and button selector
    for (var i = 0; i < questions[questionIndex].choices.length; i++) {
        var answerBtn = document.createElement("button");
        var li = document.createElement("li");


        var answers = questions[questionIndex].choices;

        answerBtn.innerHTML= answers[i].question;
        answerBtn.classList.add("answer-btn", "btn")
        answerBtn.setAttribute("data-answer", answers[i].answer);
        li.append(answerBtn);
        unorderedList.append(li);
    }
    $(".answer-btn").on("click", function(e) {
        var answer = e.currentTarget.dataset.answer;

        if (answer == "false") {
            timeLeft -= 10;
        }

        if (questionIndex !== questions.length - 1) {
            questionIndex++;
            generateQuestions();
        } else {
            generator.toggleClass("d-none");
            finish.toggleClass("d-none");
            gameActive = false;
        }
    });
};

var finalScore = function() {
     // user can save and initial final score
     var createLabel = document.createElement("label");
     createLabel.innerHTML= "Enter your initials: ";
 
     yourScore.append(createLabel);

    // initials
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    
    yourScore.append(createInput);

    // submit button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.innerHTML = "Submit";
    
    yourScore.append(createSubmit);

    // captures and saves initials/score
    createSubmit.addEventListener("click", function(event) {
        var initials = createInput.value;

        if (initials === null) {
            alert("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeLeft
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
            window.location.href = "./highScores.html"
        }
    })
};

$("li").on("click", function() {
    if (questionIndex !== questions.length - 1) {
        generateQuestions();
        questionIndex++;
    } else {
        generator.toggleClass("d-none");
        finish.toggleClass("d-none");
    }
});

startButton.on("click", function() {
    startScreen.toggleClass("d-none");
    generator.toggleClass("d-none");
    gameActive = true;
    countdown();
    generateQuestions();
})