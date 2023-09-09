import React, { useState, useEffect } from "react"

const QuesList = (props) => {
	// const cat = location.state.userData
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
