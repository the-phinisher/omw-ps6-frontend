import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
	const navigate = useNavigate()
	const [name, setName] = useState("")

	const submitHandler = (e) => {
		e.preventDefault()

		const userData = { name }

		fetch("http://localhost:8000/addUser", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userData),
		})
			.then((response) => {
				console.log(response)
				response.json()
			})
			.then((userData) => {
				navigate("/Dashboard", { state: { userData } })
			})
			.catch((error) => {
				console.error("Error storing data:", error)
			})
	}

	return (
		<div>
			<form onSubmit={submitHandler}>
				<div>
					<label>Name:</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	)
}

export default Home
