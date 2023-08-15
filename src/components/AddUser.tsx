import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db, auth } from "../config/firebase"
import { toast } from "react-hot-toast"
import { useAuthState } from 'react-firebase-hooks/auth'
export default function AddUser({ updateData }: any) {
	const [UserName, setUserName] = useState("")
	const [UserAge, setUserAge] = useState<number>(0)
	const [Loading, setLoading] = useState(false)
	const [user] = useAuthState(auth)

	const myCollectionRef = collection(db, "users")

	const handleSubmit = async (e: React.FormEvent) => {

		e.preventDefault()
		try {
			setLoading(true)
			await addDoc(myCollectionRef, {
				name: UserName,
				age: UserAge,
				userID: auth?.currentUser?.uid
			})
			updateData()
			toast.success("Added Successfully")
			setUserName("")
			setUserAge(0)
			setLoading(false)
		} catch (error: any) {
			toast.error("you are not logged in")
			setLoading(false)
		}
	}


	return (
		<article >
			<h2 >Add User</h2>
			{!user && <i className="red">you are not logged in 😭</i>}
			<form  >
				<label>Name:<input type="text" onChange={e => setUserName(e.target.value)} /></label>
				<label>Age:<input type="number" onChange={e => setUserAge(Number(e.target.value))} /></label>
				<button disabled={!user} aria-busy={Loading} className="outline w-full" onClick={handleSubmit} >submit</button>
			</form>
		</article>

	)
}
