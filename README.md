# README

## Installation and Running

1. npm init -y
2. npm install --save-dev typescript @types/node

3. Install dependencies:
   npm install

4. Compile TypeScript:
   npx tsc
   
5. Run the project:
   node dist/index.js
   

## Utility Types Used

- Omit<T, "id"> — Used in `repository.ts` to create new records without an ID, which the repository assigns automatically.
- Partial<Omit<Task, "id">> — Used in `models.ts` for `TaskUpdate`. It makes task properties optional for updates while excluding the ID.

## Design Choices

- **Generic Repository:** Reuses CRUD operations for both tasks and users.
- **Union Types:** Restrict task statuses and priorities to predefined values.
- **Interfaces:** Define the structure of tasks and users.
- **Discriminated Union:** `Notification` uses `kind` to distinguish notification types.
- **Separation of Concerns:** Models, repository logic, and application execution are kept in separate files.

## In-Progress:

- Working on manage tasksStatus

