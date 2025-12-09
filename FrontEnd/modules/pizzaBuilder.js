    import { Pizza } from './pizzaClass.js'
    import { populateToppings, printToppings } from './toppings.js';
    import { populateSauceOptions } from './sauceOptions.js';
    import { servingOptionsTemplate } from './servingOptions.js';
    import { quantityTemplate } from './quantityTemplate.js';
    import { readUserData } from './firebase.js';
    import { getCart, getItemInCart, pushCart, setItemInCart} from './cartMethods.js'; 

    const meatContainer = document.getElementById('container1');
    const vegetableContainer = document.getElementById('container2');
    const sauceContainer = document.getElementById('sauceContainer');
    const servingContainer = document.getElementById('servingContainer');


    vegetableContainer.style.display = 'none';

    const pizzaPath = "StoreTemplate's/Pizza";
    // console.log(readUserData('Pizza', 'sauceOptions'));

    let meatBtn = document.getElementById('Meat');
    let meatColor = 'brown'
    meatBtn.style.color = meatColor;
    let vegBtn = document.getElementById('Vegetables');
    let vegColor = 'green';


    function addIngredients(myObject) {
        let myList = [];
        for (const key in myObject) {
            // console.log(key);
            myList.push(key);
        }
        return myList;
    }

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

    export async function loadMenuOption(option) {
        const optionMenu = await readUserData(pizzaPath, option);
        const myOptionList = addIngredients(optionMenu);
        // console.log(myOptionList);
        return myOptionList;

    }


    export async function loadPizzaBuilder() {
        let myCart = getCart();
        const newPizza = localStorage.getItem('newPizza');
        let PID = null

        if (newPizza == 'true') {
            localStorage.setItem('newPizza', false);
            localStorage.setItem('addNewPizza', true);
            const length = myCart.length;
            let objectPizza = new Pizza();
            PID = length;
            objectPizza.PID = length;
            localStorage.setItem('editPizza', PID);
            pushCart(objectPizza);
            console.log('New Pizza');
        } else {
            PID = parseInt(localStorage.getItem('editPizza'));
            console.log(PID)

        }

        console.log(myCart);
        let myObject = getItemInCart(PID);
        console.log(myObject);

        let pizzaSum = document.getElementById('pizzaSummary');

        //meat toppings menu
        populateToppings(await loadMenuOption('meatToppings'), meatContainer, PID, meatColor);

        //vegetable toppings menu
        populateToppings(await loadMenuOption('vegtableToppings'), vegetableContainer, PID, vegColor);

        //sauce options menu
        populateSauceOptions(await loadMenuOption('sauceOptions'), sauceContainer, PID, 'buttonGroup');

        //crust options menu  
        servingOptionsTemplate(await loadMenuOption('crustOptions'), servingContainer, PID, 'crust');
        
        //size options menu
        servingOptionsTemplate(await loadMenuOption('sizeOptions'), servingContainer, PID, 'size');

        //quantiy 
        quantityTemplate(servingContainer, PID, 'quantity');

        //shows the pizza summary
        printSummary(pizzaSum, myObject);

    };

    const checkoutBtn = document.getElementById('checkout');

    checkoutBtn.addEventListener('click', () => {
        // const PID = localStorage.getItem('editPizza');
        localStorage.setItem('addNewPizza', false);

        window.location.href = './checkout.html';
    });

    document.addEventListener('DOMContentLoaded', () => {
        loadPizzaBuilder();
        
    })