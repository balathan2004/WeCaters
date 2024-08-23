import { inngestClient } from "./workLoad"

export const testingRoute=inngestClient.createFunction({
    id:"testing-route",name:"testing-route"
},{event:"testing/testing-router"},
async ({event})=>{
    if(event.data){
console.log(event.data);
    }
}
)