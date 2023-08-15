import { toast } from "react-hot-toast"
import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"
import { useState } from "react"
import { useAuthState } from 'react-firebase-hooks/auth'


export default function Navbar({ setSignin }: { setSignin: Function }) {
	const [loading, setLoading] = useState(false)
	const [user] = useAuthState(auth)

	const logOut = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			setLoading(true)
			await signOut(auth)
			toast.success("logged out")

			setLoading(false)
		} catch (error: any) {
			toast.error(error.message)
			setLoading(false)
		}
	}


	return (
		<nav >
			<ul>
				<li><h1>🔥firebase-crud-app</h1></li>
				{user && <li><h1>👍you are logged-in 🥳</h1></li>}
			</ul>
			<ul>
				{user ?
					<li><button aria-busy={loading} className="outline" onClick={logOut}>SignOut</button></li>
					:
					<li><button className="outline" onClick={() => setSignin(true)}>Signin</button></li>
				}
			</ul>
		</nav>
	)
}
