export type TaskStatus = "todo" | "in-progress" | "done" |"cancelled";

export type TaskPriority = "low" | "medium" | "high";

// export type AllowedNextStatus = {
//     todo: "in-progress" | "cancelled";
//     "in-progress": "todo" | "done" | "cancelled";
//     done: never
//     cancelled: never
// }

export interface Task{
    id: number;
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: Date;
}

export type TaskUpdate = Partial<Omit<Task, "id">>; //

export interface User{
    id: number;
    name: string;
}

export type Notification =
    { kind: "reminder"; taskTitle: string } |
    { kind: "completed"; taskTitle: string } |
    { kind: "overdue"; taskTitle: string; dueDate: Date };

export function formatNotification(notification: Notification): string{
    switch (notification.kind){
        case "reminder":
            return `Reminder: ${notification.taskTitle} I am still waiting.`;

        case "completed":
            return `Completed: ${notification.taskTitle} is done.`;

        case "overdue":
            return `Overdue: ${notification.taskTitle} was due on ${notification.dueDate.toDateString()}.`;
    }
}
