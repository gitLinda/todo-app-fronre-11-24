import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {loadTodo} from "../api/todo-api.ts";
import {Priority, Todo} from "../model/Todo.ts";

export function TodoDetails() {
    const params = useParams();
    const [todo, setTodo] = useState<Todo>({
        id: "",
        assignee: "",
        priority: Priority.Low,
        title: "",
        description: ""
    });

    useEffect(() => {
        const response = loadTodo(params.todoId!);
        setTodo(response);
    }, [params.todoId]);

    return (
        <>
            <h2>Todo Details</h2>
            <table>
                <tbody>
                <tr>
                    <td><b>ID</b></td>
                    <td>{todo.id}</td>
                </tr>
                <tr>
                    <td><b>Verantwortlich</b></td>
                    <td>{todo.assignee}</td>
                </tr>
                <tr>
                    <td><b>Priorität</b></td>
                    <td>{todo.priority}</td>
                </tr>
                <tr>
                    <td><b>Titel</b></td>
                    <td>{todo.title}</td>
                </tr>
                <tr>
                    <td><b>Beschreibung</b></td>
                    <td>{todo.description}</td>
                </tr>
                </tbody>
            </table>
        </>
    )
}