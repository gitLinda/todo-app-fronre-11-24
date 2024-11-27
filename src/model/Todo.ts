export enum Priority {
    Low = "LOW",
    Medium = "MEDIUM",
    High = "HIGH"
}

export interface Todo {
    id: string;
    assignee: string;
    priority: Priority;
    title: string;
    description: string;
}

export type NewTodo = Pick<Todo, "assignee" | "priority" | "title" | "description">