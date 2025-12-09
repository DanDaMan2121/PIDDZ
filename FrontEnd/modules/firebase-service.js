// Firebase Database Service for PIDDZ Pizza App


import { database, initializeFirebase, push, set, ref, get, onValue, serverTimestamp} from './firebase-config.js';

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
            timestamp: serverTimestamp(),
            estimatedTime: '30-45 minutes'
        };
        
        await set(newOrderRef, order)
        .then(() => {
            console.log('Order saved successfully:', order.orderId);
            return order.orderId;
        })
        .catch ((error) => {
            console.error(`Error setting node: ${error}`);
            return false;
        });
            
    }
    
    /**
     * Get all orders (for business dashboard)
     * @returns {Promise<Array>} - Array of all orders
     */
    async getAllOrders() {
        
        const ordersRef = ref(database, 'StoreOrders');
        let data = {}
        
        await get(ordersRef)
        .then((snapshot) => {
            if (snapshot.exists()){
                data = snapshot.val();
            } else {
                console.log('No data available');
            }
        })
        .catch((error) => {
            console.error(error);
        });
        
        return data;
    }
    
    /**
     * Gets a specific order by ID
     * @param {string} orderId - Fetches the order ID
     * @returns {Promise<Object>} - Order data
     */
    async getOrder(orderId) {
    
        const orderRef = ref(database, `StoreOrders/${orderId}`);
        let order = {}
        await get(orderRef)
        .then((snapshot) => {
            if (snapshot.exists()){
                order = snapshot.val();
            } else {
                console.log('No data available');
            }
        })
        .catch((error) => {
            console.error(error);
        });
        
        return order;
    }
    
    /**
     * Updates the order status
     * @param {string} orderId 
     * @param {string} status 
     * @returns {Promise<void>}
     */
    async updateOrderStatus(orderId, status) {
         
        const orderRef = ref(database, `StoreOrders/${orderId}`);
        await update(orderRef, {
            status: status,
            lastUpdated: timestamp
        }).then(() => {
            console.log(`Order ${orderId} updated to ${status}`);
        }).catch((error) => {
            console.log('Error updating order status', error);
        });
        
        
    }
    
    /** 
     * Listen for real-time order updates
     * @param {Function} callback - Function to call when orders change
     * @returns {Function} - Unsubscribe function
     */
    listenToOrders(callback) { // onvalue method
        const ordersRef = ref(database, 'StoreOrders');
        
        const unsubscribe = onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            const orders = []
            data.forEach((element) => {
                orders.push(element);
            }); 
            orders.sort((a, b) => b.timestamp - a.timestamp);
            callback(orders);
        }, (error) => {
            console.log('Error fetching data: ', error);
        });
        
        // ordersRef.on('value', (snapshot) => {
        //     const orders = [];
        //     snapshot.forEach((childSnapshot) => {
        //         orders.push({
        //             id: childSnapshot.key,
        //             ...childSnapshot.val()
        //         });
        //     });
            
        //     orders.sort((a, b) => b.timestamp - a.timestamp);
        //     callback(orders);
        // });
        
        // Returns the unsubscribe function
        return unsubscribe;
    }
    
    // Menu Management 
    
    /** 
     * Save menu items to Firebase (for initial setup)
     * @param {Array} menuItems - Array of menu items
     * @returns {Promise<void>}
     */
    async saveMenuItems(menuItems) {
        
            const menuRef = ref(database, 'StoreMenu');
            await set(menuRef, menuItems)
            .then(() => {
                console.log('Menu items saved successfully');
            })
            .catch((error) => {
                console.error('Error saving menu items:', error);
            })
                     
    }
    
    /**
     * Get all menu items
     * @returns {Promise<Array>} - Array of menu items
     */
    async getMenuItems() {
    
        const menuRef = ref(database, 'StoreMenu');
        let data = {}
        await get(menuRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                data = snapshot.val();
            } else {
                console.log('No data available');
            }
        }).catch((error) => {
            console.error(error);
        });

        return data;
    }
    
    // Store Locations
    
    /**
     * Save store locations
     * @param {Array} stores - Array of store locations
     * @returns {Promise<void>}
     */
    async saveStores(stores) {
       
        const storesRef = ref(database, 'StoreLocations');
        await set(storesRef, stores)
        .then(() => {
            console.log('Store locations saved successfully');    
        })
        .catch((error) => {
            console.log('Error saving stores', error);
        });       
                
    }
    
    /**
     * Get all store locations
     * @returns {Promise<Array>} - Array of stores
     */
    async getStores() {
        
        const storesRef = ref(database, 'StoreLocations');
        let data = {}
        await get(storesRef).then((snapshot) => {
            if (snapshot.exists()){
                data = snapshot.val();
            } else {
                console.log('No data available');
            }
        }).catch((error) => {
            console.error(error);
        });
        
        return data;
    }
}

// Create a singleton instance
const firebaseService = new FirebaseService();

export default firebaseService;