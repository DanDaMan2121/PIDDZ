export let meatTopping = ['Ham', 'Beef', 'Pepperoni', 'Italian Sausage', 'Premium Chicken', 'Bacon', 'Philly Steak'];
export let vegTopping = ['Hot Buffalo Sauce', 'Jalapeno Peppers', 'Onions', 'Bannan Peppers', 'Diced Tomatoes', 'Black Olvies',
                  'Mushrooms', 'Pineapple', 'Shredded Provolone Cheese', 'Chedder Cheese Blend', 'Green Peppers', 'Spinach',
                  'Feta Cheese', 'Shredded Parmesan Asiago']

let options = ['Light', 'Normal', 'Extra' ];
let optionsN = [ 'None', 'Light', 'Normal', 'Extra' ];
let pizzaCoverage = [ 'Right-Half', 'Whole', 'Left Half'];




export let more = (e) => {
    let parent = e.parentNode;
    // console.log(parent);
    let element = parent.children[1];
    let currentSelection = options.indexOf(element.innerHTML);
    if (currentSelection < options.length - 1) {
        element.innerHTML = options[currentSelection + 1];
    }
}

export let less = (e) => {
    let parent = e.parentNode;
    // console.log(parent);
    let element = parent.children[1];
    let currentSelection = options.indexOf(element.innerHTML);
    if (currentSelection > 0) {
        element.innerHTML = options[currentSelection - 1];
    }
}

export let showOptions  = (option) => {
    for (let i = 0; i < option.length; i++) {
        console.log(option[i]);
      }
}

export let addAndremove = (e) => {
    let myPizza = sessionStorage.getItem('myPizza');
    myPizza = JSON.parse(myPizza);

    // console.log(e);
    let parent = e.parentElement;
    // console.log(parent);
    let name = parent.children[0].innerHTML;
    let topping = [name, 'whole', 'Normal'];  
    
    // console.log(name);

    let editItem = parent.nextElementSibling;
    // console.log(editItem);

    if (editItem.style.display != 'none') {
        // console.log('run');
        editItem.style.display = 'none';
        e.innerHTML = 'add topping';
        // console.log(myPizza._toppings.length);
        for (let i = 0; i < myPizza._toppings.length; i++) {
            let temp = myPizza._toppings[i];
            // console.log(temp[0]);
            if (temp[0] == name) {
                // console.log(name);
                // console.log(i);
                // console.log(myPizza._toppings[i]);
                myPizza._toppings.splice(i, 1);
                break;
            }
        }

    } else {
        editItem.style.display = 'flex';
        e.innerHTML = 'remove topping';
        myPizza._toppings.push(topping);
    }

    console.log(myPizza);
    myPizza = JSON.stringify(myPizza);
    sessionStorage.setItem('myPizza', myPizza);
}

export let toppingTemplate = (name) => {
    let toppingDiv = document.createElement('div');
    toppingDiv.className = 'topping';
    
    let toppingName = document.createElement('span');
    toppingName.innerHTML = name;
    toppingDiv.appendChild(toppingName);
    
    let toppingButton = document.createElement('button');
    toppingButton.className = 'addAndremove';
    toppingButton.innerHTML = 'add topping';
    toppingDiv.appendChild(toppingButton);
    
    return toppingDiv;
}

export let choiceTemplate = () => {
    let editDiv = document.createElement('div');
    editDiv.className = 'edit-item';
    editDiv.style.display = 'none';
    
    let pizzaCoverageDiv = document.createElement('div');
    pizzaCoverageDiv.className = 'pizzaCoverage';

    // left coverage
    let leftbtn = document.createElement('button');
    leftbtn.className = 'left';
    leftbtn.innerHTML = 'left';
    pizzaCoverageDiv.appendChild(leftbtn);

    // whole coverage
    let wholebtn = document.createElement('button');
    wholebtn.className = 'whole';
    wholebtn.innerHTML = 'whole';
    pizzaCoverageDiv.appendChild(wholebtn);

    // right coverage
    let rightbtn = document.createElement('button');
    rightbtn.className = 'right';
    rightbtn.innerHTML = 'right';
    pizzaCoverageDiv.appendChild(rightbtn);

    editDiv.appendChild(pizzaCoverageDiv);

    let choiceContainer = document.createElement('div');
    choiceContainer.className = 'choice-contianer';

    // less button
    let less = document.createElement('span')
    less.className = 'less';
    less.innerHTML = '-';
    choiceContainer.appendChild(less);

    // quantity value
    let quantiy = document.createElement('span')
    quantiy.className = 'quantity';
    quantiy.innerHTML = 'Normal';
    choiceContainer.appendChild(quantiy);

    // more button
    let more = document.createElement('span')
    more.className = 'more';
    more.innerHTML = '+';
    choiceContainer.appendChild(more);

    editDiv.appendChild(choiceContainer);

    return editDiv;
}


export function loadToppings (container, toppings) {
    
    for (let i = 0; i < toppings.length; i++) {
        let toppingDiv = document.createElement('div');
        toppingDiv.className = 'toppingDiv';
        let topping = toppingTemplate(toppings[i]);
        toppingDiv.append(topping);
        toppingDiv.append(choiceTemplate());
        container.append(toppingDiv);
    }
    let contrastDiv = document.createElement('div');
    contrastDiv.className = 'contrastDiv';
    container.append(contrastDiv);
}








