import {useState} from 'react'
import {TodoInput} from "./components/TodoInput.tsx";
import {TodoList} from "./components/TodoList.tsx";
import {v4 as uuidv4} from 'uuid';
import {NewTodo, Todo} from "./model/Todo.ts";

function App() {
    const [todoList, setTodoList] = useState<Todo[]>([])

    function addTodo(todo: NewTodo) {
        const newTodo = {
            ...todo,
            id: uuidv4(),
        }
        setTodoList([
            ...todoList,
            newTodo
        ])
    }

    function deleteTodo(id: string) {
        const filteredTodoList = todoList.filter(todo => todo.id !== id)
        setTodoList(filteredTodoList)
    }

    return (
        <>
            <h1>Todo App</h1>
            <h2>Neues Todo erfassen</h2>
            <TodoInput addTodo={addTodo}/>
            <h2>Alle Todo's</h2>
            <TodoList todos={todoList} deleteTodo={deleteTodo}/>
        </>
    )
}

export default App
