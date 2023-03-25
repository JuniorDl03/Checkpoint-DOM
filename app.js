// Récupére les ELEMENTS
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

// RENDER PRODUCTS
function renderProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2>${product.price} <small>F.CFA</small></h2>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div onclick="change()" id="add-to-wishlist">
                    <img src="./icons/heart.png" alt="add to wish list">
                </div>
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `;
  });
}
renderProducts();


// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// Ajoute à la carte 
function addToCart(id) {
  // vérifie si le produit existe dans la carte
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // enregistre to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculer et rendre le total
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Total ( ${totalItems} items ) : ${totalPrice.toFixed(3)} F.CFA`;
  totalItemsInCartEl.innerHTML = totalItems;
}

// render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // efface les éléments de la carte
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                ${item.price}  <small>F.CFA</small>
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
        </div>
      `;
  });
}



// enlever les items de la carte
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}


// changer nombre d'unité d'un item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();

}


//bouton cliquable
let like = true;
function change(){
  let button = document.getElementById("add-to-wishlist");
  if(like == true){
    button.style.backgroundColor = 'red';
    like = false;
  }
  else {
    button.style.backgroundColor = 'grey';
    like = true;
  }
}

