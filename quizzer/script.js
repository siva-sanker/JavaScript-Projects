const questions=[
    {
        question:"what is the capital of France?",
        answers:[
            {text:"Berlin",correct:false},
            {text:"Paris",correct:true},
            {text:"Beirut",correct:false},
            {text:"London",correct:false}
        ]
    },
    {
        question:"who are you?",
        answers:[
            {text:"Aaaa!",correct:true},
            {text:"I am Me",correct:false},
            {text:"I am You",correct:false},
            {text:"I am You",correct:false},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML='Next';
    // nextButton.style.display="none";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    questionElement.innerText=currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerText=answer.text;
        button.classList.add("btn");
        button.addEventListener("click",()=>selectAnswer(answer));
        answerButton.appendChild(button);
    });
}

function resetState(){
    nextButton.style.display='none';
    answerButton.innerHTML='';
}

function selectAnswer(answer){
    if(answer.correct){
        score ++;
    }
    nextButton.style.display='block';
}

nextButton.addEventListener("click",()=>{
    if(nextButton.innerHTML === 'Restart Quiz'){
        startQuiz();
    } else {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }
});

function showScore(){
    resetState();
    questionElement.innerText=`You scored: ${score} out of ${questions.length}!`;
    nextButton.innerHTML='Restart Quiz';
    nextButton.style.display="block";
    // nextButton.addEventListener("click",startQuiz);
}

startQuiz();