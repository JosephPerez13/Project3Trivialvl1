let inject = document.getElementById('inject');
let diff = 1;
let visible = false;
let clearTi;
let totalQuestions = 20;
let qCount = 0;
let score = 0;
let sound = false;
let audio = new Audio();
audio.src = "../";
audio.play();

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
                loadInstructions(myArr);
            } else if (url === "../gamePage.html"  && diff === 1) {
                loadGamePage(myArr,easyQ);
            }else if (url === "../gamePage.html"  && diff === 2) {
                loadGamePage(myArr,medQ);
            }else if (url === "../gamePage.html"  && diff === 3) {
                loadGamePage(myArr,godQ);
            }else if (url === "../resultPage.html"){
                loadResultPage(myArr)
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
    console.log(visible);
    if (visible == true) {
        let gowBtn = document.getElementById('secretBtn');
        gowBtn.className = "";
        gowBtn.addEventListener('click', function (info) {
            diff = 3;
            injectHTML("../gamePage.html")
            console.log(godQ);
        });
    }
    let ezMode = document.getElementById("ezBtn");
    let medMode = document.getElementById("medBtn");
    let options = document.getElementById("options");
    
    ezMode.addEventListener('click', function (info) {
        diff = 1;
        injectHTML("../gamePage.html")
        console.log(easyQ);
    });
    medMode.addEventListener('click', function (info) {
        diff = 2;
        injectHTML("../gamePage.html")
        console.log(medQ);
    });
    options.addEventListener('click', function (info) {
        injectHTML("../options.html")
    });
};

function loadOptions(info) {
    inject.innerHTML = info;
    let back = document.getElementById('backArrow');
    let music = document.getElementById('music');
    let secret = document.getElementById('activate');

    back.addEventListener('click', function (info) {
        injectHTML("../mainPage.html");
    });
    music.addEventListener('click',function(e){
        if(sound != true){
            audio.play();
        }else{
            audio.pause();
            audio.currentTime = 0;
        }
    });

    secret.addEventListener('click', function(info){
        visible = true;    
        console.log(visible);
    });
}

function loadInstructions(info) {
    inject.innerHTML = info;
    let enter = document.getElementById('enter');

    enter.addEventListener('click', function (info) {
        injectHTML("../mainPage.html");
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
    //clearInterval(clearTi);
    let quest = document.getElementById('question');
    let answ1 = document.getElementById('ans1');
    let answ2 = document.getElementById('ans2');
    let answ3 = document.getElementById('ans3');
    let answ4 = document.getElementById('ans4');
    let correct = document.getElementById('correctA');
    let options = document.getElementById('optionsBtn');
    // console.log(obj);
    // console.log(qCount);

    if(qCount < totalQuestions)
    {
        qCount++;
        quest.innerText = obj.q;
        answ1.innerText = obj.a1;
        answ2.innerText = obj.a2;
        answ3.innerText = obj.a3;
        answ4.innerText = obj.a4;
        correct.innerText = "The Answer is a Secret";
        correctA = obj.cA;
        answered = false;
    }else{
        injectHTML('../resultPage.html');
    }
    timer=30;
    //setInterval(checkTime, 1000);
}

// document.getElementById("showImage").onclick = function() {
//     document.getElementById("secretBtn").style.visibility = "visible";
// }

function loadGamePage(info,questions) {
    let triviaQuestions = questionR(questions);
    inject.innerHTML = info;
    console.log(diff);    

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
    let background = document.getElementById('background');

    if(diff == 3){
        background.className = "hero-image2";    
    }
    clearTi = setInterval(checkTime, 1000);
    nextQuestion(triviaQuestions[qCount]);

    // nextQuestion(trivia1[qCount]);
    // nextQuestion(trivia2[qCount]);
    // nextQuestion(trivia3[qCount]);
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

        setTimeout(() => {
            nextQuestion(triviaQuestions[qCount]);
           
        }, 000)
    }
}


function loadGameMedium(info,questions) {
    inject.innerHTML = info;
    console.log(diff);

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

   // clearTi = setInterval(checkTime, 1000);
    nextQuestion(triviaQuestions[qCount]);

    // nextQuestion(trivia1[qCount]);
    // nextQuestion(trivia2[qCount]);
    // nextQuestion(trivia3[qCount]);

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
       // checkTime();

        setTimeout(() => {
            nextQuestion(triviaQuestions[qCount]);
            }, 2000)
    }
}


function loadGameHard(info,questions) {
    let triviaQuestions = questionR(questions);
    inject.innerHTML = info;
    console.log(diff);

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

        setTimeout(() => {
            nextQuestion(triviaQuestions[qCount]);
        }, 2000)
    }
}

function loadResultPage(info){
    inject.innerHTML = info;
    let scoreTotal = document.getElementById('result');
    let startOver = document.getElementById('restart');
    let exit = document.getElementById('exit');
    console.log(score);
    scoreTotal.innerText = score;

    startOver.addEventListener('click', function(){
        reset();
        injectHTML("../titlePage.html");
    });
    exit.addEventListener('click', function(){
        injectHTML('https://www.google.com');
    });
}

let timer = 30;
//let clearTi;
let answered = false;

function checkTime() {
    let time = document.getElementById('timer');

    if (timer != 0 && answered == false) {
        time.innerText = timer--;
    }else if(timer===0){

        qCount++;
        //console.log(triviaQuestions[qCount]);
        timer=30;
        nextQuestion(triviaQuestions[qCount]);
    }
}

function reset(){
    clearInterval(clearTi);
    timer = 30;
    score = 0;
    qCount = 0;
}


injectHTML("../titlePage.html");
loadQuestions("../data/data.json");
