    import { Pizza } from './modules/pizzaClass.js';
    import { populateToppings } from './modules/toppings.js';
    import { populateSauceOptions } from './modules/sauceOptions.js';
    import { servingOptionsTemplate } from './modules/servingOptions.js';
    import { quantityTemplate } from './modules/quantityTemplate.js';

    const container1 = document.getElementById('container1');
    const container2 = document.getElementById('container2');

    container2.style.display = 'none';

    let meatBtn = document.getElementById('Meat');
    let meatColor = 'brown'
    meatBtn.style.color = meatColor;
    let vegBtn = document.getElementById('Vegtables');
    let vegColor = 'green';

    let sauceContainer = document.getElementById('sauceContainer');
    let sauceOptions = ['Tomato Sauce', 'Honey BBQ Sauce', 'Garlic Parmesan Sauce', 'Alfredo Sauce', 'Ranch'];

    // needs to put these items in a database in order to pull the toppings for this project
    let meatTopping = ['Ham', 'Beef', 'Pepperoni', 'Italian Sausage', 'Premium Chicken', 'Bacon', 'Philly Steak'];
    let vegTopping = ['pepper', 'mushrooms', 'pumpkin', 'lettuce'];

    const servingContainer = document.getElementById('servingContainer');
    let optionList = ['Hand tossed', 'New York Style', 'Panned'];
    let pizzaSize = [ 'Small (10")', 'Medium (12")', 'Large (14")'];

    meatBtn.addEventListener('click', () => {
        meatBtn.style.color = meatColor;
        vegBtn.style.color = 'black';
        container1.style.display = 'flex';
        container2.style.display = 'none';
    });

    vegBtn.addEventListener('click', () => {
        meatBtn.style.color = 'black';
        vegBtn.style.color = vegColor;
        container1.style.display = 'none';
        container2.style.display = 'flex';
    });

    export const printToppings = (myObject) => {
        const toppings = myObject.toppings;
        const length = toppings.length;
        let toppingsString = '';
        let i = 0;
        for (i; i < length; i++) {
            toppingsString = toppingsString + ', ' + toppings[i][0];
        }

        return toppingsString;
    }

    const printSummary = (container, myObject) => {
        let sizeAndCrust = document.createElement('div');
        let pizzaSize = document.createElement('span');
        pizzaSize.id = 'pizzaSize';
        pizzaSize.textContent = myObject.size;
        let pizzaCrust = document.createElement('span');
        pizzaCrust.id = 'pizzaCrust';
        pizzaCrust.textContent = myObject.crust;
        sizeAndCrust.style.display = 'flex';
        let pizzaQuantity = document.createElement('span');
        pizzaQuantity.id = 'pizzaQuantity';
        pizzaQuantity.textContent = (myObject.quantity > 1) ? `(${myObject.quantity})` : '';
        sizeAndCrust.append(pizzaSize, pizzaCrust, pizzaQuantity);

        let sauceAndToppings = document.createElement('div');
        let pizzaSauce = document.createElement('span');
        pizzaSauce.id = 'pizzaSauce';
        pizzaSauce.textContent = myObject.sauce[0];
        let pizzaToppings = document.createElement('span');
        pizzaToppings.id = 'pizzaToppings';
        pizzaToppings.textContent = printToppings(myObject);

        sauceAndToppings.append(pizzaSauce, pizzaToppings);
        
        container.append(sizeAndCrust, sauceAndToppings);

    }
   

    document.addEventListener('DOMContentLoaded', () => {
        const myCart = JSON.parse(sessionStorage.getItem('cart'));
        let myPizza = JSON.parse(localStorage.getItem('pizza'));
        let pizzaSum = document.getElementById('pizzaSummary');
        console.log(pizzaSum);

        if (myPizza === null) {
            const length = myCart.length;
            let storePizza = new Pizza();
            storePizza.PID = length;
            const storePizzaAsString = JSON.stringify(storePizza);

            localStorage.setItem('pizza', storePizzaAsString);
            console.log('New Pizza');
        }
        let myObject = JSON.parse(localStorage.getItem('pizza'));
        console.log(myObject);
        populateToppings(meatTopping, meatColor, container1, 'pizza');
        populateToppings(vegTopping, vegColor, container2, 'pizza');
        populateSauceOptions('buttonGroup', sauceOptions, sauceContainer, 'pizza');
        servingOptionsTemplate('crust', optionList, servingContainer, 'pizza');
        servingOptionsTemplate('size', pizzaSize, servingContainer, 'pizza');
        quantityTemplate('quantity', servingContainer, 'pizza');
        printSummary(pizzaSum, myObject);

    });

    const checkoutBtn = document.getElementById('checkout');

    checkoutBtn.addEventListener('click', () => {
        let myCart = JSON.parse(sessionStorage.getItem('cart'));
        const myPizza = localStorage.getItem('pizza');
        myCart.push(myPizza)
        const myCartAsString = JSON.stringify(myCart);
        sessionStorage.setItem('cart', myCartAsString);

        window.location.href = './checkout.html';
    });
