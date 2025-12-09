// Checkout Page with Firebase Integration
import { getCart, getItemInCart, removeItemInCart } from './cartMethods.js';
import firebaseService from './firebase-service.js';

let tainer = document.getElementById('tainer');
let orderMore = document.getElementById('orderMore');
let totalSumDiv = document.getElementById('totalSum');
let tax = document.getElementById('tax');
let afterTax = document.getElementById('afterTax');
let pay = document.getElementById('payContainer');

let setOptions = (myPizza, sOptions) => {
    if (myPizza.quantity > 1) {
        sOptions.innerHTML = `${myPizza.size} ${myPizza.crust} (${myPizza.quantity})`;
    } else {
        sOptions.innerHTML = `${myPizza.size} ${myPizza.crust}`;
    }
    let cost = 0;
    let quantity = myPizza.quantity;
    if (myPizza.size == 'Small (10")') {
        cost = 8.99 * quantity;
    } else if (myPizza.size == 'Medium (12")') {
        cost = 10.99 * quantity;
    } else {
        cost = 12.99 * quantity;
    }
    return cost;
}

let setList = (myPizza, tList) => {
    let tString = `${myPizza.sauce[0]}, Cheese`;

    let length = myPizza.toppings.length;
    if (length != 0) {
        for (let i = 0; i < length; i++ ) {
            if (i == 0) {
                tString = tString  + `, `;
            }
            if (i == length - 1){ 
                tString = tString + `${myPizza.toppings[i][0]} (${myPizza.toppings[i][1]} ${myPizza.toppings[i][2]})`
            } else {
                tString = tString + `${myPizza.toppings[i][0]} (${myPizza.toppings[i][1]} ${myPizza.toppings[i][2]}), `
            }
        }
    }
    
    tList.innerHTML = tString;
}

let generateCart = (cartList) => {
    let length = cartList.length;
    let totalSum = 0;
    let cost = 0;
    tainer.innerHTML = '';

    let i = 0

    for (i; i < length; i++) {
        const currntItem = getItemInCart(i);

        let container = document.createElement('div');
        container.style.background = '#f8fafc';
        container.style.borderRadius = '12px';
        container.style.boxShadow = '0 1.5px 6px rgba(34,197,94,0.06)';
        container.style.padding = '18px 16px 14px 16px';
        container.style.marginBottom = '18px';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '6px';

        

        let sOption = document.createElement('div');
        sOption.className = 'sOption';
        sOption.style.fontWeight = '700';
        sOption.style.fontSize = '1.08rem';
        sOption.style.display = 'flex';
        sOption.style.alignItems = 'center';

        let tlist = document.createElement('div');


        const modContainer = document.createElement('div');
        modContainer.className = 'modContainer';
        let editButton = document.createElement('button');
        let removeButton = document.createElement('button');
        removeButton.textContent = 'remove';
        editButton.textContent = 'edit';
        modContainer.append(editButton, removeButton)


        if (Object.keys(currntItem)[0] == 'PID') {
            console.log('pizza');
            sOption.innerHTML = '🍕 ' + sOption.innerHTML;
            cost = setOptions(currntItem, sOption);

            tlist.className = 'tList';
            tlist.style.color = '#64748b';
            tlist.style.fontSize = '0.98rem';
            setList(currntItem, tlist);

            editButton.addEventListener('click', () => {
                localStorage.setItem('editPizza', currntItem.PID);
                window.location.href = './pizzaBuilder.html';
            })
        } else {
            sOption.textContent = currntItem.name;
            cost = currntItem.price;
        }

        let price = document.createElement('div');
        let priceValue = document.createElement('span');
        price.append(priceValue, modContainer);
        price.style.display = 'flex';
        price.style.fontWeight = '700';
        price.style.fontSize = '1.08rem';
        price.style.color = '#16a34a';
        price.style.marginTop = '2px';
        price.style.justifyContent = 'space-between';
        priceValue.innerText = `$${cost.toFixed(2)}`;
        removeButton.addEventListener('click', () => {
            console.log(getCart());
            if (Object.keys(currntItem)[0] == 'PID') {
                removeItemInCart(currntItem.PID);
            } else {
                removeItemInCart(currntItem.id);
            }
            container.remove();
            console.log(getCart());
        });
        
        
        // totalSum = totalSum + cost;



        totalSum = totalSum + cost;
        container.append(sOption);
        container.append(tlist);
        container.append(price);
        tainer.append(container);
    }
    return totalSum;
}


document.addEventListener('DOMContentLoaded', () => {
    const cart = getCart();
    console.log(cart);
    let totalSum = generateCart(cart);
    totalSumDiv.innerHTML = `Food Cost: $${totalSum.toFixed(2)}`;
    tax.innerHTML = `Tax: $${(.07 * totalSum).toFixed(2)}`;
    afterTax.innerHTML = `Total: $${(1.07 * totalSum).toFixed(2)}`;
})

orderMore.addEventListener('click', () => {
    localStorage.setItem('pizza', null);
    window.location.href = './menu.html';
})

let payBtn = document.getElementById('pay');
let payMsgDiv = document.createElement('div');
payMsgDiv.style.textAlign = 'center';
payMsgDiv.style.marginTop = '18px';
payMsgDiv.style.fontSize = '1.1rem';
payMsgDiv.id = 'payMsg';
payContainer.appendChild(payMsgDiv);

let processing = false;
payBtn.addEventListener('click', async () => {
    if (processing) return;
    processing = true;
    
    payMsgDiv.innerHTML = '<span style="color:#16a34a; font-weight:600;">Processing Payment...</span>';
    payBtn.style.opacity = '0.6';
    payBtn.style.pointerEvents = 'none';
    
    try {
        // Gets the cart and location data
        const cart = getCart();
        const location = JSON.parse(sessionStorage.getItem('location'));
        
        // Calculates the total
        let totalSum = 0;
        cart.forEach(item => {
            let cost = 0;
            if (item.PID != undefined) {
                if (item.size == 'Small (10")') {
                cost = 8.99 * item.quantity;
                } else if (item.size == 'Medium (12")') {
                    cost = 10.99 * item.quantity;
                } else {
                    cost = 12.99 * item.quantity;
                }
            } else {
                cost += item.price;
            }
            
            
            totalSum += cost;
        });
        
        const taxAmount = totalSum * 0.07;
        const totalWithTax = totalSum + taxAmount;
        
        // Prepares the order data
        const orderData = {
            items: cart,
            location: location,
            totalCost: parseFloat(totalSum.toFixed(2)),
            tax: parseFloat(taxAmount.toFixed(2)),
            totalWithTax: parseFloat(totalWithTax.toFixed(2))
        };
        
        // Saves this to Firebase
        const userId = await firebaseService.saveOrder(orderData);
        
        // Shows the success message
        console.log(userId);
        payMsgDiv.innerHTML = `<span style="color:#22c55e; font-weight:700;">Order Placed!</span><br>Order #<b>${userId.substring(0, 6).toUpperCase()}</b>`;
        payBtn.innerText = 'PAID';
        payBtn.style.background = '#22c55e';
        payBtn.style.color = '#fff';
        
        // Clears the cart

        sessionStorage.setItem('cart', null);
        
        // Redirects to the home screen after 3 seconds
        setTimeout(() => {
            // window.location.href = '../index.html';
        }, 3000);
        
    } catch (error) {
        console.error('Error processing order:', error);
        payMsgDiv.innerHTML = '<span style="color:#ef4444; font-weight:600;">Error processing order. Please try again.</span>';
        payBtn.style.opacity = '1';
        payBtn.style.pointerEvents = 'auto';
        processing = false;
    }
});
