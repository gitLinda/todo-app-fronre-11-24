import {Priority, Todo} from "../model/Todo.ts";

interface TodoItemProps {
    todo: Todo
    deleteTodo: (id: string) => void
}

export function TodoItem({todo, deleteTodo}: TodoItemProps) {

    function onEdit(todo: Todo) {
        console.log(`Edit todo ${todo.id}`)
    }

    return (
        <div className="todo-item">
            <div style={{marginRight: "20px"}}>
                <PriorityIcon priority={todo.priority}/>
                {todo.assignee}: {todo.title}
            </div>
            <div>
                <img src="src/assets/edit.png"
                     alt="edit"
                     className="edit-img"
                     onClick={() => onEdit(todo)}
                />
                <img src="src/assets/delete.png"
                     alt="delete"
                     className="delete-img"
                     onClick={() => deleteTodo(todo.id)}
                />
            </div>
        </div>
    )
}

function PriorityIcon({priority}: { priority: Priority }) {
    const low = <img src="src/assets/priority-low.png" alt="low" className="priority-icon"/>
    const medium = <img src="src/assets/priority-medium.png" alt="medium" className="priority-icon"/>
    const high = <img src="src/assets/priority-high.png" alt="high" className="priority-icon"/>

    switch (priority) {
        case Priority.Low:
            return low;
        case Priority.Medium:
            return medium;
        case Priority.High:
            return high;
        default:
            console.log(`Unknown priority ${priority}`);
    }
}

