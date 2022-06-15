class Question {
    constructor(question, option1, option2, option3, answer) {
        this.question = question;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.answer = answer;
    }
}

let idx = 0;
let questions = [];

function saveQuestions(next) {
    if(!next && idx <= 0){
        alert("End reached!!!");
        return;
    }
    if(!next) {
        idx -= 1;
        clearAndReuploadQuestions(next);
        return;
    }
    var questionText = document.querySelector("#question").value;
    var option1 = document.querySelector("#option1").value;
    var option2 = document.querySelector("#option2").value;
    var option3 = document.querySelector("#option3").value;
    let option = document.querySelector("input[name='option']:checked");
    if(questionText.length == 0 || option1.length == 0 || option2.length == 0 || option3.length == 0 || option == null) {
        alert("Please fill out all fields to store the Question!!!");
        return;
    }
    let answer = parseInt(option.getAttribute("ans"));
    let question = new Question(questionText, option1, option2, option3, answer)
    questions[idx] = question;
    idx += next?1:-1;
    clearAndReuploadQuestions(next);
    console.log(questions, idx) 
}

function clearAndReuploadQuestions(next) {
    clearAll();
    console.log(idx);
    if((!next && idx <0 )) {
        alert("End limit reached");
        return;
    } else if(idx >= questions.length) return;
    document.querySelector("#question").value = questions[idx].question;
    document.querySelector("#option1").value = questions[idx].option1;
    document.querySelector("#option2").value = questions[idx].option2;
    document.querySelector("#option3").value = questions[idx].option3;
    document.querySelectorAll("input[name='option']")[questions[idx].answer-1].checked = true;
}

function clearAll() {
    document.querySelector("#question").value = "";
    document.querySelector("#option1").value = "";
    document.querySelector("#option2").value = "";
    document.querySelector("#option3").value = "";
    for(let elem of document.querySelectorAll("input[name='option']:checked")) elem.checked = false;
}

function submitQuestions() {
    fetch("/submitQuestions", {
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        method:"POST",
        body: JSON.stringify(questions)
    }).then((res) => res.json()).then((res)=>{
        console.log(res);
    })
}