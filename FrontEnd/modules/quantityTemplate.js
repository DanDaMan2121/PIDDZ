
import { getItemInCart, setItemInCart } from "./cartMethods.js";
export const quantityTemplate = (container, PID, name) => {
    let quantitySpan = document.createElement('span');
    quantitySpan.textContent = name;

    let qContainer = document.createElement('div');
    qContainer.style.display = 'flex';
    qContainer.style.justifyContent = 'space-between';
    let quantityContainer = document.createElement('div');
    quantityContainer.className = 'quantityContainer';

    // set state
    let myObject = getItemInCart(PID);

    let buttonPlus = document.createElement('button');
    buttonPlus.textContent = '+';
    buttonPlus.style.padding = '5px';
    buttonPlus.addEventListener('click', () => {
        let myObject = getItemInCart(PID);
        let pizzaQantitiy = document.getElementById('pizzaQuantity');
        if (quantity.textContent < 99) {
            quantity.textContent = parseInt(quantity.textContent) + 1;
            myObject.quantity = quantity.textContent;
    
        }
        //update object and visual
        pizzaQantitiy.textContent = (myObject.quantity > 1) ? `(${myObject.quantity})` : myObject.quantity;
        setItemInCart(PID, myObject);

    });

    let quantity = document.createElement('span');
    quantity.textContent = myObject.quantity;
    quantity.style.padding = '5px';
    
    let buttonMinus = document.createElement('button')
    buttonMinus.textContent = '-';
    buttonMinus.style.padding = '5px';
    buttonMinus.addEventListener('click', () => {
        let myObject = getItemInCart(PID)
        let pizzaQantitiy = document.getElementById('pizzaQuantity');
        if (quantity.textContent > 1) {
            quantity.textContent = quantity.textContent - 1;
            myObject.quantity = quantity.textContent;
        }
        //update object and visual
        pizzaQantitiy.textContent = (myObject.quantity > 1) ? `(${myObject.quantity})` : '';
        setItemInCart(PID, myObject);
    })

    quantityContainer.append(buttonMinus, quantity, buttonPlus);
    qContainer.append(quantitySpan, quantityContainer);
    container.append(qContainer);

}