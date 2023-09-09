import "./App.css"
import Dashboard from "./Dashboard"
import Home from "./Home"
import QuesList from "./QuesList"
import NotFound from "./notFound"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
	return (
		<Router>
			<div className="App">
				<div className="content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Dashboard" element={<Dashboard />} />
						<Route path="/QuesList" element={<QuesList />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</Router>
	)
}

export default App
