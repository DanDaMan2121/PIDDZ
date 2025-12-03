// JavaScript with Firebase Integration
import firebaseService from './firebase-service.js';

const ordersContainer = document.getElementById('ordersContainer');
const emptyState = document.getElementById('emptyState');
const refreshBtn = document.getElementById('refreshBtn');

let unsubscribe = null;

/**
 * Format timestamp to a readable date or time
 */
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

/**
 * Creates an order card HTML
 */
function createOrderCard(order) {
    const card = document.createElement('div');
    card.className = 'order-card';
    card.dataset.orderId = order.orderId;
    
    // Order header
    const header = document.createElement('div');
    header.className = 'order-header';
    
    const orderInfo = document.createElement('div');
    orderInfo.innerHTML = `
        <div class="order-id">Order #${order.orderId.substring(0, 6).toUpperCase()}</div>
        <div class="order-time">${formatTimestamp(order.timestamp)}</div>
    `;
    
    const statusBadge = document.createElement('span');
    statusBadge.className = `order-status status-${order.status}`;
    statusBadge.textContent = order.status;
    
    header.appendChild(orderInfo);
    header.appendChild(statusBadge);
    
    // Order items
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'order-items';
    
    order.items.forEach(itemStr => {
        const item = JSON.parse(itemStr);
        const itemDiv = document.createElement('div');
        itemDiv.className = 'order-item';
        
        let itemName = `${item.size} ${item.crust}`;
        if (item.quantity > 1) {
            itemName += ` (x${item.quantity})`;
        }
        
        let toppingsList = item.toppings.map(t => 
            `${t[0]} (${t[1]} ${t[2]})`
        ).join(', ');
        
        itemDiv.innerHTML = `
            <div class="item-name">🍕 ${itemName}</div>
            <div class="item-details">
                ${item.sauce[0]}, Cheese${toppingsList ? ', ' + toppingsList : ''}
            </div>
        `;
        
        itemsContainer.appendChild(itemDiv);
    });
    
    // Location
    const locationDiv = document.createElement('div');
    locationDiv.className = 'order-location';
    locationDiv.innerHTML = `
        <div class="location-label">📍 Delivery Address</div>
        <div>${order.location[0]}</div>
        <div>${order.location[1]}</div>
    `;
    
    // Total
    const totalDiv = document.createElement('div');
    totalDiv.className = 'order-total';
    totalDiv.innerHTML = `
        <span class="total-label">Total (with tax)</span>
        <span class="total-amount">$${order.totalWithTax.toFixed(2)}</span>
    `;
    
    // Status buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'status-buttons';
    
    if (order.status === 'pending') {
        const prepareBtn = document.createElement('button');
        prepareBtn.className = 'status-btn btn-preparing';
        prepareBtn.textContent = 'Start Preparing';
        prepareBtn.onclick = () => updateStatus(order.orderId, 'preparing');
        buttonsDiv.appendChild(prepareBtn);
    }
    
    if (order.status === 'preparing') {
        const readyBtn = document.createElement('button');
        readyBtn.className = 'status-btn btn-ready';
        readyBtn.textContent = 'Mark Ready';
        readyBtn.onclick = () => updateStatus(order.orderId, 'ready');
        buttonsDiv.appendChild(readyBtn);
    }
    
    if (order.status === 'ready') {
        const deliveredBtn = document.createElement('button');
        deliveredBtn.className = 'status-btn btn-delivered';
        deliveredBtn.textContent = 'Mark Delivered';
        deliveredBtn.onclick = () => updateStatus(order.orderId, 'delivered');
        buttonsDiv.appendChild(deliveredBtn);
    }
    
    // Assemble card
    card.appendChild(header);
    card.appendChild(itemsContainer);
    card.appendChild(locationDiv);
    card.appendChild(totalDiv);
    if (buttonsDiv.children.length > 0) {
        card.appendChild(buttonsDiv);
    }
    
    return card;
}

/**
 * Updates the order status
 */
async function updateStatus(orderId, newStatus) {
    try {
        await firebaseService.updateOrderStatus(orderId, newStatus);
        console.log(`Order ${orderId} updated to ${newStatus}`);
    } catch (error) {
        console.error('Error updating order status:', error);
        alert('Failed to update order status. Please try again.');
    }
}

/**
 * Display the orders on the dashboard
 */
function displayOrders(orders) {
    ordersContainer.innerHTML = '';
    
    if (!orders || orders.length === 0) {
        emptyState.style.display = 'block';
        ordersContainer.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    ordersContainer.style.display = 'grid';
    
    // Filters out the delivered orders older than 1 hour
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    const activeOrders = orders.filter(order => 
        order.status !== 'delivered' || order.timestamp > oneHourAgo
    );
    
    activeOrders.forEach(order => {
        const card = createOrderCard(order);
        ordersContainer.appendChild(card);
    });
}

/**
 * Initializes the dashboard with real-time updates
 */
async function initDashboard() {
    try {
        unsubscribe = firebaseService.listenToOrders((orders) => {
            displayOrders(orders);
        });
        
        console.log('Dashboard initialized with real-time updates');
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        emptyState.innerHTML = `
            <div class="empty-state-icon">⚠️</div>
            <div class="empty-state-text">Error loading orders. Please refresh the page.</div>
        `;
        emptyState.style.display = 'block';
    }
}

/**
 * Refreshes the orders manually
 */
refreshBtn.addEventListener('click', async () => {
    refreshBtn.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        refreshBtn.style.transform = 'rotate(0deg)';
    }, 500);
    
    try {
        const orders = await firebaseService.getAllOrders();
        displayOrders(orders);
    } catch (error) {
        console.error('Error refreshing orders:', error);
    }
});

document.addEventListener('DOMContentLoaded', initDashboard);

window.addEventListener('beforeunload', () => {
    if (unsubscribe) {
        unsubscribe();
    }
});