import { readObjectData } from './firebase.js';
const orderContainer = document.getElementById('orderContainer');

async function generateOrders() {
    const myOrders = await readObjectData('StoreOrders', '');
    console.log(myOrders);
    let orderInfo = []
    Object.keys(myOrders).forEach(key => {
        let info = [myOrders[key].items, (myOrders[key].timestamp)];
        orderInfo.push(info);
    });
    console.log(orderInfo);
    orderInfo.forEach(element => {
        const container = document.createElement('div');
        element[0].forEach(obj => {
            console.log(obj);
            const itemName = document.createElement('span');
            container.append(itemName);
            itemName.textContent = obj.name;
            if (obj.PID != undefined) {
                Object.keys(obj).forEach(key => {
                    const itemSpan = document.createElement('span');
                    if (key == 'PID') {
                        itemSpan.textContent = 'Pizza';
                    } else {
                        itemSpan.textContent = key;
                    }
                    container.append(itemSpan);
                });
            } else {

            }

        });
        const completeButton = document.createElement('button');
        completeButton.textContent = 'order complete';
        completeButton.addEventListener('click', () => { 
            setTimeout(() => {
                completeButton.textContent = 'order complete';
            }, 3000);
            if (completeButton.textContent == 'delete') {
                container.remove();
                removeUserData('StoreMenu', key);
            }
            completeButton.textContent = 'delete';
    
        });
        orderContainer.append(container, completeButton);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    generateOrders()
});