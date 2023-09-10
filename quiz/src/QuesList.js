import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const QuesList = (props) => {
	const location = useLocation()
	const navigate = useNavigate()
	//const cat = location.state.cat
	const cat = "A"
	//const name = location.state.name
	const name = "wmo"
	const [questions, setQuestions] = useState(null)
	const [answers, setAnswers] = useState(Array(10).fill({ answer: "" }))

	useEffect(() => {
		fetch(`http://localhost:7777/A`)
			.then((res) => res.json())
			.then((questions) => {
				setQuestions(questions)
			})
			.catch((error) => {
				console.error("Error displaying questions:", error)
			})
	}, [])

	const handleInputChange = (e, i) => {
		e.preventDefault()
		const updatedAnswers = [...answers]
		updatedAnswers[i] = { answer: e.target.value }
		setAnswers(updatedAnswers)
	}

	const testEvaluator = (e) => {
		e.preventDefault()
		let count = 0

		questions.map((question, index) => {
			if (question.answer === answers[index].answer) count = count + 1
		})

		const userData = { name: name, cat: cat, score: count }

		fetch("http://localhost:8000//updStats", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userData),
		})
			.then((response) => {
				console.log("test result stored")
				navigate("/Dashboard")
			})
			.catch((error) => {
				console.error("Error storing score:", error)
			})
	}

	return (
		<div>
			{questions && (
				<div>
					<form onSubmit={testEvaluator}>
						{questions.map((question, index) => {
							return (
								<div
									className="question-display"
									key={question.id}
								>
									<label>Question:{question.question}</label>
									<input
										type="text"
										name={question.id}
										value={answers[index].answer}
										onChange={(e) => {
											handleInputChange(e, index)
										}}
									/>
								</div>
							)
						})}
						<button type="submit">Submit</button>
					</form>
				</div>
			)}
		</div>
	)
}

export default QuesList
