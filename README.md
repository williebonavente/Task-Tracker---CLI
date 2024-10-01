# CLI Commands
`src` - A folder contains all the files in the project
`task-cli.js` - is responsible for the CRUD operations, it is the life of the program.
`task.json` - acting as a database or storage for the data input in the `task-cli.js`
```adding
node task-cli.js add --description="Learning C"
```
```marking as done
node task-cli.js update --id=1 --description="Learning C"
```
```listing all status accordingly
node task-cli.js list
node task-cli.js list --status=done
```

**1st** Backend Project in RoadMap.sh 
https://roadmap.sh/projects/task-tracker