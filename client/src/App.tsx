import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Log-In"
import Home from "./pages/Home"
import Signup from "./pages/Sign-Up"
import NotFound from "./pages/Not-Found"
import { useSessionStore } from "./hooks/useSessionStore";
import { useEffect } from "react";
import { getTokenItem } from "./utils/item/token";

const App = () => {
	const client = new QueryClient()
	const { setSession } = useSessionStore()

	useEffect(() => {
        const token = getTokenItem()
        if (token) {
			setSession(token)
        }
    }, [])

	return (
		<>
			<QueryClientProvider client={client}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</>
	)
}

export default App
