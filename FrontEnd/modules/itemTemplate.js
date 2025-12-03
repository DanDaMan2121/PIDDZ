
export const itemTemplate = (container, itemName, URL) => {
    let itemBtn = document.createElement('button');
    itemBtn.textContent = itemName;
    itemBtn.className = 'menuItem';
    itemBtn.addEventListener('click', () => {
        window.location.href = URL;
    });
    container.append(itemBtn);
}

let menuContainer = document.getElementById('menu');
window.document.addEventListener('DOMContentLoaded', () => {
    if (window.location.href == './menu.html') {
        itemTemplate(menuContainer, 'pizzaBuilder', './pizzaBuilder.html');
    } else {
        itemTemplate(menuContainer, 'pizzaBuilder', './pizzaBuilder.html');
    }
});