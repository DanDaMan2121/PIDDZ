let pizzaSize = [ 'Small (10")', 'Medium (12")', 'Large (14")'];
let sizeContainer = document.getElementById('sizeContainer');

let sizeTemplate = (size) => {
    let sizeDiv = document.createElement('div');
    sizeDiv.className = 'size';
    sizeDiv.innerHTML = size;

    return sizeDiv;

}

let generateSize = (sizeList) => {
    for (let i = 0; i < sizeList.length; i++) {
        let size = sizeTemplate(sizeList[i]);
        sizeContainer.append(size)
    }
    let contrastDiv = document.createElement('div');
    contrastDiv.className = 'contrastDivCrust';
    sizeContainer.append(contrastDiv);
}

document.addEventListener("DOMContentLoaded", () => {
    generateSize(pizzaSize);

})

sizeContainer.addEventListener('click', (e) => {
    if (e.target.id != 'back') {
        let updatedSize = e.target.innerHTML;
        let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        myPizza._size = updatedSize;
        sessionStorage.setItem('myPizza', JSON.stringify(myPizza));

    }
    window.history.back();

})