import { useEffect, useState } from 'react'
// import { FaEdit } from "react-icons/fa";
// import { AiFillDelete } from "react-icons/ai";
import { Navbar } from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' unique ID

function App() {
  const [todo, setTodo] = useState(''); // Input test
  const [todos, setTodos] = useState([]); // Array of todos
  const [showFinished, setshowFinished] = useState(true)

  // Save data in local storage
  const saveTols = (param) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  },[]);

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo('');
    saveTols()
  };

  const handleEdit = (e, id) => {
    let newTodos = todos.filter(todo => todo.id === id);
    setTodo(newTodos[0].todo);
    let todoDelete = todos.filter(todo => todo.id !== id);
    setTodos(todoDelete);
    saveTols()
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(todo => todo.id !== id);
    let confirmDelete = window.confirm('Are you sure you want to delete this todo?');
    if (confirmDelete) {
      setTodos(newTodos);
    }
    saveTols()
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    // console.log(id);
    let index = todos.findIndex(todo => todo.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTols()
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };


  return (
    <>
      <Navbar />
      <div className="container bg-violet-100 mx-auto my-5 rounded-xl p-5 min-h-[80vh]">
        <div className="addTodo my-5">
          <h1 className="text-lg font-bold">Add a Todo</h1>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleAdd} disabled={todo.length<=3}  className='bg-violet-800 disabled:bg-violet-300 hover:bg-violet-500 p-3 text-sm font-bold py-1 text-white rounded-md mx-6'>Add</button>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='mx-2' htmlFor="show">Show Finished</label> 
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
         
        <h1 className='text-lg font-bold' >Your Todos</h1>
        <div className="todos" >
          {todos.length === 0 && <div className="m-3 font-extrabold text-violet-400">No Todos to Display</div>}
          {todos.map(item => {
            return ((showFinished || !item.isCompleted) && <div className="todo flex my-1 w-1/2 justify-between" key={item.id} >
                <div className={`text-lg content-center flex ${item.isCompleted ? "line-through" : ""}`}>
                  <input onChange={handleCheckbox} className='me-2' type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                  {item.todo}
                </div>
                <div className="buttons">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-500 p-3 text-sm font-bold py-1 text-white rounded-md ms-6'>Edit</button>
                  <button onClick={(e) => handleDelete(e, item.id)} className='bg-violet-800 hover:bg-violet-500 p-3 text-sm font-bold py-1 text-white rounded-md mx-2'>Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
