// html
let triviaForm = document.getElementById("trivia")
let questionscontainer = document.getElementById("questionsContent")
let answers = document.getElementsByClassName("answer")
let amount = document.getElementById("amount")
let category = document.getElementById("category")
let difficulty = document.getElementById("difficulty")
let type = document.getElementById("type")


// variables de control
let questions
let index = 0
let score = 0

// funciones
let getapidata = (e)=> {
    e.preventDefault()
    let url =`https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`
    fetch(url).then(response => {
        return response.json()
    }).then (data => {
        questions = data.results
        startgame()
    })
}

const startgame = () => {

    questionscontainer.style.display = "flex"
    triviaForm.style.display =  "none"


    // variable que controla las preguntas
    let currentQuestions = questions[index]
    console.log(currentQuestions)
    document.getElementById("questiontitle").innerText = `Puntaje: ${score}   
    ` + currentQuestions.question
    

    if (currentQuestions.incorrect_answers.length === 1) {
        document.getElementById("1").innerText = "True"
        document.getElementById("2").innerText = "False"
        document.getElementById("3").style.display ="none"
        document.getElementById("4").style.display ="none"
        if (currentQuestions.correctAnswer === "True") {correct_index_answer = 1}
        else {correct_index_answer = 2}
    }else {
        document.getElementById("1").style.display ="block"
        document.getElementById("2").style.display ="block"
        document.getElementById("3").style.display ="block"
        document.getElementById("4").style.display ="block"

        correct_index_answer = Math.floor(Math.random() * 4) + 1;
        document.getElementById(correct_index_answer).innerText = currentQuestions.correct_answer;
        let j = 0;
        for (let i = 1; i <= 4; i++) {
            if (i === correct_index_answer) continue;
            document.getElementById(i).innerText = currentQuestions.incorrect_answers[j];
            j++
        }
    }
    return (currentQuestions.question)
};


const selectAnswer = (id) => {
    let answerId = id
    if(answerId == correct_index_answer) {
        score= score +1
        document.addEventListener("click", funcionsonidocorrecto())
    }else { document.addEventListener("click", funcionsonidoincorrecto()) 
    }


    if (index < amount.value - 1) {
        index++
        startgame()
    } else if (index === amount.value - 1){
        showResults()   }
}
const sonidos = document.getElementById("sonidos")
const funcionsonidoincorrecto = () => {
    sonidos.innerHTML = '<audio src="incorrecto.mp3" autoplay></audio>'
}
const funcionsonidocorrecto = () => {
    sonidos.innerHTML = '<audio src="correcto.mp3" autoplay></audio>'
}
const funcionsonidofinal = () => {
    sonidos.innerHTML = '<audio src="final.mp3" autoplay></audio>'}

const showResults = () => {
    questionscontainer.innerHTML =""
    let finalscore = document.createElement("h3")
    finalscore.innerText =`¡GRACIAS POR PARTICIPAR! 
    Juego terminado, respuestas correctas ${score} de ${amount.value}`

    let restartbtn = document.createElement("button")
    
    restartbtn.innerText = "reiniciar juego"
    restartbtn.setAttribute("id", "restartbtn")
    restartbtn.addEventListener("click", () => location.reload())
    questionscontainer.appendChild(finalscore)
    questionscontainer.appendChild(restartbtn)
    funcionsonidofinal()
}

for (let i = 0; i < answers.length; i++) {
    const element = answers[i];
    element.addEventListener("click", () => selectAnswer(element.id));
};

const correctAnswer = id => {
    if (id == correct_index_answer) {
        score += 1
    } else {
    }
};
            

// listeners
triviaForm.addEventListener("submit", getapidata)
