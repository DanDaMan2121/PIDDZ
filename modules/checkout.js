// import { printtList, printsOptions } from '../app.js';
let tainer = document.getElementById('tainer');
let orderMore = document.getElementById('orderMore');
let totalSumDiv = document.getElementById('totalSum');
let tax = document.getElementById('tax');
let afterTax = document.getElementById('afterTax');
let pay = document.getElementById('payContainer');

let setOptions = (myPizza, sOptions) => {
    if (myPizza._quantity > 1) {
        sOptions.innerHTML = `${myPizza._size} ${myPizza._crust} (${myPizza._quantity})`;
    } else {
        sOptions.innerHTML = `${myPizza._size} ${myPizza._crust}`;
    }
    let cost = 0;
    let quantity = myPizza._quantity;
    if (myPizza._size == 'Small (10")') {
        cost = 8.99 * quantity;
    } else if (myPizza._size == 'Medium (12")') {
        cost = 10.99 * quantity;

    } else {
        cost = 12.99 * quantity;
    }
    return cost;
}

let setList = (myPizza, tList) => {
    let tString = `${myPizza._sauce[0]}, Cheese`;

    let length = myPizza._toppings.length;
    if (length != 0) {
        for (let i = 0; i < length; i++ ) {
            if (i == 0) {
                tString = tString  + `, `;
            }
            if (i == length - 1){ 
                tString = tString + `${myPizza._toppings[i][0]} (${myPizza._toppings[i][1]} ${myPizza._toppings[i][2]})`
            } else {
                tString = tString + `${myPizza._toppings[i][0]} (${myPizza._toppings[i][1]} ${myPizza._toppings[i][2]}), `
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
    for (let i = 0; i < length; i++) {
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
        sOption.innerHTML = '🍕 ' + sOption.innerHTML;
        cost = setOptions(cartList[i], sOption);
        totalSum = totalSum + cost;

        let tlist = document.createElement('div');
        tlist.className = 'tList';
        tlist.style.color = '#64748b';
        tlist.style.fontSize = '0.98rem';
        setList(cartList[i], tlist);

        let price = document.createElement('div');
        price.style.fontWeight = '700';
        price.style.fontSize = '1.08rem';
        price.style.color = '#16a34a';
        price.style.marginTop = '2px';
        price.innerText = `$${cost.toFixed(2)}`;

        container.append(sOption);
        container.append(tlist);
        container.append(price);
        tainer.append(container);
    }
    return totalSum;
}


document.addEventListener('DOMContentLoaded', () => {
    let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));

    let cart = JSON.parse(sessionStorage.getItem('cart'));
    console.log(cart);
    let totalSum = generateCart(cart);
    totalSumDiv.innerHTML = `Food Cost: $${totalSum}`;
    tax.innerHTML = `Tax: $${(.07 * totalSum).toFixed(2)}`;
    afterTax.innerHTML = `Total: ${(1.07 * totalSum).toFixed(2)}`;

    
})

orderMore.addEventListener('click', () => {
    window.sessionStorage.setItem('myPizza', null);
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
payBtn.addEventListener('click', () => {
    if (processing) return;
    processing = true;
    payMsgDiv.innerHTML = '<span style="color:#16a34a; font-weight:600;">Processing Payment...</span>';
    payBtn.style.opacity = '0.6';
    payBtn.style.pointerEvents = 'none';
    setTimeout(() => {
        const orderNum = Math.floor(100000 + Math.random() * 900000);
        payMsgDiv.innerHTML = `<span style=\"color:#22c55e; font-weight:700;\">Order Placed!</span><br>Order #<b>${orderNum}</b>`;
        payBtn.innerText = 'PAID';
        payBtn.style.background = '#22c55e';
        payBtn.style.color = '#fff';
        window.sessionStorage.setItem('cart', null);
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 3000);
    }, 2000);
});
