"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNotification = formatNotification;
function formatNotification(notification) {
    switch (notification.kind) {
        case "reminder":
            return `Reminder: ${notification.taskTitle} I am still waiting.`;
        case "completed":
            return `Completed: ${notification.taskTitle} is done.`;
        case "overdue":
            return `Overdue: ${notification.taskTitle} was due on ${notification.dueDate.toDateString()}.`;
    }
}
