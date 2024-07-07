import { useState } from "react"

function Ecommerce(){
    const [cart,setcart]=useState([])
    const [show,setshow]=useState(false)
    const changeshow=()=>setshow(!show)
    const [showsort,setsort]=useState(false)
    const changesort=()=>setsort(!showsort)
   

     const [clothes,setClothes] = useState([
    { name: "img 1", cal: 's' ,val:300},
    { name: "img 2", cal: 's' ,val:500},
    { name: "img 3", cal: 'm' ,val:450},
    { name: "img 4", cal: 'l' ,val:150},
  ])
  function sorting(size){
    const list=clothes.filter(item=>item.cal!==size)
    setClothes(list)
}
  const incrementQuantity = (index) => {
    const newCart = [...cart]
    newCart[index].quantity++
    setCart(newCart)
  }
  
  const decrementQuantity = (index) => {
    const newCart = [...cart]
    if (newCart[index].quantity > 1) {
      newCart[index].quantity--
    }
    setCart(newCart)
  }
  const addtocart=(data,index)=>{
    setcart([...cart,{...data,quantity:1}])
    Cl[index].document.getElementById("button").innerText="In cart"
  }
  const cartitem=cart.map((item,index)=><li key={index}>{item.name},{item.val} quan:<button onClick={decrementQuantity}>-</button>{item.quantity}<button onClick={incrementQuantity}>+</button></li>)
  const Cl= clothes.map((cloth,index) => <li key={index}>Name:{cloth.name} , Size:{cloth.cal} , 
  Val:{cloth.val}<button onClick={()=>addtocart(cloth,index)} id="button">Add to Cart</button></li>)
    const count=cart.length
    return(<>
    
    {showsort?<div>Sort by:<button onClick={s=>sorting(s)}>S</button><button>M</button><button>L</button><button onClick={changesort}>Go Back</button></div>:<button onClick={changesort}>Sort</button>}
    {show?<div>
        Items in cart:{count}
    <div>{cartitem}</div>
    <button onClick={changeshow}>Back to Shopping</button>
    </div>:
    <div> Items in cart:{count}
    {Cl}
    <div id="proceed">
        <button>Buy Now</button>
        <button onClick={changeshow}>Cart</button>
    </div>

    </div>
    }
    
    </>
    )
}
export default Ecommerce