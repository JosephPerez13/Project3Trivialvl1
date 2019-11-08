let inject = document.getElementById('inject');

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
function loadInstructions(info) {
    inject.innerHTML = info;
    let enter = document.getElementById('enter');
    let options = document.getElementById('options');
    let back = document.getElementById('backArrow');

    enter.addEventListener('click', function(info){
        injectHTML("../gamePage.html");
    });
    back.addEventListener('click', function(info){
        injectHTML("../mainPage.html");
    });
}
function loadGamePage(info){
    inject.innerHTML = info;
    let answ1 = document.getElementById('ans1');
    let answ2 = document.getElementById('ans2');
    let answ3 = document.getElementById('ans3');
    let answ4 = document.getElementById('ans4');
    let options = document.getElementById('optionsBtn');

}
injectHTML("../titlePage.html");
loadQuestions("../data/data.json");
