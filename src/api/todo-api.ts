import { v4 as uuidv4 } from 'uuid';
import {NewTodo, Todo} from "../model/Todo.ts";


interface TodoStorage {
    todoList: Todo[];
}

const STORAGE_KEY = 'todoStorage';

export function addTodo(todo: NewTodo): string {
    const newTodo: Todo = {
        ...todo,
        id: uuidv4(),
    };
    const todoStorage: TodoStorage = loadStorage();

    todoStorage.todoList = [...todoStorage.todoList, newTodo];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoStorage));

    return newTodo.id;
}

export function loadTodoList(): Todo[] {
    const todoStorage: TodoStorage = loadStorage();
    return todoStorage.todoList;
}

export function loadTodo(todoId: string): Todo {
    const todoStorage: TodoStorage = loadStorage();

    const possibleTodo = todoStorage.todoList.find((todo) => todo.id === todoId);
    if (!possibleTodo) {
        throw new Error(`Could not find todo with id ${todoId}`);
    }
    return possibleTodo;
}

export function deleteTodo(todoId: string): void {
    const todoStorage: TodoStorage = loadStorage();

    todoStorage.todoList = todoStorage.todoList.filter(
        (todo) => todo.id !== todoId
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoStorage));
}

function loadStorage(): TodoStorage {
    const content = localStorage.getItem(STORAGE_KEY);
    return content
        ? JSON.parse(content)
        : { todoList: [] };
}
