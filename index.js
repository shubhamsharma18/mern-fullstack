let str="sh-a 3i@"
let arr=str.split("")
let conditions=[" ","@","#"]
// for(let i=0;i<=str.length-1;i++){
    
//     if(str[i]===){
//        arr.push(str[i])
//     }

// }
// console.log(arr);
// for(let i=0;i<=arr.length;i++){


// }
// console.log(arr);


let obj={name:"shuham",add:{
    yes:true
}}
let newobj=  Object.assign({},obj)

newobj.name="Ankush"
console.log(obj,newobj);




// let obj1=new Object()
// console.log(obj1);
// obj1.name="shubham"
// console.log(obj1);





let strs="Shubham@ #$545 sharma"
let newarr=[]
for(let i=0;i<=strs.length-1;i++){
if((strs[i]>="a" && strs[i]<="z")|| (strs[i]>="A" && strs[i]<="Z")  || strs[i]===" "){
newarr.push(strs[i])
}


}
console.log(newarr.join(""))


const obj={x:2}
const arr=[obj]
obj.x=55
console.log(arr[0].x);
