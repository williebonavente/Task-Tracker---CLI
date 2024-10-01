// Add, Update, and Delete tasks
// Mark tasks as done
// Lists all tasks
// Lists all tasks that are done
// Lists all tasks that are not done
// Lists all tasks that in progress

// task-cli.js
const yargs = require('yargs');
const fs = require('fs');
const { type } = require('os');

// In-memory task storage  (you could persist this using a file or database)
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

// Add
yargs.command({
    command: 'add',
    describe: 'Add a new task',
    builder: {
        description: {
            describe: 'Task description',
            demandOption: true,
            type: 'string',
        }
    },

    handler(argv) {
        loadTasks();
        const newTask = {
            id: tasks.length + 1,
            description: argv.description,
            status: 'todo',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toLocaleDateString()
        };
        tasks.push(newTask);
        saveTasks();
        console.log(`Task added: (ID ${newTask.id})`);
    }
});

// Update 
yargs.command({
    command: 'update',
    describe: 'Update a task',
    builder: {
        id: {
            describe: 'Task ID',
            demandOption: true,
            type: 'number'
        },
        description: {
            describe: 'Task description',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        loadTasks();
        const task = tasks.find(task => task.id === argv.id);
        if (task) {
            task.description = argv.description;
            task.updatedAt = new Date().toISOString();
            saveTasks();
            console.log(`Task updated successfully: (ID ${task.id})`);
        } else {
            console.log("Task not found");
        }
    }
});

yargs.command({
    command: 'delete',
    describe: 'Delete a task',
    builder: {
        id: {
            describe: 'Task ID',
            demandOption: true,
            type: 'number'
        }
    },

    handler(argv) {
        loadTasks();
        tasks = tasks.filter(task => task.id !== argv.id);
        saveTasks();
        console.log('Task deleted successfully');
    }
});

// Mark task as in progress
yargs.command({
    command: 'mark-in-progress',
    describe: 'Mark a task as in progress',
    builder: {
        id: {
            describe: 'Task ID',
            demandOption: true,
            type: 'number'
        }
    },
    handler(argv) {
        loadTasks();
        const task = tasks.find(task => task.id === argv.id);
        if (tasks) {
            task.status = 'in-progress';
            saveTasks();
            console.log(`Task marked as in progress: (ID ${task.id})`);
        } else {
            console.log("Task not found.")
        }
    }
});

yargs.command({
    command: 'mark-done',
    describe: 'Mark a task as done',
    builder: {
        id: {
            describe: 'Task ID',
            demandOption: true,
            type: 'number',
        }
    },
    handler(argv) {
        loadTasks();
        const task = tasks.find(task => task.id === argv.id);
        if (task) {
            task.status = 'done';
            task.updatedAt = new Date().toISOString();
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
    builder: {
        status: {
            describe: 'Filter by status (todo, in-progress, done)',
            type: 'string'
        }
    },
    handler(argv) {
        loadTasks();
        let filteredTasks = tasks;
        if (argv.status) {
            filteredTasks = tasks.filter(tasks => tasks.status === argv.status);
        }
        console.log('Tasks:');
        filteredTasks.forEach(task => {
            console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${task.status}`);
        });
    }
});
// Parse the command-line arguments
yargs.parse()