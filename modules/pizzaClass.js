class Pizza {
    constructor(
        crust = 'Hand Tossed',
        size = 'Medium (12")',
        quantity = 1,
        sauce = ['Tomato Sauce', 'Normal'],
        toppings = []
    ) {
        this._crust = crust;
        this._size = size;
        this._quantity = quantity;
        this._sauce = sauce;
        this._toppings = toppings;
    }

    
}


export default Pizza;