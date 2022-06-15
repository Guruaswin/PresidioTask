class Question {
    constructor(question, option1, option2, option3, answer) {
        this.question = question;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.answer = answer;
    }
}

var questions = []
var idx = 0;

document.body.style.display = "none";

function loadQuestions(next)  {
    if(next != null && ((!next && idx <= 0) || (next && idx == questions.length))) {
        alert("End Limit Reached...");
        return;
    }
    if(next != null && !next) idx -= 1;
    document.querySelector("#question").innerText = questions[idx].question;
    document.querySelector("#option1").innerText = questions[idx].option1;
    document.querySelector("#option2").innerText = questions[idx].option2;
    document.querySelector("#option3").innerText = questions[idx].option3;
    if(next) idx += 1;
}

function gatherQuestions() {
    fetch("/getQuestions").then((res)=>res.json()).then((res)=> {
        for(question of res["data"]) {
            questions.push(new Question(question[0], question[1], question[2], question[3]))
        }
        console.log(res["data"]);
        loadQuestions(null);
        document.body.style.display = "block";
    })
}

gatherQuestions();