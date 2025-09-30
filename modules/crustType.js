let curstType = ['Pamesan Stuffed Crust', 'Hand Tossed', 'Crunchy Thin Crust', 'New York Style', 'Gluten Free Crust'];
let crustContainer = document.getElementById('crustContainer');


let crustTemplate = (name) => {
    let crustDiv = document.createElement('div');
    crustDiv.className = 'crust';
    crustDiv.innerHTML = name;

    return crustDiv;

}

let generateCrust = (crustList) => {
   
    for (let i = 0; i < crustList.length; i++) {
        let crust = crustTemplate(crustList[i]);
        crustContainer.append(crust)
    }
    let contrastDiv = document.createElement('div');
    contrastDiv.className = 'contrastDivCrust';
    crustContainer.append(contrastDiv);
}

document.addEventListener("DOMContentLoaded", () => {
    generateCrust(curstType);
})

crustContainer.addEventListener('click', (e) => {
    if (e.target.id != 'back') {
        let updatedCrust = e.target.innerHTML;
        let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        myPizza._crust = updatedCrust;
        sessionStorage.setItem('myPizza', JSON.stringify(myPizza));

    }
    window.history.back();
})

