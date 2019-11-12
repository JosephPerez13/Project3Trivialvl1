let inject = document.getElementById('inject');
let diff = 1;

function injectHTML(url) {
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
                loadInstructions(myArr,);
            } else if (url === "../gamePage.html"  && diff === 1) {
                loadGamePage(myArr,easyQ);
            }else if (url === "../gameMedium.html"  && diff === 2) {
                loadGamePage(myArr,medQ);
            }else if (url === "../gameHard.html"  && diff === 3) {
                loadGamePage(myArr,godQ);
            }
        }

    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

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
                    "q": info.esQ[i].q,
                    "a1": info.esQ[i].a1,
                    "a2": info.esQ[i].a2,
                    "a3": info.esQ[i].a3,
                    "a4": info.esQ[i].a4,
                    "cA": info.esQ[i].cA
                };
                easyQ.push(nFO);
                // console.log(info);
            }
            for (let i = 0; i < info.medQ.length; i++) {
                let nFO = {
                    "q": info.medQ[i].q,
                    "a1": info.medQ[i].a1,
                    "a2": info.medQ[i].a2,
                    "a3": info.medQ[i].a3,
                    "a4": info.medQ[i].a4,
                    "cA": info.medQ[i].cA
                };
                medQ.push(nFO);
            }
            for (let i = 0; i < info.godQ.length; i++) {
                let nFO = {
                    "q": info.godQ[i].q,
                    "a1": info.godQ[i].a1,
                    "a2": info.godQ[i].a2,
                    "a3": info.godQ[i].a3,
                    "a4": info.godQ[i].a4,
                    "cA": info.godQ[i].cA
                };
                godQ.push(nFO);
            }
        }
    }
    //console.log(easyQ);
function loadTitlePage(info) {
    inject.innerHTML = info;

    let start = document.getElementById('start');
    start.addEventListener('click', function (info) {
        injectHTML("../instructions.html");
    });
};
function loadMainPage(info) {
    inject.innerHTML = info;
    let ezMode = document.getElementById("ezBtn");
    let medMode = document.getElementById("medBtn");
    let gowBtn = document.getElementById('secretBtn');
    let options = document.getElementById("options");

    ezMode.addEventListener('click', function (info) {
        diff = 1;
        injectHTML("../gamePage.html");
        console.log(easyQ);
    })
    medMode.addEventListener('click', function (info) {
        diff = 2;
        injectHTML("../gameMedium.html");
        console.log(medQ);
    });
    gowBtn.addEventListener('click', function (info) {
        diff = 3;
        injectHTML("../gameHard.html");
        console.log(godQ);
    });
    options.addEventListener('click', function (info) {
        injectHTML("../options.html");
    });
};
function loadOptions(info) {
    inject.innerHTML = info;
    let back = document.getElementById('backArrow');
    let music = document.getElementById('music');
    let background = document.getElementById('backgroundChange');
    let secret = document.getElementById('hiddenBtn');

    back.addEventListener('click', function (info) {
        injectHTML("../mainPage.html");
    });
}

function loadInstructions(info) {
    inject.innerHTML = info;
    let enter = document.getElementById('enter');
    let options = document.getElementById('options');
    let back = document.getElementById('backArrow');

    //conditional statement based on diff
    // if (diff == 1) {
    //     questionR(easyQ);
    // } else if (diff == 2) {
    //     questionR(medQ);
    // }else {
    //     questionR(godQ);
    // }
    enter.addEventListener('click', function (info) {
        injectHTML("../mainPage.html")
    });
    back.addEventListener('click', function (info) {
        injectHTML("../titlePage.html");
    });
}
function questionR(questions) {
    let rNum = 0;
    let triviaQ = [];
    for (let i = 0; i < 20; i++) {
        rNum = Math.floor(Math.random() * questions.length);
        // console.log(rNum);
        triviaQ.push(questions[rNum]);
        questions.splice(rNum, 1);
    }
    //nextQuestion(easyQ);
    return triviaQ;
}

let correctA = "";

function nextQuestion(obj) {
    let quest = document.getElementById('question');
    let answ1 = document.getElementById('ans1');
    let answ2 = document.getElementById('ans2');
    let answ3 = document.getElementById('ans3');
    let answ4 = document.getElementById('ans4');
    let correct = document.getElementById('correctA');
    let options = document.getElementById('optionsBtn');
    // console.log(obj);
    // console.log(qCount);

    if(qCount === 20){
        reset();
    }else{

        quest.innerText = obj.q;
        answ1.innerText = obj.a1;
        answ2.innerText = obj.a2;
        answ3.innerText = obj.a3;
        answ4.innerText = obj.a4;
        correct.innerText = "The Answer is a Secret";
        correctA = obj.cA;
        answered = false;
        qCount++;
    }
}

let qCount = 0;

function loadGamePage(info,questions) {
    let triviaQuestions = questionR(questions);
    inject.innerHTML = info;
    console.log(diff);

    let score = 0;

    let blue = document.getElementById('bgBlue');
    let quest = document.getElementById('question');
    let answ1 = document.getElementById('ans1');
    let answ2 = document.getElementById('ans2');
    let answ3 = document.getElementById('ans3');
    let answ4 = document.getElementById('ans4');
    let correct = document.getElementById('correctA')
    let options = document.getElementById('optionsBtn');
    let time = document.getElementById('timer');
    let scoreBoard = document.getElementById('score');

    clearTi = setInterval(checkTime, 1000);
    nextQuestion(triviaQuestions[qCount]);

    // nextQuestion(trivia1[qCount]);
    // nextQuestion(trivia2[qCount]);
    // nextQuestion(trivia3[qCount]);

    checkTime();
    //console.log(diff=="easy");
   
    answ1.addEventListener('click', function (e) {
        if (!answered) {
            checkAnswer(e.target.innerText);
        }
        timer = 30;
    });
    answ2.addEventListener('click', function (e) {
        if (!answered) {
            checkAnswer(e.target.innerText);
        }
        timer = 30;
    });
    answ3.addEventListener('click', function (e) {
        if (!answered) {
            checkAnswer(e.target.innerText);
        }
        timer = 30;
    });
    answ4.addEventListener('click', function (e) {
        if (!answered) {
            checkAnswer(e.target.innerText);
        }
        timer = 30;
    });

    function checkAnswer(answer) {
        //check if answer is correct
        answered = true;

        if (answer == correctA) {
            score++;
            scoreBoard.innerText = score;
            correct.innerText = correctA;
        }
        checkTime();

        setTimeout(() => {
            nextQuestion(triviaQuestions[qCount]);
            checkAnswer(e.target.innerText);
        }, 5000)
    }
}


function loadGameMedium(info,questions) {
    inject.innerHTML = info;
    console.log(diff);

    let score = 0;
    let triviaQuestions = questionR(questions);

    let blue = document.getElementById('bgBlue');
    let quest = document.getElementById('question');
    let answ1 = document.getElementById('ans1');
    let answ2 = document.getElementById('ans2');
    let answ3 = document.getElementById('ans3');
    let answ4 = document.getElementById('ans4');
    let correct = document.getElementById('correctA')
    let options = document.getElementById('optionsBtn');
    let time = document.getElementById('timer');
    let scoreBoard = document.getElementById('score');

    clearTi = setInterval(checkTime, 1000);
    nextQuestion(triviaQuestions[qCount]);

    // nextQuestion(trivia1[qCount]);
    // nextQuestion(trivia2[qCount]);
    // nextQuestion(trivia3[qCount]);

    checkTime();
    //console.log(diff=="easy");
   
    answ1.addEventListener('click', function (e) {
        if (!answered) {
            checkAnswer(e.target.innerText);
        }
        timer = 30;
    });
    answ2.addEventListener('click', function (e) {
        if (!answered) {
            checkAnswer(e.target.innerText);
        }
        timer = 30;
    });
    answ3.addEventListener('click', function (e) {
        if (!answered) {
            checkAnswer(e.target.innerText);
        }
        timer = 30;
    });
    answ4.addEventListener('click', function (e) {
        if (!answered) {
            checkAnswer(e.target.innerText);
        }
        timer = 30;
    });

    function checkAnswer(answer) {
        //check if answer is correct
        answered = true;

        if (answer == correctA) {
            score++;
            scoreBoard.innerText = score;
            correct.innerText = correctA;
        }
        checkTime();

        setTimeout(() => {
            nextQuestion(triviaQuestions[qCount]);
            checkAnswer(e.target.innerText);
        }, 2000)
    }
}


function loadGameHard(info,questions) {
    let triviaQuestions = questionR(questions);
    inject.innerHTML = info;
    console.log(diff);

    let score = 0;

    let blue = document.getElementById('bgBlue');
    let quest = document.getElementById('question');
    let answ1 = document.getElementById('ans1');
    let answ2 = document.getElementById('ans2');
    let answ3 = document.getElementById('ans3');
    let answ4 = document.getElementById('ans4');
    let correct = document.getElementById('correctA')
    let options = document.getElementById('optionsBtn');
    let time = document.getElementById('timer');
    let scoreBoard = document.getElementById('score');

    clearTi = setInterval(checkTime, 1000);
    nextQuestion(triviaQuestions[qCount]);

    // nextQuestion(trivia1[qCount]);
    // nextQuestion(trivia2[qCount]);
    // nextQuestion(trivia3[qCount]);

    checkTime();
    //console.log(diff=="easy");
   
    answ1.addEventListener('click', function (e) {
        if (!answered) {
            checkAnswer(e.target.innerText);
        }
        timer = 30;
    });
    answ2.addEventListener('click', function (e) {
        if (!answered) {
            checkAnswer(e.target.innerText);
        }
        timer = 30;
    });
    answ3.addEventListener('click', function (e) {
        if (!answered) {
            checkAnswer(e.target.innerText);
        }
        timer = 30;
    });
    answ4.addEventListener('click', function (e) {
        if (!answered) {
            checkAnswer(e.target.innerText);
        }
        timer = 30;
    });

    function checkAnswer(answer) {
        //check if answer is correct
        answered = true;

        if (answer == correctA) {
            score++;
            scoreBoard.innerText = score;
            correct.innerText = correctA;
        }
        checkTime();

        setTimeout(() => {
            nextQuestion(triviaQuestions[qCount]);
            checkAnswer(e.target.innerText);
        }, 2000)
    }
}
let timer = 30;
let clearTi;
let answered = false;

function checkTime() {
    let time = document.getElementById('timer');

    if (timer != 0 && answered == false) {
        time.innerText = timer--;
    }else if(timer===0){

    }
}

let score = 0;
function reset(){
    clearInterval(clearTi);
    timer = 30;
    score = 0;
    qCount = 0;
}


injectHTML("../titlePage.html");
loadQuestions("../data/data.json");
