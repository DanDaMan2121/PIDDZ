export class Pizza {
    constructor(
        PID = null,
        crust = 'Hand Tossed',
        size = 'Medium (12")',
        quantity = 1,
        sauce = ['Tomato Sauce', 'Normal'],
        toppings = []
    ) {
        this.PID = PID;
        this.crust = crust;
        this.size = size;
        this.quantity = quantity;
        this.sauce = sauce;
        this.toppings = toppings;
    }

    
}


// export default Pizza;