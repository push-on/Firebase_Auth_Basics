import { useEffect, useState } from "react"
import Auth from "./components/Auth"
import Navbar from "./components/Navbar"
import Table from "./components/Table"
import { db, auth } from "./config/firebase"
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore"
import AddUser from "./components/AddUser"
import EditUser from "./components/EditUser"
import { Toaster, toast } from "react-hot-toast"

import { useAuthState } from 'react-firebase-hooks/auth'

interface Users {
  id: string
}

export default function App() {
  const [SigninModal, setSigninModal] = useState(false)
  const [Users, setUsers] = useState<Users[]>([])
  const [Loading, setLoading] = useState(false)
  const [EditMode, setEditMode] = useState(false)
  const [updateID, setUpdateID] = useState('')
  const [user] = useAuthState(auth)

  const myCollectionRef = collection(db, "users")

  const getData = async () => {
    try {
      const data = await getDocs(myCollectionRef)
      const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setUsers(userData)

    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const deleteData = async (id: string) => {
    try {
      setLoading(true)
      const docRef = doc(db, "users", id)
      await deleteDoc(docRef)
      getData()
      setLoading(false)
      toast.success("Deleted Successfully")
    } catch (error) {
      toast.error("you are not logged in")
      setLoading(false)
    }
  }

  const editData = async (id: string) => {
    if (user) {
      setUpdateID(id)
      setEditMode(true)
    } else {
      toast.error("you are not logged in")
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="container">
      <div><Toaster /></div>
      <Navbar setSignin={setSigninModal} />
      <Auth IS_SIGN_IN_MODAL={SigninModal} SET_SIGNIN_MODAL={setSigninModal} />
      <div className="grid">
        <Table users={Users} delData={deleteData} load={Loading} editData={editData} />
        {EditMode ? <EditUser editData={editData} id={updateID} editMode={setEditMode} updateData={getData} /> : <AddUser updateData={getData} />}
      </div>
    </div>
  )
}
