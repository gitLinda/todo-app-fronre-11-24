import {Priority, Todo} from "../model/Todo.ts";
import {TodoItem} from "../components/TodoItem.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {deleteTodo, loadTodoList} from "../api/todo-api.ts";

type Filter = "all" | "high-priority" | "medium-priority" | "low-priority"
type Sort = "assignee" | "priority"

export function TodoList() {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<Filter>("all")
    const [sort, setSort] = useState<Sort>("priority")

    useEffect(() => {
        const response = loadTodoList();
        setTodoList(response);
    }, []);

    const visibleTodos = todoList
        .filter(todo => todoFilter(todo, filter))
        .sort((a, b) => todoSort(a, b, sort))

    function changeFilter(event: ChangeEvent<HTMLSelectElement>) {
        const newValue = event.target.value;
        if(isFilter(newValue)){
            setFilter(newValue);
        }
    }

    function changeSort(event: ChangeEvent<HTMLSelectElement>) {
        const newValue = event.target.value;
        if(isSort(newValue)) {
            setSort(newValue);
        }
    }

    function removeTodo(id: string) {
        deleteTodo(id);
        setTodoList(todoList.filter(
            (todo) => todo.id !== id
        ));
    }

    return <>
        <h2>Alle Todo's</h2>
        <div className="filter-bar">
            <label>Filter:</label>
            <select name="filter" value={filter} onChange={changeFilter}>
                <option value="all">Alle</option>
                <option value="high-priority">High</option>
                <option value="medium-priority">Medium</option>
                <option value="low-priority">Low</option>
            </select>
            <label>Sort:</label>
            <select name="sort" value={sort} onChange={changeSort}>
                <option value="assignee">Verantwortlich</option>
                <option value="priority">Priorität</option>
            </select>
        </div>
        <ul className="todo-list">
            {visibleTodos.length ?
                visibleTodos.map((todo) => (
                    <li key={todo.id}>
                        <TodoItem todo={todo} deleteTodo={removeTodo}/>
                    </li>
                )) :
                <p style={{color: "darkgray", fontSize: "larger"}}>Keine Todo's vorhanden</p>}
        </ul>
    </>
}

function todoFilter(todo: Todo, filter: Filter): boolean {
    switch (filter) {
        case "all":
            return true;
        case "high-priority":
            return todo.priority === Priority.High
        case "medium-priority":
            return todo.priority === Priority.Medium
        case "low-priority":
            return todo.priority === Priority.Low
        default:
            throw new Error(`Unknown filter ${filter}`);
    }
}

function todoSort(a: Todo, b: Todo, sort: Sort): number {
    switch (sort) {
        case "assignee":
            return a.assignee.localeCompare(b.assignee);
        case "priority":
            if (a.priority === b.priority) {
                return a.assignee.localeCompare(b.assignee);
            } else if (a.priority === Priority.High) {
                return -1;
            } else if (b.priority === Priority.High) {
                return 1;
            } else if (a.priority === Priority.Medium) {
                return -1;
            } else if (b.priority === Priority.Medium) {
                return 1;
            }
            return 0;
        default:
            throw new Error(`Unknown sort ${sort}`);
    }
}

function isFilter(input: string): input is Filter {
    if (input === "all") return true;
    if (input === "high-priority") return true;
    if (input === "medium-priority") return true;
    if (input === "low-priority") return true;
    return false;
}

function isSort(input: string): input is Sort {
    if (input === "assignee") return true;
    if (input === "priority") return true;
    return false;
}