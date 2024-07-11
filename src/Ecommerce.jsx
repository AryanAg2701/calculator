import { useState } from "react"; // Importing useState hook

function Ecommerce() {
    const [cart, setcart] = useState([]); // State for cart items
    const [show, setshow] = useState(false); // State for showing cart
    const changeshow = () => setshow(!show); // Function to toggle cart display
    const [showsort, setsort] = useState(false); // State for showing sorting options
    const changesort = () => setsort(!showsort); // Function to toggle sorting options display

    // Initial state for clothes with name, size, and value
    const [clothes, setClothes] = useState([
        { name: "img 1", cal: 's', val: 300 },
        { name: "img 2", cal: 's', val: 500 },
        { name: "img 3", cal: 'm', val: 450 },
        { name: "img 4", cal: 'l', val: 150 },
    ]);

    // Function to filter clothes based on size for sorting
    function sorting(size) {
        const list = clothes.filter(item => item.cal !== size);
        setClothes(list);
    }

    // Function to increment quantity of an item in cart
    const incrementQuantity = (index) => {
        const newCart = [...cart];
        newCart[index].quantity++;
        setcart(newCart);
    };

    // Function to decrement quantity of an item in cart
    const decrementQuantity = (index) => {
        const newCart = [...cart];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity--;
        }
        setcart(newCart);
    };

    // Function to add item to cart
    const addtocart = (data, index) => {
        setcart([...cart, { ...data, quantity: 1 }]);
        Cl[index].document.getElementById("button").innerText = "In cart"; // Change button text
    };

    // Mapping cart items to JSX list elements
    const cartitem = cart.map((item, index) => (
        <li key={index}>
            {item.name},{item.val} quan:
            <button onClick={() => decrementQuantity(index)}>-</button>
            {item.quantity}
            <button onClick={() => incrementQuantity(index)}>+</button>
        </li>
    ));

    // Mapping clothes to JSX list elements
    const Cl = clothes.map((cloth, index) => (
        <li key={index}>
            Name:{cloth.name}, Size:{cloth.cal}, Val:{cloth.val}
            <button onClick={() => addtocart(cloth, index)} id="button">Add to Cart</button>
        </li>
    ));

    const count = cart.length; // Count of items in cart

    return (
        <>
            {showsort ? (
                <div>Sort by:<button onClick={() => sorting('s')}>S</button><button onClick={() => sorting('m')}>M</button><button onClick={() => sorting('l')}>L</button><button onClick={changesort}>Go Back</button></div>
            ) : (
                <button onClick={changesort}>Sort</button>
            )}
            {show ? (
                <div>
                    Items in cart:{count}
                    <div>{cartitem}</div>
                    <button onClick={changeshow}>Back to Shopping</button>
                </div>
            ) : (
                <div>
                    Items in cart:{count}
                    {Cl}
                    <div id="proceed">
                        <button>Buy Now</button>
                        <button onClick={changeshow}>Cart</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Ecommerce;
