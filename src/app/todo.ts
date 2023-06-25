export interface Todo {
    id: number;
    title: string;
    dueDate: string;
}

export interface TodoResponse {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}