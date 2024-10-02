# CLI Commands
`src` - A folder contains all the files in the project
`task-cli.js` - is responsible for the CRUD operations, it is the life of the program.
`task.json` - acting as a database or storage for the data input in the `task-cli.js
```
# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```

**1st** Backend Project in RoadMap.sh 
https://roadmap.sh/projects/task-tracker