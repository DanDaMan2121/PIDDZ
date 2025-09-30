# Copilot Instructions for PIDDZ Pizza Place Web App

## Project Overview
- **Purpose:** Interactive pizza ordering web app for selecting crust, size, toppings, sauce, and checkout.
- **Architecture:**
  - Modular JavaScript (ES6 modules) for UI logic and state management
  - HTML pages for each step (menu, crust, size, checkout, delivery/carryout)
  - Session storage used for cart and pizza state across navigation
  - No build system or backend; all logic is client-side

## Key Components
- `modules/` — All business logic and UI handlers
  - `pbuilder.js`: Topping logic, options, and UI helpers
  - `pizzaClass.js`: Pizza data model (crust, size, sauce, toppings, quantity)
  - `checkout.js`: Checkout UI and cost calculation
  - `crustSize.js`, `crustType.js`: Crust/size selection and state update
  - `sauceOptions.js`: Sauce selection UI
  - `delivery.js`, `carryOut.js`: Address/store selection and session storage
  - `index.js`: Entry point for delivery/carryout selection, initializes cart
- `pages/` — Each user flow step as a separate HTML file
- `styles/` — CSS for layout and UI
- `app.js` — Main orchestrator for menu/topping/sauce selection (used in menu flow)

## Data Flow & State
- **Session Storage:**
  - `myPizza`: Current pizza being built (serialized `Pizza` object)
  - `cart`: Array of pizzas for checkout
  - `location`: Delivery/carryout address
- **Navigation:**
  - Each page loads relevant JS module for its UI logic
  - State is passed via session storage, not URL params

## Developer Workflows
- **No build step:** Edit HTML/JS/CSS directly, reload browser
- **Debugging:** Use browser dev tools; inspect session storage for state
- **Testing:** No automated tests; manual UI testing only

## Project Conventions
- Use ES6 modules and `type="module"` in script tags
- All DOM queries use `getElementById` or `createElement`
- UI state is updated by direct DOM manipulation
- All user actions update session storage for persistence
- Topping/sauce/size options are hardcoded in JS arrays

## Examples
- To add a new topping, update `meatTopping` or `vegTopping` in `pbuilder.js`
- To add a new page, create an HTML file in `pages/` and a corresponding JS module
- To change pizza pricing, update logic in `checkout.js`

## Integration Points
- No external APIs or backend
- No package manager or dependencies

---
**For AI agents:**
- Always update session storage when changing pizza/cart/location state
- Follow the modular pattern: each page's logic is in a separate JS file
- Reference `Pizza` class for pizza object structure
- Use existing UI templates/functions for consistency
