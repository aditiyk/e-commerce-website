let carts = document.querySelectorAll('.addToCart');

let products = [{
    name: "Beige Cardigan",
    tag: "image1",
    price: 1000,
    inCart: 0
},
{
    name: "Black Cardigan",
    tag: "image4",
    price: 500,
    inCart: 0
},
{
    name: "Denim Skirt",
    tag: "image5",
    price: 2000,
    inCart: 0
}
];
for(let i = 0; i< carts.length; i++ ){
   carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
}

function cartNumbers(product){
    //console.log('the product clicked is', products)
    let productNumbers = localStorage.getItem('cartNumbers');
   // console.log( typeof productNumbers);
     productNumbers = parseInt(productNumbers);
    // console.log( typeof productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers +1);
        document.querySelector('.cart span').textContent=productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent=1;

    }

    setItems(product);
   
}

function setItems(product){
  
    let cartItems= localStorage.getItem('productsInCart');

    cartItems = JSON.parse(cartItems);
    // we want to convert from JSON to a JS object that's why we use JSON.parse
   //console.log("my cart items are" , cartItems);
  
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){

            cartItems ={
                ...cartItems,
                [product.tag]: product
        }
    }

        cartItems[product.tag].inCart +=  1;
    }else{
        cartItems= {
            [product.tag] : product
        }
    }
    product.inCart = 1;
    cartItems={
        [product.tag]: product
    }
   
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');

    //console.log(typeof cartCost) ---> returns string
   
    //converting from a string into a number

    if(cartCost != null){
        cartCost= parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else{
        localStorage.setItem("totalCost", product.price);
    }
    
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
     cartItems= JSON.parse(cartItems);
    console.log(cartItems);
  
    let productContainer = document.querySelector('.products');
    if(cartItems && productContainer){
        
        productContainer.innerHTML='';
        Object.values(cartItems).map((item )=> {
           
            console.log(cartItems);
            productContainer.innerHTML += ` <div class="products">
            <i class="fas fa-times-circle"></i>
            <img src="${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
           
            <div class="total">Rs${item.inCart* item.price}</div>
            
            ` 
        });
    }
}

onLoadCartNumbers();
displayCart();