let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

function updateCart() {
    document.getElementById('cart-count').textContent = cart.length;
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function checkout() {
    fetch('/create-checkout-session', {
        method: 'POST',
    headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart })
    })
    .then(res => res.json())
    .then(data => window.location.href = data.url)
    .catch(err => alert('Error: ' + err));
}