// main.js
const path =require('path');
const { fork } = require('child_process');

const filepath=path.join(process?.cwd()+'/worker/job.js')
console.log(filepath);

 function runBackgroundJob(data:object) {
    const child = fork( filepath, data); // Pass data as arguments

    // Listen for messages from the child process
    child.on('message', (message:string) => {
        console.log('Message from child:', message);
    });

    // Handle exit event of the child process
    child.on('exit', (code:string) => {
        console.log(`Child process exited with code ${code}`);
    });
}

module.exports=runBackgroundJob

//runBackgroundJob(["light"])

