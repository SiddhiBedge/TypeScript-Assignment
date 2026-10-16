import { Task, User, formatNotification, TaskUpdate } from "./models";
import { Repository } from "./repository";

function fetchTasks(): Promise<Task[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 101,
                    title: "Task 1",
                    status: "todo",
                    priority: "high",
                    dueDate: new Date("2026-10-20")
                },
                {
                    id: 102,
                    title: "Task 2",
                    status: "in-progress",
                    priority: "medium"
                },
                {
                    id: 103,
                    title: "Task 3",
                    status: "done",
                    priority: "low"
                }
            ]);
        }, 2000);
    });
}

async function main(): Promise<void> {
    const taskRepository = new Repository<Task>();

    try {
        console.log("Loading tasks...");

        const tasks = await fetchTasks();

        for (const task of tasks) {
            const { id, ...taskDetails } = task;
            taskRepository.add(taskDetails);
        }

        console.log("All tasks :\n");
        console.log(taskRepository.filter(() => true));

        const newTask = taskRepository.add({
            title: "Task 4",
            status: "todo",
            priority: "high",
            dueDate: new Date("2026-10-25")
        });

        console.log("Task created :\n");
        console.log(newTask);

        // taskRepository.update(newTask.id, {
        //     status: "in-progress"
        // });

        const update: TaskUpdate = {
            status: "in-progress"
        };

        taskRepository.update(newTask.id, update);

        console.log("Task updated :\n");
        console.log(taskRepository.getById(newTask.id));

        const todoTasks = taskRepository.filter(
            task => task.status === "todo"
        );

        console.log("todo tasks :\n");
        console.log(todoTasks);

        taskRepository.remove(2);

        console.log("Tasks after removing :\n");
        console.log(taskRepository.filter(() => true));

        console.log("Notifications :\n");

        console.log(formatNotification({
            kind: "reminder",
            taskTitle: "Complete the assignment"
        }));

        console.log(formatNotification({
            kind: "completed",
            taskTitle: "TypeScript assignment"
        }));

        console.log(formatNotification({
            kind: "overdue",
            taskTitle: "Submit assignment",
            dueDate: new Date("2026-10-16")
        }));

        const userRepository = new Repository<User>();

        userRepository.add({
            name: "Alex"
        });

        console.log("User :\n");
        console.log(userRepository.getById(1));

    } catch (error) {
        console.error("Could not load tasks:", error);
    }
}

main();
