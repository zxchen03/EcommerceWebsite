const validDiscountCode = "PENSHOPPEXBINI"; 

function checkDiscount(button) {
    const form = button.closest('.product-form');
    const discountCodeInput = form.querySelector('.discount-code').value;
    const quantityInput = parseInt(form.querySelector('.quantity').value);
    const price = parseFloat(form.dataset.price);
    const messageElement = form.querySelector('.message');

    let discount = 0;

    
    if (discountCodeInput === validDiscountCode) {
        discount = 0.10; 
    }

   
    const totalPrice = price * quantityInput * (1 - discount);
    messageElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

function verifyAvailability(button) {
    const form = button.closest('.product-form');
    const quantityInput = parseInt(form.querySelector('.quantity').value);
    const availableStock = parseInt(form.querySelector('.stock-quantity').textContent);
    const messageElement = form.querySelector('.message');

  
    if (quantityInput <= 0) {
        messageElement.textContent = "Please enter a valid quantity.";
    } else if (quantityInput > availableStock) {
        messageElement.textContent = "Requested quantity is not available.";
    } else {
        messageElement.textContent = "Quantity is available.";
    }
}

let cart = [];

function addToCart(button) {
    const productForm = button.closest('.product-form');
    const productName = productForm.previousElementSibling.innerText;
    const quantity = parseInt(productForm.querySelector('.quantity').value);
    const price = parseFloat(productForm.dataset.price);

    const item = {
        name: productName,
        quantity: quantity,
        price: price,
        total: quantity * price,
    };

    cart.push(item);
    alert(`${quantity} x ${productName} has been added to your cart!`);
    console.log(cart);
}

function filterProducts() {
    const filterValue = document.getElementById('category-filter').value;
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        if (filterValue === 'all' || product.classList.contains(filterValue)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
function viewCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.quantity} x ${item.name} - $${item.total.toFixed(2)}`;
        cartContainer.appendChild(itemElement);
        total += item.total;
    });

    totalElement.textContent = `Total Price: $${total.toFixed(2)}`;
}
function addToCart(button) {
    const productForm = button.closest('.product-form');
    const productName = productForm.previousElementSibling.innerText;
    const quantity = parseInt(productForm.querySelector('.quantity').value);
    const price = parseFloat(productForm.dataset.price);

    const item = {
        name: productName,
        quantity: quantity,
        price: price,
        total: quantity * price,
    };

    cart.push(item);
    alert(`${quantity} x ${productName} has been added to your cart!`);
    viewCart();
    console.log(cart);
}
let products = [];

function addOrUpdateProduct() {
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const quantity = parseInt(document.getElementById('product-quantity').value);
    const price = parseFloat(document.getElementById('product-price').value);

    let productIndex = products.findIndex(product => product.name === name);

    if (productIndex !== -1) {
        products[productIndex].quantity += quantity;
        products[productIndex].price = price;
    } else {
        products.push({ name, category, quantity, price });
    }

    document.getElementById('product-name').value = '';
    document.getElementById('product-category').value = '';
    document.getElementById('product-quantity').value = '';
    document.getElementById('product-price').value = '';

    displayProducts();
}

function removeProduct() {
    const nameToRemove = document.getElementById('remove-product-name').value;
    const productIndex = products.findIndex(product => product.name === nameToRemove);

    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        alert(`${nameToRemove} removed successfully.`);
    } else {
        alert('Product not found.');
    }

    document.getElementById('remove-product-name').value = '';
    displayProducts();
}

function displayProducts() {
    const tableBody = document.getElementById('product-table-body');
    tableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = product.category;
        row.appendChild(categoryCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = product.quantity;
        row.appendChild(quantityCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = `$${product.price.toFixed(2)}`;
        row.appendChild(priceCell);

        tableBody.appendChild(row);
    });

    calculateTotalValue();
}

function calculateTotalValue() {
    const totalValue = products.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
    }, 0);

    document.getElementById('total-value').textContent = `Total Inventory Value: $${totalValue.toFixed(2)}`;
}

function searchProducts() {
    const keyword = document.getElementById('search-keyword').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
    );
    displayFilteredProducts(filteredProducts);
}

function filterByCategory() {
    const selectedCategory = document.getElementById('category-filter').value;
    const filteredProducts = selectedCategory === 'all' ?
        products : products.filter(product => product.category === selectedCategory);
    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
    const tableBody = document.getElementById('product-table-body');
    tableBody.innerHTML = '';

    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.quantity}</td>
            <td>$${product.price.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    });

    calculateTotalValue();
}



let cartItems = []; // Array to store cart items
let cartTotal = 0;

// Function to add item to the cart
function addToCart(button) {
    // Get product details
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-card__title').textContent;
    const productPrice = parseFloat(productCard.querySelector('.product-card__price').textContent.replace('Price: $', ''));
    const quantity = parseInt(productCard.querySelector('.quantity').value);

    // Update cart total and cart count
    cartTotal += productPrice * quantity;
    cartItems.push({ name: productName, price: productPrice, quantity });

    // Update cart icon
    updateCartIcon();

    // Animate product image flying into the cart
    const productImage = productCard.querySelector('.product-card__image');
    const cartIcon = document.getElementById('cart-icon');

    const flyingImage = productImage.cloneNode();
    flyingImage.classList.add('fly-to-cart');
    document.body.appendChild(flyingImage);

    // Set initial position of the flying image
    const startPosition = productImage.getBoundingClientRect();
    flyingImage.style.position = 'absolute';
    flyingImage.style.left = `${startPosition.left + window.scrollX}px`;
    flyingImage.style.top = `${startPosition.top + window.scrollY}px`;
    flyingImage.style.width = `${startPosition.width}px`;
    flyingImage.style.height = `${startPosition.height}px`;

    // Animate the flying image
    setTimeout(() => {
        flyingImage.style.left = `${cartIcon.getBoundingClientRect().left + window.scrollX}px`;
        flyingImage.style.top = `${cartIcon.getBoundingClientRect().top + window.scrollY}px`;
        flyingImage.style.width = '30px';
        flyingImage.style.height = '30px';
    }, 10);

    // After animation, remove the flying image
    setTimeout(() => {
        flyingImage.remove();
        showCart(); // Show the cart after adding the item
    }, 1000); // Matches the duration of the animation

    // Update cart in sidebar
    updateCartSidebar();
}

// Function to update the cart icon (cart count)
function updateCartIcon() {
    document.getElementById('cart-count').textContent = cartItems.length;
}

// Function to show the cart (slide in the cart sidebar)
function showCart() {
    document.getElementById('cart-sidebar').style.right = '0';
}

// Function to close the cart
document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-sidebar').style.right = '-300px';
});

// Function to update the cart sidebar with items and total
function updateCartSidebar() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = ''; // Clear existing items

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
        cartItemsList.appendChild(listItem);
    });

    document.getElementById('total-price').textContent = cartTotal.toFixed(2);
}



// product details 

