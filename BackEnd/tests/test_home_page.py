"""
PIDDZ Pizza Delivery App - Home Page Tests
"""

import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class TestHomePage:
    """Test cases for the home page (index.html)"""
    
    def test_home_page_loads(self, home_page):
        """To Test that the home page loads successfully"""
        assert "PIDDZ" in home_page.title or "Document" in home_page.title
    
    def test_brand_name_displayed(self, home_page):
        """To Test that the brand name is displayed"""
        brand = home_page.find_element(By.CLASS_NAME, "brand")
        assert brand.is_displayed()
        assert "PIDDZ" in brand.text
    
    def test_delivery_button_exists(self, home_page):
        """To Test that the delivery button exists and is clickable"""
        delivery_btn = home_page.find_element(By.ID, "delivery")
        assert delivery_btn.is_displayed()
        assert delivery_btn.text == "DELIVERY"
    
    def test_carryout_button_exists(self, home_page):
        """To Test that the carryout button exists and is clickable"""
        carryout_btn = home_page.find_element(By.ID, "carryOut")
        assert carryout_btn.is_displayed()
        assert carryout_btn.text == "CARRYOUT"
    
    def test_delivery_navigation(self, home_page, base_url):
        """To Test that clicking delivery button navigates to delivery page"""
        delivery_btn = home_page.find_element(By.ID, "delivery")
        delivery_btn.click()
        
        # Wait for navigation
        WebDriverWait(home_page, 10).until(
            EC.url_contains("delivery")
        )
        
        assert "delivery" in home_page.current_url.lower()
    
    def test_carryout_navigation(self, home_page, base_url):
        """To Test that clicking carryout button navigates to carryout page"""
        carryout_btn = home_page.find_element(By.ID, "carryOut")
        carryout_btn.click()
        
        # Wait for navigation
        WebDriverWait(home_page, 10).until(
            EC.url_contains("carryOut")
        )
        
        assert "carryout" in home_page.current_url.lower()
    
    def test_footer_exists(self, home_page):
        """To Test that the footer is displayed"""
        footer = home_page.find_element(By.TAG_NAME, "footer")
        assert footer.is_displayed()
        assert "2025" in footer.text
    
    def test_cart_initialized_on_load(self, home_page):
        """To Test that cart is initialized when page loads"""
        # Wait for DOMContentLoaded to fire and cart to be set
        WebDriverWait(home_page, 5).until(
            lambda d: d.execute_script("return sessionStorage.getItem('cart')") is not None
        )
        
        cart = home_page.execute_script("return sessionStorage.getItem('cart')")
        assert cart is not None
        assert cart == "[]"


class TestHomePageResponsiveness:
    """To Test responsive design of home page"""
    
    def test_mobile_viewport(self, driver, base_url):
        """To Test home page on mobile viewport"""
        driver.set_window_size(375, 667)  # iPhone SE size
        driver.get(base_url + "/index.html")
        
        delivery_btn = driver.find_element(By.ID, "delivery")
        carryout_btn = driver.find_element(By.ID, "carryOut")
        
        assert delivery_btn.is_displayed()
        assert carryout_btn.is_displayed()
    
    def test_tablet_viewport(self, driver, base_url):
        """To Test home page on tablet viewport"""
        driver.set_window_size(768, 1024)  # iPad size
        driver.get(base_url + "/index.html")
        
        delivery_btn = driver.find_element(By.ID, "delivery")
        carryout_btn = driver.find_element(By.ID, "carryOut")
        
        assert delivery_btn.is_displayed()
        assert carryout_btn.is_displayed()
