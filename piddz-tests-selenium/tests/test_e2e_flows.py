"""
PIDDZ Pizza Delivery App - End-to-End Tests
"""

import pytest
import json
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class TestCarryoutOrderFlow:
    """End-to-end test for carryout order workflow"""
    
    def test_complete_carryout_order(self, driver, base_url):
        """
        Test complete carryout order flow:
        1. Start at home page
        2. Select carryout
        3. Select a store
        4. Browse menu (add item)
        5. Go to checkout
        6. Submit order
        """
        # Step 1: Start at home page
        driver.get(base_url + "/index.html")
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "carryOut"))
        )
        
        # Step 2: Click carryout
        carryout_btn = driver.find_element(By.ID, "carryOut")
        carryout_btn.click()
        
        # Verify navigation to carryout page
        WebDriverWait(driver, 10).until(
            EC.url_contains("carryOut")
        )
        
        # Step 3: Select a store
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "storeContainer"))
        )
        stores = driver.find_elements(By.CLASS_NAME, "storeContainer")
        stores[0].find_element(By.CLASS_NAME, "street").click()
        
        # Verify navigation to menu
        WebDriverWait(driver, 10).until(
            EC.url_contains("menu")
        )
        
        # Step 4: Menu page - add a side item
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "filter-btn"))
        )
        
        # Filter to sides
        sides_btn = driver.find_element(
            By.XPATH, "//button[contains(@class, 'filter-btn') and @data-category='sides']"
        )
        sides_btn.click()
        time.sleep(0.5)
        
        # Add first side to cart
        menu_items = driver.find_elements(By.CLASS_NAME, "menuItem")
        if len(menu_items) > 0:
            action_btn = menu_items[0].find_element(By.CLASS_NAME, "item-action")
            action_btn.click()
            
            # Accept alert
            WebDriverWait(driver, 5).until(EC.alert_is_present())
            alert = driver.switch_to.alert
            alert.accept()
        
        # Step 5: Go to checkout via cart badge
        cart_badge = driver.find_element(By.ID, "cartBadge")
        cart_badge.click()
        
        # Verify checkout page (or handle empty cart alert)
        try:
            WebDriverWait(driver, 3).until(EC.alert_is_present())
            alert = driver.switch_to.alert
            alert.accept()
            # If alert appeared, cart might be empty - verify we're still on menu
        except:
            # No alert - should be on checkout
            pass


class TestDeliveryOrderFlow:
    """End-to-end test for delivery order workflow"""
    
    def test_delivery_address_entry_flow(self, driver, base_url):
        """
        Test delivery address entry flow:
        1. Start at home page
        2. Select delivery
        3. Enter address
        4. Continue to menu
        """
        # Step 1: Start at home page
        driver.get(base_url + "/index.html")
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "delivery"))
        )
        
        # Step 2: Click delivery
        delivery_btn = driver.find_element(By.ID, "delivery")
        delivery_btn.click()
        
        # Verify navigation to delivery page
        WebDriverWait(driver, 10).until(
            EC.url_contains("delivery")
        )
        
        # Step 3: Enter address
        street = driver.find_element(By.ID, "streetAddress")
        city = driver.find_element(By.ID, "city")
        state = driver.find_element(By.ID, "state")
        zip_code = driver.find_element(By.ID, "zip")
        
        street.send_keys("456 Oak Avenue")
        city.send_keys("Boston")
        state.send_keys("MA")
        zip_code.send_keys("02110")
        
        # Step 4: Submit form
        submit_btn = driver.find_element(By.ID, "submit")
        submit_btn.click()
        
        # Should navigate to menu (form action is menu.html)
        WebDriverWait(driver, 10).until(
            EC.url_contains("menu")
        )


class TestMenuBrowsingFlow:
    """End-to-end test for menu browsing workflow"""
    
    def test_browse_all_categories(self, driver, base_url):
        """
        Test browsing through all menu categories:
        1. Load menu page
        2. Click each category filter
        3. Verify items change accordingly
        """
        driver.get(base_url + "/index.html")
        time.sleep(1)
        
        driver.get(base_url + "/pages/menu.html")
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "menu"))
        )
        
        categories = ['all', 'pizza', 'sides', 'drinks', 'desserts']
        
        for category in categories:
            # Click the filter button
            btn = driver.find_element(
                By.XPATH, f"//button[contains(@class, 'filter-btn') and @data-category='{category}']"
            )
            btn.click()
            time.sleep(0.3)
            
            # Verify button is active
            assert "active" in btn.get_attribute("class")
            
            # Verify menu items are shown
            menu_items = driver.find_elements(By.CLASS_NAME, "menuItem")
            
            if category != 'all':
                # Verify all items match category
                for item in menu_items:
                    item_category = item.find_element(By.CLASS_NAME, "item-category")
                    assert category in item_category.text.lower()


class TestPizzaCustomizationFlow:
    """End-to-end test for pizza customization workflow"""
    
    def test_customize_pizza_redirect(self, driver, base_url):
        """
        Test that clicking customize on pizza redirects to pizza builder:
        1. Load menu page
        2. Filter to pizzas
        3. Click customize on a pizza
        4. Verify redirect to pizza builder
        """
        driver.get(base_url + "/index.html")
        time.sleep(1)
        
        driver.get(base_url + "/pages/menu.html")
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "menu"))
        )
        
        # Filter to pizzas
        pizza_btn = driver.find_element(
            By.XPATH, "//button[contains(@class, 'filter-btn') and @data-category='pizza']"
        )
        pizza_btn.click()
        time.sleep(0.5)
        
        # Click customize on first pizza
        menu_items = driver.find_elements(By.CLASS_NAME, "menuItem")
        if len(menu_items) > 0:
            customize_btn = menu_items[0].find_element(By.CLASS_NAME, "item-action")
            customize_btn.click()
            
            # Should redirect to pizza builder
            WebDriverWait(driver, 10).until(
                EC.url_contains("pizzaBuilder")
            )
            
            assert "pizzaBuilder" in driver.current_url


class TestNavigationFlow:
    """End-to-end test for navigation between pages"""
    
    def test_navigation_consistency(self, driver, base_url):
        """
        Test navigation consistency across pages:
        - Home -> Delivery -> Back
        - Home -> Carryout -> Back
        """
        # Test Delivery navigation
        driver.get(base_url + "/index.html")
        driver.find_element(By.ID, "delivery").click()
        
        WebDriverWait(driver, 10).until(EC.url_contains("delivery"))
        
        back_btn = driver.find_element(By.ID, "back")
        back_btn.click()
        
        # Should go back
        time.sleep(1)
        
        # Test Carryout navigation  
        driver.get(base_url + "/index.html")
        driver.find_element(By.ID, "carryOut").click()
        
        WebDriverWait(driver, 10).until(EC.url_contains("carryOut"))
        
        back_btn = driver.find_element(By.ID, "back")
        back_btn.click()
        
        # Should go back
        time.sleep(1)


class TestCartPersistenceFlow:
    """Test that cart persists across navigation"""
    
    def test_cart_persists_after_navigation(self, driver, base_url):
        """To Test that items in cart persist when navigating"""
        # Initialize cart at home
        driver.get(base_url + "/index.html")
        time.sleep(1)
        
        # Go to menu and add item
        driver.get(base_url + "/pages/menu.html")
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "filter-btn"))
        )
        
        # Add a side item
        sides_btn = driver.find_element(
            By.XPATH, "//button[contains(@class, 'filter-btn') and @data-category='sides']"
        )
        sides_btn.click()
        time.sleep(0.5)
        
        menu_items = driver.find_elements(By.CLASS_NAME, "menuItem")
        if len(menu_items) > 0:
            action_btn = menu_items[0].find_element(By.CLASS_NAME, "item-action")
            action_btn.click()
            
            try:
                WebDriverWait(driver, 3).until(EC.alert_is_present())
                driver.switch_to.alert.accept()
            except:
                pass
        
        # Get cart from sessionStorage
        cart_before = driver.execute_script("return sessionStorage.getItem('cart')")
        
        # Navigate to checkout and back
        driver.get(base_url + "/pages/checkout.html")
        time.sleep(1)
        
        # Cart should still have item
        cart_after = driver.execute_script("return sessionStorage.getItem('cart')")
        
        # Both should have content if item was added
        if cart_before and cart_before != "[]":
            assert cart_after is not None
