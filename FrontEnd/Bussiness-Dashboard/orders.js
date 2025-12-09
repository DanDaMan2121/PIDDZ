import { readObjectData, removeUserData, writeUserObject } from './firebase.js';
const orderContainer = document.getElementById('orderContainer');

async function generateOrders() {
    const myOrders = await readObjectData('StoreOrders', '');
    console.log(myOrders);
    let orderInfo = []
    Object.keys(myOrders).forEach(key => {
        let info = [myOrders[key].items, (myOrders[key].timestamp), myOrders[key].orderId];
        orderInfo.push(info);
    });
    // console.log(orderInfo);
    orderInfo.forEach(element => {
        const container = document.createElement('div');
        container.className = 'iOrder';
        console.log(element);

        const timeSpan = document.createElement('span');
        const currentDate = new Date(element[1]);
        const currentTime = currentDate.toTimeString();
        timeSpan.textContent = currentTime;
        container.append(timeSpan);

        element[0].forEach(obj => {
            const itemContainer = document.createElement('div');
            itemContainer.className = 'iContainer';
            const itemName = document.createElement('span');
            itemName.style.color = 'blue';
            itemName.textContent = obj.name; // gets the name of the objects in the order
            itemContainer.append(itemName);
            if (obj.PID != undefined) {
                Object.keys(obj).forEach(key => {
                    const itemSpan = document.createElement('span');
                    if (key == 'PID') {
                        itemName.textContent = 'Pizza';
                    } else {
                        itemSpan.textContent = key + ': ' + obj[key];
                        itemContainer.append(itemSpan);
                        // console.log(obj[key]);
                        
                    }
                    
                });
            } else {

            }
           container.append(itemContainer);
        });

        const completeButton = document.createElement('button');
        completeButton.textContent = 'order complete';
        completeButton.className = 'cButton';
        completeButton.addEventListener('click', async () => { 
            setTimeout(() => {
                completeButton.textContent = 'order complete';
            }, 3000);
            if (completeButton.textContent == 'delete') {
                container.remove();
                console.log(element[2]);
                
                const currentData = await readObjectData('StoreOrders', element[2]);
                console.log(currentData);
                writeUserObject('completedOrders/' + element[2], currentData);
                removeUserData('StoreOrders', element[2]);
            }
            completeButton.textContent = 'delete';
    
        });
        container.append(completeButton);
        orderContainer.append(container);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    generateOrders()
});


const menuButton = document.getElementById('menuBuilder');
menuButton.addEventListener('click', () => {
    window.location.href = './dashboard.html';
})