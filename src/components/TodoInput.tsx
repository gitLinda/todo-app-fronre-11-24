import {ChangeEvent, FormEvent, useState} from "react";
import {NewTodo, Priority} from "../model/Todo.ts";
import {addTodo} from "../api/todo-api.ts";
import {useNavigate} from "react-router-dom";

const emptyTodo = {
    assignee: "",
    priority: Priority.Medium,
    title: "",
    description: ""
}

export function TodoInput() {
    const [todo, setTodo] = useState<NewTodo>(emptyTodo)
    const navigate = useNavigate()

    function handleChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
        const { name, value } = event.target;
        setTodo({
            ...todo,
            [name]: value,
        });
    }

    function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setTodo(emptyTodo)
        addTodo(todo);
        navigate("/list")
    }

    return (
        <form onSubmit={submitForm} className="todo-form">
            <div>
                <label>Verantwortlich:</label>
                <input
                    name="assignee"
                    type="text"
                    value={todo.assignee}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Priorität:</label>
                <select name="priority" value={todo.priority} onChange={handleChange}>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>
            </div>
            <div>
                <label>Titel:</label>
                <input
                    name="title"
                    type="text"
                    value={todo.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Beschreibung:</label>
                <input
                    name="description"
                    type="text"
                    value={todo.description}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" disabled={!todo.title || !todo.assignee}>Submit</button>
        </form>
    );
}