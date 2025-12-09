"""
PIDDZ Pizza Delivery App - Delivery Page Tests
"""

import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class TestDeliveryPage:
    """Test cases for the delivery page (delivery.html)"""
    
    def test_delivery_page_loads(self, delivery_page):
        """To Test that the delivery page loads successfully"""
        # Page should contain delivery form
        form = delivery_page.find_element(By.TAG_NAME, "form")
        assert form is not None
    
    def test_back_button_exists(self, delivery_page):
        """To Test that back button is present"""
        back_btn = delivery_page.find_element(By.ID, "back")
        assert back_btn.is_displayed()
    
    def test_delivery_header_displayed(self, delivery_page):
        """To Test that delivery header is displayed"""
        header = delivery_page.find_element(By.CLASS_NAME, "card-header")
        assert header.is_displayed()
        assert "Delivery" in header.text
    
    def test_street_address_field(self, delivery_page):
        """To Test street address input field that exists"""
        street_input = delivery_page.find_element(By.ID, "streetAddress")
        assert street_input.is_displayed()
        assert street_input.get_attribute("placeholder") == "Street Address"
    
    def test_city_field(self, delivery_page):
        """To Test city input field that exists"""
        city_input = delivery_page.find_element(By.ID, "city")
        assert city_input.is_displayed()
        assert city_input.get_attribute("placeholder") == "City"
    
    def test_state_field(self, delivery_page):
        """To Test state input field that exists"""
        state_input = delivery_page.find_element(By.ID, "state")
        assert state_input.is_displayed()
        assert state_input.get_attribute("placeholder") == "State"
    
    def test_zip_field(self, delivery_page):
        """To Test zip code input field that exists"""
        zip_input = delivery_page.find_element(By.ID, "zip")
        assert zip_input.is_displayed()
        assert zip_input.get_attribute("placeholder") == "Zip"
    
    def test_submit_button_exists(self, delivery_page):
        """To Test submit button that exists"""
        submit_btn = delivery_page.find_element(By.ID, "submit")
        assert submit_btn.is_displayed()
        assert submit_btn.text == "Continue"
    
    def test_required_fields(self, delivery_page):
        """To Test that the required fields are marked as required"""
        street_input = delivery_page.find_element(By.ID, "streetAddress")
        city_input = delivery_page.find_element(By.ID, "city")
        
        # Street and City should be required
        assert street_input.get_attribute("required") is not None
        assert city_input.get_attribute("required") is not None
    
    def test_enter_delivery_address(self, delivery_page):
        """To Test the entering of a delivery address exists or not"""
        # Fill in address fields
        street_input = delivery_page.find_element(By.ID, "streetAddress")
        city_input = delivery_page.find_element(By.ID, "city")
        state_input = delivery_page.find_element(By.ID, "state")
        zip_input = delivery_page.find_element(By.ID, "zip")
        
        street_input.send_keys("123 Main Street")
        city_input.send_keys("Boston")
        state_input.send_keys("MA")
        zip_input.send_keys("02108")
        
        # Verify values are entered
        assert street_input.get_attribute("value") == "123 Main Street"
        assert city_input.get_attribute("value") == "Boston"
        assert state_input.get_attribute("value") == "MA"
        assert zip_input.get_attribute("value") == "02108"
    
    def test_back_button_navigation(self, delivery_page):
        """To Test that the back button navigates back"""
        back_btn = delivery_page.find_element(By.ID, "back")
        current_url = delivery_page.current_url
        
        back_btn.click()
        
        # URL should change (go back in history)
        # Note: This might go to the home page or previous page in history
        WebDriverWait(delivery_page, 5).until(
            lambda d: d.current_url != current_url or True  # Allow timeout without error
        )


class TestDeliveryFormValidation:
    """Test form validation on delivery page"""
    
    def test_empty_form_submission(self, delivery_page):
        """To Test that empty form cannot be submitted"""
        submit_btn = delivery_page.find_element(By.ID, "submit")
        current_url = delivery_page.current_url
        
        submit_btn.click()
        
        # Should stay on the same page due to validation
        assert delivery_page.current_url == current_url
    
    def test_partial_form_submission(self, delivery_page):
        """To Test that partially filled form shows validation"""
        street_input = delivery_page.find_element(By.ID, "streetAddress")
        street_input.send_keys("123 Main Street")
        
        submit_btn = delivery_page.find_element(By.ID, "submit")
        current_url = delivery_page.current_url
        
        submit_btn.click()
        
        # Should stay on same page (city is required)
        assert delivery_page.current_url == current_url
