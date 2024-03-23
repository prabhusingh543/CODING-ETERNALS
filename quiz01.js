



//===================================QUIZ START================================================//

const questions = [
    {
        question: "Last week I ____________ three pizzas.",
        optionA: "ate",
        optionB: "have eaten",
        optionC: "had eaten",
        optionD: "would eat",
        correctOption: "optionA"
    },

    {
        question: "I ___________ the piano when I was ten years old.",
        optionA: "have played",
        optionB: "played",
        optionC: "will play",
        optionD: "would play",
        correctOption: "optionB"
    },

    {
        question: "When I reached the supermarket, it ______________.",
        optionA: "have already closed",
        optionB: "had already closed",
        optionC: "will already close",
        optionD: "has already closed",
        correctOption: "optionB"
    },

    {
        question: "I __________ to Paris once when I was a child.",
        optionA: "have gone",
        optionB: "was going",
        optionC: "went",
        optionD: "would be going",
        correctOption: "optionC"
    },

    {
        question: "The class ________________ when I arrived.",
        optionA: "will already start",
        optionB: "have already started",
        optionC: "had already started",
        optionD: "has already started",
        correctOption: "optionC"
    },

    {
        question: "When I went back to my hometown a few years ago, I found that a lot of changes ______.",
        optionA: "had taken place",
        optionB: "have taken place",
        optionC: "are taken place",
        optionD: "will be taken place",
        correctOption: "optionA"
    },

    {
        question: "James and I ________________ you in a long time. How have you been?",
        optionA: "was seen",
        optionB: "hadn't seen",
        optionC: "haven't seen",
        optionD: "hasn't seen",
        correctOption: "optionC"
    },

    {
        question: "I _________ ice-cream in evening every day. ",
        optionA: "like",
        optionB: "liked",
        optionC: "am liking",
        optionD: "have been liking",
        correctOption: "optionA"
    },

    {
        question: "I'm sorry the house is not available any longer. It ______ to a timber company.",
        optionA: "is sold",
        optionB: "will be sold",
        optionC: "have been sold",
        optionD: "has been sold",
        correctOption: "optionD"
    },

    {
        question: "Passengers ______ to smoke on the train.",
        optionA: "are not allowed",
        optionB: "had not allowed",
        optionC: "will not alow",
        optionD: "are not allowed",
        correctOption: "optionD"
    }

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}

//=================================QUIZ END ===================================================//