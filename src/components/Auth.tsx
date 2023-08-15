import { useState } from "react"
import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth"
import { toast } from "react-hot-toast"

export default function Auth({ IS_SIGN_IN_MODAL, SET_SIGNIN_MODAL }: { IS_SIGN_IN_MODAL: boolean, SET_SIGNIN_MODAL: Function }) {
	const [Email, setEmail] = useState("")
	const [Password, setPassword] = useState("")

	const signInWithGoogle = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await signInWithPopup(auth, googleProvider)
			toast.success("signin Successful")
			SET_SIGNIN_MODAL(false)
		} catch (error: any) {
			toast.error("signin Failed")
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await createUserWithEmailAndPassword(auth, Email, Password)
			toast.success("signin Successful")
			SET_SIGNIN_MODAL(false)
		} catch (error: any) {
			toast.error("signin Failed")
		}
	}

	return (
		<>
			<div className='container'>
				<dialog open={IS_SIGN_IN_MODAL}>
					<article >
						<div className="close" onClick={() => SET_SIGNIN_MODAL(false)} style={{ cursor: 'pointer' }}></div>
						<h2>Singin / Signup</h2>
						<form onSubmit={handleSubmit}>
							<label htmlFor="email">Email:</label>
							<input type="email" onChange={(e) => setEmail(e.target.value)} required />
							<label htmlFor="password">Password:</label>
							<input type="password" onChange={(e) => setPassword(e.target.value)} required />
							<button className="outline" type='submit' style={{ width: '100%' }}>Signin</button>
							<button className="outline" onClick={signInWithGoogle} style={{ width: '100%' }}>Signin With Google</button>
						</form>
					</article>
				</dialog>
			</div>
		</>
	)
}
