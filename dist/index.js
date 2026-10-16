"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const repository_1 = require("./repository");
function fetchTasks() {
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
async function main() {
    const taskRepository = new repository_1.Repository();
    try {
        console.log("Loading tasks");
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
        const update = {
            status: "in-progress"
        };
        taskRepository.update(newTask.id, update);
        console.log("Task updated :\n");
        console.log(taskRepository.getById(newTask.id));
        const todoTasks = taskRepository.filter(task => task.status === "todo");
        console.log("todo tasks :\n");
        console.log(todoTasks);
        taskRepository.remove(2);
        console.log("Tasks after removing :\n");
        console.log(taskRepository.filter(() => true));
        console.log("Notifications :\n");
        console.log((0, models_1.formatNotification)({
            kind: "reminder",
            taskTitle: "Complete the assignment"
        }));
        console.log((0, models_1.formatNotification)({
            kind: "completed",
            taskTitle: "TypeScript assignment"
        }));
        console.log((0, models_1.formatNotification)({
            kind: "overdue",
            taskTitle: "Submit assignment",
            dueDate: new Date("2026-10-16")
        }));
        const userRepository = new repository_1.Repository();
        userRepository.add({
            name: "Alex"
        });
        console.log("User :\n");
        console.log(userRepository.getById(1));
    }
    catch (error) {
        console.error("Could not load tasks:", error);
    }
}
main();
