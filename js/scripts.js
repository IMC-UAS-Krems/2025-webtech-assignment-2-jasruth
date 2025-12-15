// Cart page ----------------------------------------------------------

// add item to Cart
let cart = [];

function addItems(name, price, image) {
    cart.push({name: name, price: parseFloat(price), image: image });
    updateCartCount();
    updateCartTotal();
    showCartItems();
}

//update items inside of cart
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;
}

//cart total
function updateCartTotal() {
    const cartTotal = document.getElementById("cart-total");

    //subtotal
    let subTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subTotal += cart[i].price;
    }

    //discount calculation
    let discount = 0;
    if (cart.length > 3) {
        discount = subTotal * 0.2;
    }

    //tax
    let tax = (subTotal - discount) * 0.05;

    //total calculation
    let total = subTotal - discount + tax;

    cartTotal.textContent = total.toFixed(2);

}

// display items in cart

function showCartItems() {
    const cartList = document.getElementById("cart-items")
    cartList.innerHTML = "";

    for (var i = 0; i < cart.length; i = i + 1) {
        var li = document.createElement("li")
        li.textContent = cart[i].name + " -$" + cart[i].price.toFixed(2);
        li.className = "list-group-item";
        cartList.appendChild(li);
    }
}

// checkout form
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutForm = document.getElementById("checkout-form");

//button
checkoutBtn.addEventListener("click", function(e) {
    e.preventDefault();
    if (cart.length === 0) {
        alert("No topping(s) in cart!");
        return;
    }
    checkoutForm.style.display = "block";
});

//form
const form = document.getElementById("checkout");

form.addEventListener("submit", function(e){
    e.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const payment = form.querySelector('input[name="payment"]:checked').value;

    console.log("Noodle order placed by:");
    console.log(firstName, lastName);
    console.log("Email:", email);
    console.log("Payment:", payment);
    console.log("Items", cart);

    cart = [];
    updateCartCount();
    updateCartTotal();
    showCartItems();

    checkoutForm.style.display = "none";
    alert("Thank you for ordering from our noodle charity, " + firstName + "!");
});