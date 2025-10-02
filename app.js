    import { Pizza } from './pizzaClass.js';
    import { populateToppings } from './toppings.js';
    import { populateSauceOptions } from './sauceOptions.js';
    import { servingOptionsTemplate } from './servingOptions.js';
    import { quantityTemplate } from './quantityTemplate.js';

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
   

    document.addEventListener('DOMContentLoaded', () => {
        let myPizza = localStorage.getItem('pizza');
        if (myPizza == null) {
            let storePizza = new Pizza();
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

        
    });
