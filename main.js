const questions = [
	{
		word: "Scale",
		transcription: "skeɪl",
		answers: [
			{ text: "Статуя", correct: false },
			{ text: "Масштаб", correct: true },
			{ text: "Бокал", correct: false },
			{ text: "Дворец", correct: false }
		]
	},
	{
		word: "Bring",
		transcription: "brɪŋ",
		answers: [
			{ text: "Приносить", correct: true },
			{ text: "Отправлять", correct: false },
			{ text: "Вода", correct: false },
			{ text: "Трава", correct: false }
		]
	}
]

let current = 0

const userAnswers = []

// {
// 	index: "",
// 	title: "",
// 	wrong: "",
// 	correct: ""
// }

function main() {
	const word = document.querySelector(".quiz-word")
	const transcription = document.querySelector(".transcription")
	const quizBtns = document.querySelectorAll(".quiz-btn")

	word.innerText = questions[current]?.word
	transcription.innerText = questions[current]?.transcription
	quizBtns.forEach((btn, index) => {
		btn.classList.remove("wrong")
		btn.classList.remove("correct")
		btn.innerText = questions[current]?.answers[index].text
		btn.dataset.state = questions[current]?.answers[index].correct

		btn.addEventListener("click", async () => {
			if (btn.dataset.state === "true") {
				btn.classList.add("correct")
				mask()
			} else {
				btn.classList.add("wrong")
				const correct = document.querySelector("[data-state=true]").innerText
				userAnswers.push({
					title: word.innerText,
					wrong: btn.innerText,
					correct
				})
				mask()
			}
		})
	})
}

async function mask() {
	const overlay = document.querySelector(".overlay")
	overlay.classList.add("active")
	await setTimeout(() => {
		overlay.classList.remove("active")
		current += 1
		if (current === questions.length) {
			document.querySelector(".quiz-container").classList.add("hide")
			document.querySelector(".user-answers-container").classList.remove("hide")
			renderUserAnswers()
		}
		main()
	}, 1000)
}

function renderUserAnswers() {
	// const userTitle = document.querySelector(".user-title")
	// const userSelected = document.querySelector(".user-selected")
	// const correctAnswer = document.querySelector(".correct-answer")
	const userAns = document.querySelector(".user-answers-container")
	for (let i = 0; i < userAnswers.length - 1; i++) {
		userAns.appendChild(createHtmlElement())
	}

	const userAnswersCards = userAns.querySelectorAll(".userAnswers")
	console.log(userAnswersCards)

	userAnswers.forEach((user, index) => {
		userAnswersCards[index].querySelector(".user-title").innerText = user.title
		userAnswersCards[index].querySelector(".user-selected").innerText =
			user.wrong
		userAnswersCards[index].querySelector(".correct-answer").innerText =
			user.correct
	})
}

window.addEventListener("load", () => {
	main()
})

function createHtmlElement() {
	const div = document.createElement("div")
	const span1 = document.createElement("span")
	const span2 = document.createElement("span")

	const userTitle = document.createElement("h2")

	const userTop = document.createElement("div")
	const userField = document.createElement("div")
	const userField2 = document.createElement("div")
	const userSelected = document.createElement("div")
	const correctAnswer = document.createElement("div")

	userTop.className = "user-top"
	userTitle.className = "user-title"
	userField.className = "user-field"
	userField2.className = "user-field"
	userSelected.className = "user-selected wrong user-item"
	correctAnswer.className = "correct-answer user-item"

	div.className = "userAnswers"

	userTop.appendChild(userTitle)

	userField.appendChild(span1)
	userField.appendChild(userSelected)

	userField2.appendChild(span2)
	userField2.appendChild(correctAnswer)

	div.appendChild(userTop)
	div.appendChild(userField)
	div.appendChild(userField2)
	return div
}
