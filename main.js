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

function main() {
	const word = document.querySelector(".quiz-word")
	const transcription = document.querySelector(".transcription")
	const quizBtns = document.querySelectorAll(".quiz-btn")

	word.innerText = questions[current].word
	transcription.innerText = questions[current].transcription
	quizBtns.forEach((btn, index) => {
		btn.classList.remove("wrong")
		btn.classList.remove("correct")
		btn.innerText = questions[current]["answers"][index].text
		btn.dataset.state = questions[current]["answers"][index].correct

		btn.addEventListener("click", async () => {
			if (btn.dataset.state === "true") {
				btn.classList.add("correct")
				mask()
			} else {
				btn.classList.add("wrong")
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
			document.querySelector(".congratulation").classList.add("active")
		}
		main()
	}, 1000)
}

window.addEventListener("load", () => {
	main()
})
