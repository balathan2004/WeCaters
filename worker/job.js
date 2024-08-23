



if(process && process.send){
const args = process.argv.slice(2); 
console.log("Job started with data:", args);
process.send({ status: 'done', data: args });
}


