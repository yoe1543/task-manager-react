import Modal from "./Modal"
import {useState} from 'react'
import './editTask.css'
import { doc, updateDoc } from "firebase/firestore";
import {db} from './firebase'

function EditTask({open, onClose, toEditTitle, toEditDescription, id}) {

  const [title, setTitle] = useState(toEditTitle)
  const [lists, setDescription] = useState(toEditDescription)

  /* function to update document in firestore */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'checklists', id)
    let data = lists.split('\n')
    try{
      await updateDoc(taskDocRef, {
        title: title,
        lists: data
      })
      onClose()
    } catch (err) {
      alert(err)
    }    
  }
  return (
    <Modal modalLable='Edit Task' onClose={onClose} open={open}>
      <form className='editTask' name='updateTask'>
        <input 
          type='text' 
          name='title' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}/>
        <textarea onChange={(e) => setDescription(e.target.value)} value={lists}></textarea>
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
