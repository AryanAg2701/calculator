import React, { useState } from "react";

function AddRemove() {
    const [foods, update] = useState(["apple", "banana", "strawberry"]); // State for storing list of foods

    // Function to add a new food item to the list
    function AddFood() {
        const newfood = document.getElementById("food").value; // Get the value from input
        document.getElementById("food").value = ""; // Clear input field

        update(f => [...f, newfood]); // Update foods state with new food item
    }

    // Function to remove a food item from the list by index
    function RemoveFood(index) {
        update(foods.filter((_, i) => i !== index)); // Update foods state by filtering out the item at index
    }

    return (
        <>
            <ul>
                {/* Mapping through foods array to display each food item as a list item */}
                {foods.map((fruits, index) => (
                    <li onClick={() => RemoveFood(index)} key={index}>{fruits}</li>
                ))}
            </ul>
            <input type="text" placeholder="Enter food name" id="food" /> {/* Input field for adding new food */}
            <button onClick={AddFood}>Add</button> {/* Button to add a new food item */}
        </>
    );
}

export default AddRemove;
