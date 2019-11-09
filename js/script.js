let inject = document.getElementById('inject');
let diff="";
function injectHTML(url ) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = this.responseText;
            if (url === "../titlePage.html") {
                loadTitlePage(myArr);
            } else if (url === "../mainPage.html") {
                loadMainPage(myArr);
            } else if (url === "../options.html") {
                loadOptions(myArr);
            } else if (url === "../instructions.html") {
                loadInstructions(myArr);
            } else if (url === "../gamePage.html") {
                loadGamePage(myArr);
            }
        }
      
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

let totalQuestions = 20;

let easyQ = [];
let medQ = [];
let godQ = [];
function loadQuestions(url) {
    
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            
            allQuestions(myArr);
        }
        
    };
    xmlhttp.open("GET", url, true);
        xmlhttp.send();
    function allQuestions(info) {
       // console.log(info);
        for (let i = 0; i < info.esQ.length; i++) {
            let nFO = {
                "q" : info.esQ[i].q,
                "a1" : info.esQ[i].a1,
                "a2" : info.esQ[i].a2,
                "a3" : info.esQ[i].a3,
                "a4" : info.esQ[i].a4,
                "cA" : info.esQ[i].cA
            };
            easyQ.push(nFO);
            // console.log(info);
        }
        for (let i = 0; i < medQ.length; i++) {
            let nFO = {
                "q" : info.medQ[i].q,
                "a1": info.medQ[i].a1,
                "a2": info.medQ[i].a2,
                "a3": info.medQ[i].a3,
                "a4": info.medQ[i].a4,
                "cA": info.medQ[i].cA
            };
            medQ.push(nFO);
        }
        for (let i = 0; i < medQ.length; i++) {
            let nFO = {
                "q" : info.gowQ[i].q,
                "a1": info.gowQ[i].a1,
                "a2": info.gowQ[i].a2,
                "a3": info.gowQ[i].a3,
                "a4": info.gowQ[i].a4,
                "cA": info.gowQ[i].cA
            };
            godQ.push(nFO);
        }
    }
    //console.log(easyQ);
}
function loadTitlePage(info) {
    inject.innerHTML = info;
    let start = document.getElementById('start');
    start.addEventListener('click', function(info){
        injectHTML("../mainPage.html");
    });
};
function loadMainPage(info){
    inject.innerHTML = info;
    let ezMode = document.getElementById("ezBtn");
    let medMode = document.getElementById("medBtn");
    let gowBtn = document.getElementById('secretBtn');
    let options = document.getElementById("options");

    ezMode.addEventListener('click', function(info){
        diff="easy";
        injectHTML("../instructions.html");
        console.log(easyQ);
    })
    medMode.addEventListener('click', function(info){
        injectHTML("../instructions.html");
        console.log(medQ);
    });
    gowBtn.addEventListener('click', function(info){
        injectHTML("../instructions.html");
        console.log(godQ);
    });
    options.addEventListener('click', function(info){
        injectHTML("../options.html");
    });
};
function loadOptions(info){
    inject.innerHTML = info;
    let back = document.getElementById('backArrow');
    let music = document.getElementById('music');
    let background = document.getElementById('backgroundChange');
    let secret = document.getElementById('hiddenBtn');

    back.addEventListener('click', function(info){
        injectHTML("../mainPage.html");
    });
}
function questionR(q) {
    let rNum = 0;
    let triviaQ = [];
    for (let i = 0; i < 20; i++) {
        rNum = Math.floor(Math.random() * q.length);
        console.log(rNum);
        triviaQ.push(q[rNum]);
        q.splice(rNum, 1);
    }
    console.log(triviaQ);
    //nextQuestion(easyQ);
    //return triviaQ;
}

let qCounter = 0;

function loadInstructions(info) {
    inject.innerHTML = info;
    let enter = document.getElementById('enter');
    let options = document.getElementById('options');
    let back = document.getElementById('backArrow');
    //conditional statement based on diff
    if(diff=="easy"){
        questionR(easyQ);
    }else if(diff=="medium"){
        questionR(medQ);
    }
    enter.addEventListener('click', function(info){
        injectHTML("../gamePage.html");
    });
    back.addEventListener('click', function(info){
        injectHTML("../mainPage.html");
    });
}
function nextQuestion(obj){
    let quest = document.getElementById('question');
    let answ1 = document.getElementById('ans1');
    let answ2 = document.getElementById('ans2');
    let answ3 = document.getElementById('ans3');
    let answ4 = document.getElementById('ans4');
    let correct = document.getElementById('correctA')
    let options = document.getElementById('optionsBtn');
        console.log(obj);
        console.log(qCounter);
    quest.innerText = obj[qCounter].q;//obj.esQ.q;
    answ1.innerText = obj[qCounter].a1;
    answ2.innerText = obj[qCounter].a2;
    answ3.innerText = obj[qCounter].a3;
    answ4.innerText = obj[qCounter].a4;
    correct.innerText = "The Answer is a Secret";
    correct.innerText = obj[qCounter].cA;
    qCounter++;
}
function loadGamePage(info){
    console.log("Load Game Page");
    inject.innerHTML = info;

    let quest = document.getElementById('question');
    let answ1 = document.getElementById('ans1');
    let answ2 = document.getElementById('ans2');
    let answ3 = document.getElementById('ans3');
    let answ4 = document.getElementById('ans4');
    let correct = document.getElementById('correctA')
    let options = document.getElementById('optionsBtn');
console.log(diff=="easy");
    if(diff == "easy"){
        console.log(easyQ);
        questionR(easyQ);
        nextQuestion(easyQ);
    }
    if(diff =="medium"){
        nextQuestion(medQ);
    }
    if(diff =="gowQ")
    {
        nextQuestion(godQ);
    }
       // nextQuestion(godQ);
    
}
injectHTML("../titlePage.html");
loadQuestions("../data/data.json");
