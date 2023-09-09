import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Dashboard = (props) => {
	const navigate = useNavigate()
	const location = useLocation()
	const [cat, setCat] = useState("")

	const userData = location.state.userData

	const submitHandler = (e) => {
		e.preventDefault()
		navigate("/QuesList", { state: { cat } })
	}

	return (
		<div>
			<div>
				<form onSubmit={submitHandler}>
					<input
						list="categories"
						name="cat"
						onChange={(e) => setCat(e.target.value)}
					/>
					<datalist id="categories">
						<option value="A"></option>
						<option value="B"></option>
						<option value="C"></option>
					</datalist>
					<button type="submit">Submit</button>
				</form>
			</div>
			<div className="userHistory">
				<h1>its working 1</h1>
				{userData.history.length !== 0 && (
					<div>
						{userData.history.map((element) => {
							return (
								<div className="score-preview" key={element.id}>
									<h3>`category:${element.cat}`</h3>
									<h5>`score:${element.score}`</h5>
								</div>
							)
						})}
					</div>
				)}
				{userData.history.length === 0 && (
					<div>
						<h4>user stats will be displayed here</h4>
					</div>
				)}
			</div>
		</div>
	)
}

export default Dashboard
