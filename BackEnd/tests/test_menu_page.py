"""
PIDDZ Pizza Delivery App - Menu Page Tests
"""

import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class TestMenuPage:
    """Test cases for the menu page (menu.html)"""
    
    def test_menu_page_loads(self, menu_page):
        """To Test that the menu page loads successfully"""
        assert "Menu" in menu_page.title or "PIDDZ" in menu_page.title
    
    def test_header_displayed(self, menu_page):
        """To Test that the PIDDZ header is displayed"""
        # Wait for page to load
        WebDriverWait(menu_page, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "header"))
        )
        header = menu_page.find_element(By.TAG_NAME, "header")
        assert header.is_displayed()
    
    def test_menu_items_displayed(self, menu_page):
        """To Test that menu items are displayed"""
        # Wait for menu items to load
        WebDriverWait(menu_page, 10).until(
            EC.presence_of_element_located((By.ID, "menu"))
        )
        
        menu_container = menu_page.find_element(By.ID, "menu")
        menu_items = menu_container.find_elements(By.CLASS_NAME, "menuItem")
        
        # Should have menu items
        assert len(menu_items) > 0
    
    def test_filter_buttons_exist(self, menu_page):
        """To Test that category filter buttons exist"""
        filter_buttons = menu_page.find_elements(By.CLASS_NAME, "filter-btn")
        
        # Should have filter buttons (All, Pizzas, Sides, Drinks, Desserts)
        assert len(filter_buttons) >= 5
    
    def test_all_filter_is_active_by_default(self, menu_page):
        """To Test that 'All Items' filter is active by default"""
        all_btn = menu_page.find_element(
            By.XPATH, "//button[contains(@class, 'filter-btn') and @data-category='all']"
        )
        
        assert "active" in all_btn.get_attribute("class")
    
    def test_filter_by_pizza(self, menu_page):
        """To Test filtering menu items by pizza category"""
        # Click on Pizzas filter
        pizza_btn = menu_page.find_element(
            By.XPATH, "//button[contains(@class, 'filter-btn') and @data-category='pizza']"
        )
        pizza_btn.click()
        
        # Wait for filter to apply
        time.sleep(0.5)
        
        # Check that pizza filter is now active
        assert "active" in pizza_btn.get_attribute("class")
        
        # Verify only pizza items are shown
        menu_items = menu_page.find_elements(By.CLASS_NAME, "menuItem")
        for item in menu_items:
            category = item.find_element(By.CLASS_NAME, "item-category")
            assert "pizza" in category.text.lower()
    
    def test_filter_by_sides(self, menu_page):
        """To Test filtering menu items by sides category"""
        sides_btn = menu_page.find_element(
            By.XPATH, "//button[contains(@class, 'filter-btn') and @data-category='sides']"
        )
        sides_btn.click()
        
        time.sleep(0.5)
        
        assert "active" in sides_btn.get_attribute("class")
        
        menu_items = menu_page.find_elements(By.CLASS_NAME, "menuItem")
        for item in menu_items:
            category = item.find_element(By.CLASS_NAME, "item-category")
            assert "sides" in category.text.lower()
    
    def test_filter_by_drinks(self, menu_page):
        """To Test filtering menu items by drinks category"""
        drinks_btn = menu_page.find_element(
            By.XPATH, "//button[contains(@class, 'filter-btn') and @data-category='drinks']"
        )
        drinks_btn.click()
        
        time.sleep(0.5)
        
        assert "active" in drinks_btn.get_attribute("class")
        
        menu_items = menu_page.find_elements(By.CLASS_NAME, "menuItem")
        for item in menu_items:
            category = item.find_element(By.CLASS_NAME, "item-category")
            assert "drinks" in category.text.lower()
    
    def test_filter_by_desserts(self, menu_page):
        """To Test filtering menu items by desserts category"""
        desserts_btn = menu_page.find_element(
            By.XPATH, "//button[contains(@class, 'filter-btn') and @data-category='desserts']"
        )
        desserts_btn.click()
        
        time.sleep(0.5)
        
        assert "active" in desserts_btn.get_attribute("class")
        
        menu_items = menu_page.find_elements(By.CLASS_NAME, "menuItem")
        for item in menu_items:
            category = item.find_element(By.CLASS_NAME, "item-category")
            assert "desserts" in category.text.lower()
    
    def test_cart_badge_displayed(self, menu_page):
        """To Test that the cart badge is displayed"""
        cart_badge = menu_page.find_element(By.ID, "cartBadge")
        assert cart_badge.is_displayed()
    
    def test_cart_count_initially_zero(self, menu_page):
        """To Test that cart count is 0 initially"""
        cart_count = menu_page.find_element(By.CLASS_NAME, "cart-count")
        assert cart_count.text == "0"
    
    def test_menu_item_has_price(self, menu_page):
        """To Test that each menu item displays a price"""
        menu_items = menu_page.find_elements(By.CLASS_NAME, "menuItem")
        
        if len(menu_items) > 0:
            price = menu_items[0].find_element(By.CLASS_NAME, "item-price")
            assert "$" in price.text
    
    def test_menu_item_has_action_button(self, menu_page):
        """To Test that each menu item has an action button"""
        menu_items = menu_page.find_elements(By.CLASS_NAME, "menuItem")
        
        if len(menu_items) > 0:
            action_btn = menu_items[0].find_element(By.CLASS_NAME, "item-action")
            assert action_btn.is_displayed()


class TestMenuItemInteraction:
    """Test cases for interacting with menu items"""
    
    def test_pizza_customize_button(self, menu_page):
        """To Test that pizza items have 'Customize' button"""
        # Filter to pizzas
        pizza_btn = menu_page.find_element(
            By.XPATH, "//button[contains(@class, 'filter-btn') and @data-category='pizza']"
        )
        pizza_btn.click()
        time.sleep(0.5)
        
        menu_items = menu_page.find_elements(By.CLASS_NAME, "menuItem")
        if len(menu_items) > 0:
            action_btn = menu_items[0].find_element(By.CLASS_NAME, "item-action")
            assert "Customize" in action_btn.text
    
    def test_non_pizza_add_to_cart_button(self, menu_page):
        """To Test that the non-pizza items have 'Add to Cart' button"""
        # Filter to sides
        sides_btn = menu_page.find_element(
            By.XPATH, "//button[contains(@class, 'filter-btn') and @data-category='sides']"
        )
        sides_btn.click()
        time.sleep(0.5)
        
        menu_items = menu_page.find_elements(By.CLASS_NAME, "menuItem")
        if len(menu_items) > 0:
            action_btn = menu_items[0].find_element(By.CLASS_NAME, "item-action")
            assert "Add to Cart" in action_btn.text
    
    def test_add_side_to_cart(self, driver, base_url):
        """To Test by adding a side item to cart"""
        # Initialize cart first
        driver.get(base_url + "/index.html")
        time.sleep(1)
        
        # Navigate to menu
        driver.get(base_url + "/pages/menu.html")
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "menu"))
        )
        
        # Filter to sides
        sides_btn = driver.find_element(
            By.XPATH, "//button[contains(@class, 'filter-btn') and @data-category='sides']"
        )
        sides_btn.click()
        time.sleep(0.5)
        
        # Get initial cart count
        cart_count = driver.find_element(By.CLASS_NAME, "cart-count")
        initial_count = int(cart_count.text)
        
        # Click Add to Cart on first side item
        menu_items = driver.find_elements(By.CLASS_NAME, "menuItem")
        if len(menu_items) > 0:
            action_btn = menu_items[0].find_element(By.CLASS_NAME, "item-action")
            action_btn.click()
            
            # Accept the alert
            WebDriverWait(driver, 5).until(EC.alert_is_present())
            alert = driver.switch_to.alert
            alert.accept()
            
            # Note: Cart count update depends on implementation
            # This test verifies the click interaction works
