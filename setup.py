#!/usr/bin/env python3
"""
Setup script for MBTI Personality Predictor
This script helps extract the trained model from the Jupyter notebook and set up the environment.
"""

import os
import sys
import subprocess
import pickle
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.pipeline import Pipeline

def install_requirements():
    """Install required Python packages"""
    print("📦 Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Requirements installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing requirements: {e}")
        return False
    return True

def extract_model_from_notebook():
    """Extract the trained model from the Jupyter notebook"""
    print("📊 Extracting model from Jupyter notebook...")
    try:
        # Check if the notebook exists
        if not os.path.exists('MBTI.ipynb'):
            print("❌ MBTI.ipynb not found! Please ensure the notebook is in the current directory.")
            return False
        
        print("✅ Found MBTI.ipynb notebook")
        print("📝 Please run the model training cells in your Jupyter notebook to generate 'mbti_svm_v2.sav'")
        print("💡 The model should be saved using: pickle.dump(text_clf, open('mbti_svm_v2.sav', 'wb'))")
        
        return True
        
    except Exception as e:
        print(f"❌ Error processing notebook: {e}")
        return False

def check_model():
    """Check if the model file exists"""
    model_file = 'mbti_svm_v2.sav'
    if os.path.exists(model_file):
        print(f"✅ Model file '{model_file}' found!")
        return True
    else:
        print(f"❌ Model file '{model_file}' not found!")
        return False

def main():
    """Main setup function"""
    print("🚀 Setting up MBTI Personality Predictor...")
    print("=" * 50)
    
    # Step 1: Install requirements
    if not install_requirements():
        print("❌ Setup failed at requirements installation")
        return
    
    # Step 2: Check if model already exists
    if check_model():
        print("✅ Setup complete! Model is ready to use.")
        print("\n📋 Next steps:")
        print("1. Run: python app.py")
        print("2. Open index.html in your browser")
        print("3. Start predicting MBTI types!")
        return
    
    # Step 3: Guide user to extract model from notebook
    print("\n📋 To complete setup, you need to:")
    print("1. Open MBTI.ipynb in Jupyter Notebook")
    print("2. Run the model training cells")
    print("3. Save the model as 'mbti_svm_v2.sav'")
    print("4. Run this setup script again")
    
    extract_model_from_notebook()
    
    print("\n💡 Once you have the model file, run: python app.py")

if __name__ == "__main__":
    main()
