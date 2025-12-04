"""
PIDDZ Pizza Delivery App - Selenium Test Configuration
This file contains pytest fixtures for Selenium WebDriver setup
"""

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.options import Options as FirefoxOptions
import os
import sys

BASE_URL = "http://127.0.0.1:5501"


def pytest_addoption(parser):
    """Adds the command line options for pytest"""
    parser.addoption(
        "--browser",
        action="store",
        default="chrome",
        help="Browser to run tests: chrome or firefox"
    )
    parser.addoption(
        "--headless",
        action="store_true",
        default=False,
        help="Run browser in headless mode"
    )
    parser.addoption(
        "--base-url",
        action="store",
        default=BASE_URL,
        help="Base URL for the application"
    )


@pytest.fixture(scope="session")
def base_url(request):
    """Gets the base URL for tests"""
    return request.config.getoption("--base-url")


def get_chrome_driver(headless=False):
    """
    Creates Chrome WebDriver with proper Windows compatibility.
    Uses Chrome for Testing when available (Chrome 115+).
    """
    options = ChromeOptions()
    
    if headless:
        options.add_argument("--headless=new")  # New headless mode for Chrome 
    
    # Essential options for stability
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-infobars")
    
    # For Windows stability
    if sys.platform == "win32":
        options.add_argument("--disable-software-rasterizer")
    
    try:
        # Method 1: Try using webdriver-manager with Chrome for Testing
        from webdriver_manager.chrome import ChromeDriverManager
        from webdriver_manager.core.os_manager import ChromeType
        
        # For Chrome , use Chrome for Testing
        try:
            service = ChromeService(
                ChromeDriverManager(chrome_type=ChromeType.CHROMIUM).install()
            )
            driver = webdriver.Chrome(service=service, options=options)
            return driver
        except Exception:
            pass
        
        # Fallback: Regular ChromeDriver
        service = ChromeService(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)
        return driver
        
    except Exception as e1:
        print(f"webdriver-manager failed: {e1}")
        
        try:
            # Method 2: Lets Selenium find Chrome automatically 
            driver = webdriver.Chrome(options=options)
            return driver
        except Exception as e2:
            print(f"Auto Chrome failed: {e2}")
            
            try:
                # Method 3: Try with Selenium Manager
                from selenium.webdriver.chrome.service import Service
                service = Service()
                driver = webdriver.Chrome(service=service, options=options)
                return driver
            except Exception as e3:
                raise Exception(
                    f"Could not create Chrome driver. Please ensure:\n"
                    f"1. Chrome browser is installed\n"
                    f"2. Chrome and ChromeDriver versions match\n"
                    f"3. Try: pip install --upgrade selenium webdriver-manager\n"
                    f"Errors: {e1}, {e2}, {e3}"
                )


def get_firefox_driver(headless=False):
    """Create Firefox WebDriver"""
    options = FirefoxOptions()
    
    if headless:
        options.add_argument("--headless")
    
    options.add_argument("--width=1920")
    options.add_argument("--height=1080")
    
    try:
        from webdriver_manager.firefox import GeckoDriverManager
        service = FirefoxService(GeckoDriverManager().install())
        driver = webdriver.Firefox(service=service, options=options)
        return driver
    except Exception as e1:
        try:
            # Let Selenium find Firefox automatically
            driver = webdriver.Firefox(options=options)
            return driver
        except Exception as e2:
            raise Exception(
                f"Could not create Firefox driver. Please ensure Firefox is installed.\n"
                f"Errors: {e1}, {e2}"
            )


@pytest.fixture(scope="function")
def driver(request):
    """
    Fixture to create and return a WebDriver instance.
    Automatically closes the browser after each test.
    """
    browser = request.config.getoption("--browser").lower()
    headless = request.config.getoption("--headless")
    
    if browser == "chrome":
        driver = get_chrome_driver(headless)
    elif browser == "firefox":
        driver = get_firefox_driver(headless)
    else:
        raise ValueError(f"Unsupported browser: {browser}")
    
    driver.implicitly_wait(10)  # Wait up to 10 seconds for elements
    
    yield driver
    
    # Cleanup: Close browser after test
    try:
        driver.quit()
    except Exception:
        pass


@pytest.fixture(scope="function")
def setup_cart(driver, base_url):
    """
    Fixture to set up a cart with initial state.
    Navigates to home page and initializes sessionStorage.
    """
    driver.get(base_url + "/index.html")
    # Initialize cart in sessionStorage
    driver.execute_script("sessionStorage.setItem('cart', JSON.stringify([]))")
    return driver


# Page Object fixtures
@pytest.fixture
def home_page(driver, base_url):
    """Navigate to home page"""
    driver.get(base_url + "/index.html")
    return driver


@pytest.fixture
def menu_page(driver, base_url):
    """Navigate to menu page"""
    driver.get(base_url + "/pages/menu.html")
    return driver


@pytest.fixture
def checkout_page(driver, base_url):
    """Navigate to checkout page"""
    driver.get(base_url + "/pages/checkout.html")
    return driver


@pytest.fixture
def delivery_page(driver, base_url):
    """Navigate to delivery page"""
    driver.get(base_url + "/pages/delivery.html")
    return driver


@pytest.fixture
def carryout_page(driver, base_url):
    """Navigate to carryout page"""
    driver.get(base_url + "/pages/carryOut.html")
    return driver
