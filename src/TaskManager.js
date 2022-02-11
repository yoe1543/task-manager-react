import './taskManager.css'
import Task from './Task'
import AddTask from './AddTask'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from './firebase'

function TaskManager() {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [lists, setTasks] = useState([])
  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    const q = query(collection(db, 'checklists'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  return (
    <div className='taskManager'>
      <header>Checklists</header>
      <div className='taskManager__container'>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Checklists +
        </button>
        <div className='taskManager__tasks'>
        {lists.map((task) => (
  <Task
    id={task.id}
    key={task.id}
    completed={task.data.completed}
    title={task.data.title} 
    lists={task.data.lists}
  />
))}
        </div>
      </div>

      {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }

    </div>
  )
}

export default TaskManager
