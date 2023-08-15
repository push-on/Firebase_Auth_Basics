import { useEffect, useState } from "react"
import { updateDoc, doc , getDoc} from "firebase/firestore"
import { db } from "../config/firebase"
import { toast } from "react-hot-toast"

export default function EditUser({ editMode, id, updateData }: any) {
	const [UserName, setUserName] = useState("")
	const [UserAge, setUserAge] = useState(0)
	const [loading, setLoading] = useState(false)
	

	useEffect(() => {
		const getPreviousData = async () => {
			setLoading(true)
			const docRef = doc(db, "users", id)
			const docSnap = await getDoc(docRef)
			if (docSnap.exists()) {
				setUserName(docSnap.data().name)
				setUserAge(docSnap.data().age)
			}
			setLoading(false)
		}
		getPreviousData()
	}, [])
	

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const docRef = doc(db, "users", id)
			updateDoc(docRef, {
				name: UserName,
				age: UserAge
			})
			updateData()
			editMode(false)
			toast.success("Updated Successfully")
		} catch (error:any) {
			toast.error(error.message)
		}
	}

	return (
		<article >
			{loading ? (<h2 aria-busy={loading}>loading Edit Data...</h2>) : (<h2>Edit User</h2>)}
			<form >
				<label>Name:<input type="text" value={UserName} onChange={e => setUserName(e.target.value)} /></label>
				<label>Age:<input type="number" value={UserAge} onChange={e => setUserAge(Number(e.target.value))} /></label>
				<button className="outline w-full" onClick={handleSubmit} >submit</button>
			</form>
		</article>

	)
}
