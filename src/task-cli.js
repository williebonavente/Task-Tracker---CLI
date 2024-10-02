const yargs = require('yargs');
const fs = require('fs');
const { format } = require('path');

// In-memory task storage
let tasks = [];

// Load tasks from a file (optional)
const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync('./tasks.json');
        tasks = JSON.parse(dataBuffer.toString());
    } catch (e) {
        tasks = [];
    }
};

// Save the tasks to a file (optional)
const saveTasks = () => {
    const dataJSON = JSON.stringify(tasks, null, 2);
    fs.writeFileSync('./tasks.json', dataJSON);
};


yargs.command({
    command: 'add',
    describe: 'Add a new task',
    handler(argv) {
        loadTasks();

        const description = argv._[1]; // Get the second positional argument, which is the task description

        if (!description) {
            console.log("Task description is required.");
            return;
        }

        const newTask = {
            id: tasks.length + 1,
            description: description, // Use the description from argv._
            status: 'todo',
            createdAt: formatDate(new Date()),
            updatedAt: formatDate(new Date()),
        };

        tasks.push(newTask);
        saveTasks();

        console.log(`Task added successfully (ID: ${newTask.id})`);
    }
});



// Update a task's description using positional arguments
yargs.command({
    command: 'update',
    describe: 'Update a task',
    handler(argv) {
        const targetId = argv._[1]; // Get the first positional argument, which is the task ID
        const newDescription = argv._[2]; // Get the second positional argument, which is the new task description
        loadTasks();
        const task = tasks.find(task => task.id === targetId);
        if (task) {
            task.description = newDescription;
            task.updatedAt = formatDate(new Date());
            saveTasks();
            console.log(`Task updated successfully: (ID ${task.id})`);
        } else {
            console.log("Task not found");
        }
    }
});

yargs.command({
    command: 'todo',
    describe: 'Mark a task as todo',
    handler(argv) {
        loadTasks();
        const targetId = argv._[1];
        const task = tasks.find(task => task.id === targetId);
        if (task) {
            task.status = 'todo';
            task.updatedAt = formatDate(new Date());
            saveTasks();
            console.log(`Task marked as todo: (ID ${task.id})`);
        } else {
            console.log("Task not found");
        }
    }
});

// Mark task as in-progress
yargs.command({
    command: 'mark-in-progress',
    describe: 'Mark a task as in progress',
    handler(argv) {
        loadTasks();
        const targetId = argv._[1]; // Get the first positional argument, which is the task ID
        const task = tasks.find(task => task.id === targetId);
        if (task) {
            task.status = 'in-progress';
            task.updatedAt = formatDate(new Date());
            saveTasks();
            console.log(`Task marked as in-progress: (ID ${task.id})`);
        } else {
            console.log("Task not found.");
        }
    }
});

// Mark task as done
yargs.command({
    command: 'mark-done',
    describe: 'Mark a task as done',
    handler(argv) {
        const targetTask = argv._[1];
        loadTasks();
        const task = tasks.find(task => task.id === targetTask);
        if (task) {
            task.status = 'done';
            task.updatedAt = formatDate(new Date());
            saveTasks();
            console.log(`Task marked as done: (ID ${task.id})`);
        } else {
            console.log("Task not found.");
        }
    }
});

// List tasks
yargs.command({
    command: 'list',
    describe: 'List all tasks or by status',
    handler(argv) {
        loadTasks();
        let filteredTasks = tasks;
        if (argv._[1]) {
            filteredTasks = tasks.filter(task => task.status === argv._[1]);
        }
        filteredTasks.length === 0 ? console.log("No tasks found") : filteredTasks.forEach(task => {
            console.log(`ID: ${task.id}, Description: ${task.description}`);
        });
    }
});

// Delete a task using positional argument
yargs.command({
    command: 'delete',
    describe: 'Delete a task',
    handler(argv) {
        const toDelete = argv._[1]; // Get the second positional argument, which is the task description    
        loadTasks();
        tasks = tasks.filter(task => task.id !== toDelete);
        saveTasks();
        console.log('Task deleted successfully');
    }
});

yargs.command({
    command: 'delete-all',
    describe: 'Delete all tasks',
    handler() {
        deleteAllElements();
    }
})

// Date formatting function
function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString('en-US', options); // Example: "10/02/2024, 3:30:45 PM"
}


function deleteAllElements() {
    tasks = [];
    saveTasks();
    console.log('All tasks deleted successfully');
}

// Parse the command-line arguments
yargs.parse();
