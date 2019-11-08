let triviaQ = [];
let totalQuestions = 20;
let inject = document.getElementById('inject');

function injectHTML(url, ){
    let xmlhttp = new XMLHttpRequest();
    let url = "";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            if(url === "../mainPage.html"){
                loadMainPage(myArr);
            }else if(url === "../options.html"){
                loadOptions(myArr);
            }else if(url === "../instructions.html"){
                loadInstructions(myArr);
            }else if(url === "../gamePage.html"){
                loadGamePage(myArr);
            }
        }
    },
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

let easyQ = [];
let meQ = [];
let godQ = [];
function loadQuestions() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = this.responseText //JSON.parse(this.responseText);
            allQuestions(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    function allQuestions(info){
        for(let i =0 ; i < easyQ.length;i++){
            let nfo =[
                "q" = info.esQ[i].q,
                "a1" = info.esQ[i].a1,
                "a2" = info.esQ[i].a2,
                "a3" = info.esQ[i].a3,
                "a4" = info.esQ[i].a4,
                "cA" = info.esQ[i].cA
            ]
        }
        for(let i =0; i < medQ.length;i++){
            let nfo=[
                "q" = info.esQ[i].q,
                "a1" = info.medQ[i].a1,
                "a2" = info.medQ[i].a2,
                "a3" = info.medQ[i].a3,
                "a4" = info.medQ[i].a4,
                "cA" = info.medQ[i].cA
            ]
        }
        for(let i =0; i < medQ.length;i++){
            let nfo=[
                "q" = info.gowQ[i].q,
                "a1" = info.gowQ[i].a1,
                "a2" = info.gowQ[i].a2,
                "a3" = info.gowQ[i].a3,
                "a4" = info.gowQ[i].a4,
                "cA" = info.gowQ[i].cA
            ]
        }
    }
}

injectHTML();
loadQuestions();