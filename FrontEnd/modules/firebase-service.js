// Firebase Database Service for PIDDZ Pizza App


import { database, initializeFirebase, push, set, ref, get, child} from './firebase-config.js';

export class FirebaseService {

    //  Order Management

    constructor() {
        initializeFirebase()
    }
    
    /**
     * Save a new order to Firebase
     * @param {Object} orderData - Complete order information
     * @returns {Promise<string>} - Order ID
     */
    async saveOrder(orderData) {
        try {
            const ordersRef = ref(database, 'StoreOrders'); // reference to the orders table
            const newOrderRef = push(ordersRef);
            
            const order = {
                orderId: newOrderRef.key,
                items: orderData.items,
                location: orderData.location,
                totalCost: orderData.totalCost,
                tax: orderData.tax,
                totalWithTax: orderData.totalWithTax,
                status: 'pending',
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                estimatedTime: '30-45 minutes'
            };
            
            await set(ordersRef, order);
            console.log('Order saved successfully:', order.orderId);
            return order.orderId;
            
        } catch (error) {
            console.error('Error saving order:', error);
            throw error;
        }
    }
    
    /**
     * Get all orders (for business dashboard)
     * @returns {Promise<Array>} - Array of all orders
     */
    async getAllOrders() {
        try {
            const ordersRef = ref(database, 'StoreOrders');
            const snapshot = await ordersRef.once('value');
            
            if (!snapshot.exists()) {
                return [];
            }
            
            const orders = [];
            snapshot.forEach((childSnapshot) => {
                orders.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            
            // Sorts this by timestamp (newest first)
            orders.sort((a, b) => b.timestamp - a.timestamp);
            return orders;
            
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    }
    
    /**
     * Gets a specific order by ID
     * @param {string} orderId - Fetches the order ID
     * @returns {Promise<Object>} - Order data
     */
    async getOrder(orderId) {
        try {
            const orderRef = ref(database, `StoreOrders/${orderId}`);
            const snapshot = await orderRef.once('value');
            
            if (!snapshot.exists()) {
                throw new Error('Order not found');
            }
            
            return snapshot.val();
            
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error;
        }
    }
    
    /**
     * Updates the order status
     * @param {string} orderId 
     * @param {string} status 
     * @returns {Promise<void>}
     */
    async updateOrderStatus(orderId, status) {
        try {
            const orderRef = ref(database, `StoreOrders/${orderId}`);
            await orderRef.update({
                status: status,
                lastUpdated: firebase.database.ServerValue.TIMESTAMP
            });
            console.log(`Order ${orderId} updated to ${status}`);
            
        } catch (error) {
            console.error('Error updating order status:', error);
            throw error;
        }
    }
    
    /**
     * Listen for real-time order updates
     * @param {Function} callback - Function to call when orders change
     * @returns {Function} - Unsubscribe function
     */
    listenToOrders(callback) {
        const ordersRef = ref(database, 'StoreOrders');
        
        ordersRef.on('value', (snapshot) => {
            const orders = [];
            snapshot.forEach((childSnapshot) => {
                orders.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            
            orders.sort((a, b) => b.timestamp - a.timestamp);
            callback(orders);
        });
        
        // Returns the unsubscribe function
        return () => ordersRef.off('value');
    }
    
    // Menu Management 
    
    /**
     * Save menu items to Firebase (for initial setup)
     * @param {Array} menuItems - Array of menu items
     * @returns {Promise<void>}
     */
    async saveMenuItems(menuItems) {
        try {
            const menuRef = ref(database, 'StoreMenu');
            await menuRef.set(menuRef, menuItems);
            console.log('Menu items saved successfully');
            
        } catch (error) {
            console.error('Error saving menu items:', error);
            throw error;
        }
    }
    
    /**
     * Get all menu items
     * @returns {Promise<Array>} - Array of menu items
     */
    async getMenuItems() {
    
        const menuRef = ref(database, 'StoreMenu');
        let data = {}
        await get(menuRef).then((snapshot) => {
        if (snapshot.exists()){
        data = snapshot.val();
        } else {
        console.log('No data available');
        }
        }).catch((error) => {
            console.error(error);
            // return false;
        });
        // console.log(myMenuItems);
        return data;
    }
    
    // Store Locations
    
    /**
     * Save store locations
     * @param {Array} stores - Array of store locations
     * @returns {Promise<void>}
     */
    async saveStores(stores) {
        try {
            const storesRef = ref(database, 'StoreLocations');
            await storesRef.set(stores);
            console.log('Store locations saved successfully');
            
        } catch (error) {
            console.error('Error saving stores:', error);
            throw error;
        }
    }
    
    /**
     * Get all store locations
     * @returns {Promise<Array>} - Array of stores
     */
    async getStores() {
        try {
            const storesRef = ref(database, 'StoreLocations');
            const snapshot = await storesRef.once('value');
            
            if (!snapshot.exists()) {
                return [];
            }
            
            return snapshot.val();
            
        } catch (error) {
            console.error('Error fetching stores:', error);
            throw error;
        }
    }
}

// Create a singleton instance
const firebaseService = new FirebaseService();

export default firebaseService;