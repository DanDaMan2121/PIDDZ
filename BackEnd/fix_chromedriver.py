"""
ChromeDriver Fix Script for Windows
"""

import subprocess
import sys
import os
import shutil
import platform

def run_command(cmd):
    """Run a command and return output"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return result.stdout + result.stderr
    except Exception as e:
        return str(e)

def get_chrome_version():
    """Get installed Chrome version on Windows"""
    paths = [
        r'reg query "HKEY_CURRENT_USER\Software\Google\Chrome\BLBeacon" /v version',
        r'reg query "HKLM\SOFTWARE\Google\Chrome\BLBeacon" /v version',
        r'reg query "HKLM\SOFTWARE\WOW6432Node\Google\Chrome\BLBeacon" /v version'
    ]
    
    for path in paths:
        output = run_command(path)
        if "version" in output.lower() and "REG_SZ" in output:
            # Parse version from registry output
            parts = output.strip().split()
            for i, part in enumerate(parts):
                if part == "REG_SZ" and i + 1 < len(parts):
                    return parts[i + 1]
    return None

def clear_webdriver_cache():
    """Clear webdriver-manager cache"""
    cache_paths = [
        os.path.expanduser("~/.wdm"),
        os.path.expanduser("~\\.wdm"),
    ]
    
    for path in cache_paths:
        if os.path.exists(path):
            print(f"Removing cache: {path}")
            try:
                shutil.rmtree(path)
                print(f"  ✓ Cleared {path}")
            except Exception as e:
                print(f"  ✗ Could not clear: {e}")

def main():
    print("=" * 60)
    print("ChromeDriver Diagnostic and Fix Tool")
    print("=" * 60)
    print()
    
    # System info
    print(f"Operating System: {platform.system()} {platform.release()}")
    print(f"Architecture: {platform.machine()}")
    print(f"Python: {sys.version}")
    print()
    
    # Check Chrome version
    print("Checking Chrome installation...")
    chrome_version = get_chrome_version()
    if chrome_version:
        print(f"  ✓ Chrome version: {chrome_version}")
    else:
        print("  ✗ Could not detect Chrome version")
        print("    Make sure Google Chrome is installed")
    print()
    
    # Check Selenium version
    print("Checking Selenium installation...")
    try:
        import selenium
        print(f"  ✓ Selenium version: {selenium.__version__}")
        
        # Check if it's Selenium 4.6+ which has built-in driver management
        version_parts = selenium.__version__.split('.')
        major = int(version_parts[0])
        minor = int(version_parts[1]) if len(version_parts) > 1 else 0
        
        if major >= 4 and minor >= 6:
            print("  ✓ Selenium 4.6+ detected - has built-in driver management")
        else:
            print("  ⚠ Selenium < 4.6 - recommend upgrading")
            print("    Run: pip install --upgrade selenium")
    except ImportError:
        print("  ✗ Selenium not installed")
        print("    Run: pip install selenium")
    print()
    
    # Clear cache
    print("Clearing WebDriver cache...")
    clear_webdriver_cache()
    print()
    
    # Upgrade packages
    print("Upgrading packages...")
    print("Running: pip install --upgrade selenium webdriver-manager")
    output = run_command(f"{sys.executable} -m pip install --upgrade selenium webdriver-manager")
    print(output[:500] if len(output) > 500 else output)
    print()
    
    # Test driver creation
    print("Testing Chrome WebDriver creation...")
    print("-" * 40)
    
    # Method 1: Selenium's built-in manager
    print("\nMethod 1: Using Selenium's built-in driver manager...")
    try:
        from selenium import webdriver
        from selenium.webdriver.chrome.options import Options
        
        options = Options()
        options.add_argument("--headless=new")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        
        driver = webdriver.Chrome(options=options)
        driver.get("https://www.google.com")
        print(f"  ✓ SUCCESS! Page title: {driver.title}")
        driver.quit()
        print("\n✓ ChromeDriver is working correctly!")
        return True
    except Exception as e:
        print(f"  ✗ Failed: {e}")
    
    # Method 2: webdriver-manager
    print("\nMethod 2: Using webdriver-manager...")
    try:
        from selenium import webdriver
        from selenium.webdriver.chrome.service import Service
        from selenium.webdriver.chrome.options import Options
        from webdriver_manager.chrome import ChromeDriverManager
        
        options = Options()
        options.add_argument("--headless=new")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)
        driver.get("https://www.google.com")
        print(f"  ✓ SUCCESS! Page title: {driver.title}")
        driver.quit()
        print("\n✓ ChromeDriver is working correctly!")
        return True
    except Exception as e:
        print(f"  ✗ Failed: {e}")
    
    print("\n" + "=" * 60)
    print("MANUAL FIX REQUIRED")
    print("=" * 60)
    return False

if __name__ == "__main__":
    main()
