import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Log-In"
import Home from "./pages/Home"
import Signup from "./pages/Sign-Up"
import NotFound from "./pages/Not-Found"

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
