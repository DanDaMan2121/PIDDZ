let pizzaSauce = ['Tomato Sauce', 'Honey BBQ Sauce', 'Garlic Parmesan Sauce', 'Alfredo Sauce', 'Ranch'];




let sauceTemplate = (name) => {
    let sauceDiv = document.createElement('div');
    sauceDiv.className = 'sauce';

    let sauceNameDiv = document.createElement('div');
    let addSauceDiv = document.createElement('div');

    sauceNameDiv.innerHTML = name;
    addSauceDiv.innerHTML = 'add sauce';
    addSauceDiv.className = 'aor';

    if (name == 'Tomato Sauce') {
        addSauceDiv.innerHTML = 'remove sauce';

    }

    sauceDiv.append(sauceNameDiv);
    sauceDiv.append(addSauceDiv);
    // console.log(sauceDiv);
    return sauceDiv;

}

let choiceTemplate = () => {
    let editDiv = document.createElement('div');
    editDiv.className = 'edit-sauce';
    editDiv.style.display = 'none';

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

export let loadSauce = (sauceContainer) => {
    for (let i = 0; i < pizzaSauce.length; i++) {
        let sauceDiv = document.createElement('div');
        sauceDiv.className = 'sauceDiv';
        let sauce = sauceTemplate(pizzaSauce[i]);
        sauceDiv.append(sauce);
        if (pizzaSauce[i] == 'Tomato Sauce') {
            let firstSauce = choiceTemplate();
            firstSauce.style.display = 'flex';
            sauceDiv.append(firstSauce);
        } else {
            sauceDiv.append(choiceTemplate());
        }
        // console.log(sauce);
        // console.log(sauceContainer);
        // sauceContainer.append(sauce);
        sauceContainer.append(sauceDiv);
    }
}