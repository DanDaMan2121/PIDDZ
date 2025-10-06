// Array of all menu items with details
const menuItems = [
    {
        id: 1,
        name: "Classic Pepperoni",
        category: "pizza",
        description: "Loaded with pepperoni and mozzarella cheese on our signature sauce",
        price: 12.99
    },
    {
        id: 2,
        name: "Margherita",
        category: "pizza",
        description: "Fresh mozzarella, tomatoes, and basil",
        price: 11.99
    },
    {
        id: 3,
        name: "Meat Lovers",
        category: "pizza",
        description: "Pepperoni, sausage, bacon, and ham",
        price: 14.99
    },
    {
        id: 4,
        name: "Veggie Supreme",
        category: "pizza",
        description: "Peppers, mushrooms, onions, and olives",
        price: 12.99
    },
    {
        id: 5,
        name: "Garlic Knots",
        category: "sides",
        description: "Fresh baked knots with garlic butter",
        price: 5.99
    },
    {
        id: 6,
        name: "Mozzarella Sticks",
        category: "sides",
        description: "Crispy breaded mozzarella",
        price: 6.99
    },
    {
        id: 7,
        name: "Caesar Salad",
        category: "sides",
        description: "Romaine lettuce with caesar dressing",
        price: 7.99
    },
    {
        id: 8,
        name: "Coca-Cola",
        category: "drinks",
        description: "Ice cold Coca-Cola (2L)",
        price: 2.99
    },
    {
        id: 9,
        name: "Lemonade",
        category: "drinks",
        description: "Fresh squeezed lemonade (1L)",
        price: 3.49
    },
    {
        id: 10,
        name: "Chocolate Lava Cake",
        category: "desserts",
        description: "Warm chocolate cake with ice cream",
        price: 5.99
    },
    {
        id: 11,
        name: "Cinnamon Sticks",
        category: "desserts",
        description: "Sweet cinnamon sticks with icing",
        price: 4.99
    }
];

let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

// Render menu
function renderMenu(filter = 'all') {
    const menuContainer = document.getElementById('menu');
    const items = filter === 'all' ? menuItems : menuItems.filter(item => item.category === filter);
    // Generates HTML for each menu item
    const html = items.map(item => `
        <div class="menuItem">
            <div class="item-image">
                <span class="item-category">${item.category}</span>
                <div class="item-name">${item.name}</div>
            </div>
            <div class="item-content">
                <div class="item-description">${item.description}</div>
                <div class="item-footer">
                    <div class="item-price">$${item.price.toFixed(2)}</div>
                    <button class="item-action" data-id="${item.id}" data-category="${item.category}">
                        ${item.category === 'pizza' ? 'Customize' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    // Inserts generated HTML into the menu container
    menuContainer.innerHTML = html;

    // Adds event listeners to action buttons
    document.querySelectorAll('.item-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const category = e.target.dataset.category;
            handleItemAction(id, category);
        });
    });
}

// Handles item action
function handleItemAction(id, category) {
    if (category === 'pizza') {
        window.location.href = './pizzaBuilder.html';
    } else {
        const item = menuItems.find(i => i.id === id);
        addToCart(item);
    }
}

// Adds to the cart
function addToCart(item) {
    cart.push(item);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(item.name + ' added to cart!');
}

// Updates the cart count
function updateCartCount() {
    document.querySelector('.cart-count').textContent = cart.length;
}

// Filters the buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderMenu(e.target.dataset.category);
    });
});

// Cart badge click functionality
document.getElementById('cartBadge').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        window.location.href = './checkout.html';
    }
});

// To Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateCartCount();
});
