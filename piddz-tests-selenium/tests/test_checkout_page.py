"""
PIDDZ Pizza Delivery App - Checkout Page Tests
"""

import pytest
import json
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class TestCheckoutPageUI:
    """Test cases for checkout page UI elements"""
    
    def test_checkout_page_loads(self, checkout_page):
        """To Test that the checkout page loads successfully"""
        header = checkout_page.find_element(By.CLASS_NAME, "card-header")
        assert header.is_displayed()
        assert "Order Summary" in header.text
    
    def test_order_container_exists(self, checkout_page):
        """To Test that the order items container exists"""
        container = checkout_page.find_element(By.ID, "tainer")
        assert container is not None
    
    def test_order_more_button_exists(self, checkout_page):
        """To Test that 'Order More' button exists"""
        order_more_btn = checkout_page.find_element(By.ID, "orderMore")
        assert order_more_btn.is_displayed()
        assert "ORDER MORE" in order_more_btn.text
    
    def test_total_sum_element_exists(self, checkout_page):
        """To Test that total sum element exists"""
        total_sum = checkout_page.find_element(By.ID, "totalSum")
        assert total_sum is not None
    
    def test_tax_element_exists(self, checkout_page):
        """To Test that tax element exists"""
        tax = checkout_page.find_element(By.ID, "tax")
        assert tax is not None
    
    def test_after_tax_total_exists(self, checkout_page):
        """To Test that after-tax total element exists"""
        after_tax = checkout_page.find_element(By.ID, "afterTax")
        assert after_tax is not None
    
    def test_pay_button_exists(self, checkout_page):
        """To Test that PAY button exists"""
        pay_btn = checkout_page.find_element(By.ID, "pay")
        assert pay_btn.is_displayed()
        assert "PAY" in pay_btn.text
    
    def test_pay_container_exists(self, checkout_page):
        """To Test that payment container exists"""
        pay_container = checkout_page.find_element(By.ID, "payContainer")
        assert pay_container.is_displayed()


class TestCheckoutWithEmptyCart:
    """Test checkout behavior with empty cart"""
    
    def test_empty_cart_display(self, driver, base_url):
        """To Test checkout page with empty cart"""
        # Initialize empty cart
        driver.get(base_url + "/index.html")
        time.sleep(1)
        
        # Navigate to checkout
        driver.get(base_url + "/pages/checkout.html")
        time.sleep(1)
        
        # Order container should be empty
        container = driver.find_element(By.ID, "tainer")
        assert container.text == "" or len(container.find_elements(By.XPATH, "./*")) == 0
    
    def test_totals_with_empty_cart(self, driver, base_url):
        """To Test that totals show $0 with empty cart"""
        driver.get(base_url + "/index.html")
        time.sleep(1)
        
        driver.get(base_url + "/pages/checkout.html")
        time.sleep(1)
        
        total_sum = driver.find_element(By.ID, "totalSum")
        # Should show $0 or be empty
        assert "$0" in total_sum.text or total_sum.text == ""


class TestCheckoutWithItems:
    """Test checkout behavior with items in cart"""
    
    def setup_cart_with_pizza(self, driver, base_url):
        """Helper method to set up cart with a pizza item"""
        driver.get(base_url + "/index.html")
        time.sleep(1)
        
        # Create a sample pizza item
        pizza_item = {
            "PID": 0,
            "crust": "Hand Tossed",
            "size": "Medium (12\")",
            "quantity": 1,
            "sauce": ["Tomato Sauce", "Normal"],
            "toppings": [["Pepperoni", "whole", "Normal"]]
        }
        
        # Add to cart
        cart = [json.dumps(pizza_item)]
        driver.execute_script(f"sessionStorage.setItem('cart', '{json.dumps(cart)}')")
        
        # Navigate to checkout
        driver.get(base_url + "/pages/checkout.html")
        time.sleep(2)  # Wait for cart to render
    
    def test_cart_item_displayed(self, driver, base_url):
        """To Test that cart items are displayed correctly"""
        self.setup_cart_with_pizza(driver, base_url)
        
        container = driver.find_element(By.ID, "tainer")
        # Should have at least one item displayed
        items = container.find_elements(By.XPATH, "./*")
        assert len(items) > 0
    
    def test_food_cost_calculated(self, driver, base_url):
        """To Test that food cost is calculated"""
        self.setup_cart_with_pizza(driver, base_url)
        
        total_sum = driver.find_element(By.ID, "totalSum")
        assert "Food Cost:" in total_sum.text
        assert "$" in total_sum.text
    
    def test_tax_calculated(self, driver, base_url):
        """To Test that tax is calculated (7%)"""
        self.setup_cart_with_pizza(driver, base_url)
        
        tax = driver.find_element(By.ID, "tax")
        assert "Tax:" in tax.text
        assert "$" in tax.text
    
    def test_total_displayed(self, driver, base_url):
        """To Test that total with tax is displayed"""
        self.setup_cart_with_pizza(driver, base_url)
        
        after_tax = driver.find_element(By.ID, "afterTax")
        assert "Total:" in after_tax.text


class TestCheckoutNavigation:
    """Test navigation from checkout page"""
    
    def test_order_more_navigates_to_menu(self, checkout_page, base_url):
        """To Test that 'Order More' button navigates to menu"""
        order_more_btn = checkout_page.find_element(By.ID, "orderMore")
        order_more_btn.click()
        
        WebDriverWait(checkout_page, 10).until(
            EC.url_contains("menu")
        )
        
        assert "menu" in checkout_page.current_url.lower()


class TestPaymentFlow:
    """Test payment processing flow"""
    
    def test_pay_button_click(self, driver, base_url):
        """To Test clicking the PAY button"""
        # Set up cart with item
        driver.get(base_url + "/index.html")
        time.sleep(1)
        
        pizza_item = {
            "PID": 0,
            "crust": "Hand Tossed", 
            "size": "Medium (12\")",
            "quantity": 1,
            "sauce": ["Tomato Sauce", "Normal"],
            "toppings": []
        }
        
        cart = [json.dumps(pizza_item)]
        driver.execute_script(f"sessionStorage.setItem('cart', '{json.dumps(cart)}')")
        
        # Set up location
        location = ["123 Main St", "Boston, MA 02108"]
        driver.execute_script(f"sessionStorage.setItem('location', '{json.dumps(location)}')")
        
        driver.get(base_url + "/pages/checkout.html")
        time.sleep(2)
        
        pay_btn = driver.find_element(By.ID, "pay")
        pay_btn.click()
        
        # Wait for processing message
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.ID, "payMsg"))
        )
        
        pay_msg = driver.find_element(By.ID, "payMsg")
        # Should show processing or order placed message
        assert pay_msg.is_displayed()
    
    def test_payment_processing_message(self, driver, base_url):
        """To Test that payment shows processing message"""
        driver.get(base_url + "/index.html")
        time.sleep(1)
        
        pizza_item = {
            "PID": 0,
            "crust": "Hand Tossed",
            "size": "Small (10\")",
            "quantity": 1,
            "sauce": ["Tomato Sauce", "Normal"],
            "toppings": []
        }
        
        cart = [json.dumps(pizza_item)]
        driver.execute_script(f"sessionStorage.setItem('cart', '{json.dumps(cart)}')")
        
        driver.get(base_url + "/pages/checkout.html")
        time.sleep(2)
        
        pay_btn = driver.find_element(By.ID, "pay")
        pay_btn.click()
        
        # Check for processing message
        pay_msg = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.ID, "payMsg"))
        )
        
        assert "Processing" in pay_msg.text or len(pay_msg.text) > 0
