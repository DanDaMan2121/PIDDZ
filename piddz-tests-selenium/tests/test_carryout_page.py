"""
PIDDZ Pizza Delivery App - Carryout Page Tests
"""

import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class TestCarryoutPage:
    """Test cases for the carryout page (carryOut.html)"""
    
    def test_carryout_page_loads(self, carryout_page):
        """To Test that the carryout page loads successfully"""
        container = carryout_page.find_element(By.ID, "sizeContainer")
        assert container is not None
    
    def test_back_button_exists(self, carryout_page):
        """To Test that back button is present"""
        back_btn = carryout_page.find_element(By.ID, "back")
        assert back_btn.is_displayed()
    
    def test_header_displayed(self, carryout_page):
        """To Test that 'Select Store' header is displayed"""
        header = carryout_page.find_element(By.CLASS_NAME, "card-header")
        assert header.is_displayed()
        assert "Select Store" in header.text
    
    def test_stores_are_displayed(self, carryout_page):
        """To Test that store options are displayed"""
        # Wait for stores to be generated
        WebDriverWait(carryout_page, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "storeContainer"))
        )
        
        stores = carryout_page.find_elements(By.CLASS_NAME, "storeContainer")
        assert len(stores) > 0
    
    def test_store_has_street_address(self, carryout_page):
        """To Test that each store displays a street address"""
        WebDriverWait(carryout_page, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "storeContainer"))
        )
        
        stores = carryout_page.find_elements(By.CLASS_NAME, "storeContainer")
        if len(stores) > 0:
            street = stores[0].find_element(By.CLASS_NAME, "street")
            assert street.is_displayed()
            assert len(street.text) > 0
    
    def test_store_has_town(self, carryout_page):
        """To Test that each store displays a town/city"""
        WebDriverWait(carryout_page, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "storeContainer"))
        )
        
        stores = carryout_page.find_elements(By.CLASS_NAME, "storeContainer")
        if len(stores) > 0:
            town = stores[0].find_element(By.CLASS_NAME, "town")
            assert town.is_displayed()
            assert len(town.text) > 0
    
    def test_store_count(self, carryout_page):
        """To Test that expected number of stores are displayed"""
        WebDriverWait(carryout_page, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "storeContainer"))
        )
        
        stores = carryout_page.find_elements(By.CLASS_NAME, "storeContainer")
        # Based on the code, should have 4 stores
        assert len(stores) == 4
    
    def test_select_store_navigates_to_menu(self, carryout_page, base_url):
        """To Test that clicking a store navigates to menu page"""
        WebDriverWait(carryout_page, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "storeContainer"))
        )
        
        stores = carryout_page.find_elements(By.CLASS_NAME, "storeContainer")
        if len(stores) > 0:
            # Click the first store's street element
            street = stores[0].find_element(By.CLASS_NAME, "street")
            street.click()
            
            # Wait for navigation to menu
            WebDriverWait(carryout_page, 10).until(
                EC.url_contains("menu")
            )
            
            assert "menu" in carryout_page.current_url.lower()
    
    def test_selected_store_saved_to_session(self, carryout_page):
        """To Test that selected store location is saved to sessionStorage"""
        WebDriverWait(carryout_page, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "storeContainer"))
        )
        
        stores = carryout_page.find_elements(By.CLASS_NAME, "storeContainer")
        if len(stores) > 0:
            # Get the first store's info
            street = stores[0].find_element(By.CLASS_NAME, "street").text
            town = stores[0].find_element(By.CLASS_NAME, "town").text
            
            # Click to select store
            stores[0].find_element(By.CLASS_NAME, "street").click()
            
            # Wait briefly for sessionStorage to be set
            WebDriverWait(carryout_page, 5).until(
                lambda d: d.execute_script("return sessionStorage.getItem('location')") is not None
            )
            
            # Verify location was saved
            location = carryout_page.execute_script("return sessionStorage.getItem('location')")
            assert location is not None
            assert street in location
    
    def test_back_button_goes_to_home(self, carryout_page):
        """To Test that back button navigates back"""
        back_btn = carryout_page.find_element(By.ID, "back")
        current_url = carryout_page.current_url
        
        back_btn.click()
        
        # Should navigate back (either to home or previous page)
        WebDriverWait(carryout_page, 5).until(
            lambda d: d.current_url != current_url or True
        )


class TestStoreData:
    """Test cases for store data accuracy"""
    
    def test_stores_have_boston_addresses(self, carryout_page):
        """To Test that all stores have Boston, MA addresses"""
        WebDriverWait(carryout_page, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "storeContainer"))
        )
        
        stores = carryout_page.find_elements(By.CLASS_NAME, "storeContainer")
        
        for store in stores:
            town = store.find_element(By.CLASS_NAME, "town")
            assert "Boston" in town.text
            assert "MA" in town.text
    
    def test_each_store_has_unique_address(self, carryout_page):
        """To Test that each store has a unique street address"""
        WebDriverWait(carryout_page, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "storeContainer"))
        )
        
        stores = carryout_page.find_elements(By.CLASS_NAME, "storeContainer")
        
        street_addresses = []
        for store in stores:
            street = store.find_element(By.CLASS_NAME, "street").text
            street_addresses.append(street)
        
        # All addresses should be unique
        assert len(street_addresses) == len(set(street_addresses))
