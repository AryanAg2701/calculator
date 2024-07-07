import React,{useState} from "react";

function AddRemove(){
const[foods,update]=useState(["apple", "banana", "strawberry"])

function AddFood(){
    const newfood=document.getElementById("food").value;
    document.getElementById("food").value="";

    update(f=>[...f,newfood]);
}
function RemoveFood(index){
    update(foods.filter((_,i)=> i!=index))
}
return(
    <>
    <ul>
        {foods.map((fruits,index)=><li onClick={()=>RemoveFood(index)}key={index}>{fruits}</li>)}
    </ul>
    <input type="text" placeholder="Enter food name" id="food"/>
    <button onClick={AddFood}>Add</button>
    </>
)
}
export default AddRemove;
