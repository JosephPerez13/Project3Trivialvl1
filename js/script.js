let triviaQ = [];
let totalQuestions = [20];

function loadQuestions() {
    let xmlhttp = new XMLHttpRequest();
    let url = "";

    if (diff == "esQ") {
        url = "./data/data.json";
    }
    // This is our fail safe-----------------------------
    if (diff == "haQ") {
        url = "./data/data.json";
    }
    //-------------------------------------------

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = this.responseText //JSON.parse(this.responseText);
            allQuestions(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function allQuestions(info){
    console.log(e);
}


loadQuestions();