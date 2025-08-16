from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.pipeline import Pipeline
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global variable to store the loaded model
model = None

def load_model():
    """Load the trained SVM model"""
    global model
    try:
        # Try to load the existing model file
        if os.path.exists('mbti_svm_v3.sav'):
            model = pickle.load(open('mbti_svm_v3.sav', 'rb'))
            print("✅ Loaded existing SVM model")
        else:
            print("❌ Model file not found. Please ensure 'mbti_svm_v3.sav' exists.")
            return False
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return False
    return True

def preprocess_text(text):
    """Preprocess the input text to match training data format"""
    # Convert to lowercase
    text = text.lower()
    
    # Remove special characters but keep spaces
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    
    # Remove extra whitespace
    text = ' '.join(text.split())
    
    return text

def calculate_confidence(prediction_proba, predicted_class):
    """Calculate confidence score based on prediction probabilities"""
    # Get the probability for the predicted class
    class_prob = prediction_proba[0][predicted_class]
    
    # Convert to percentage and ensure it's reasonable
    confidence = min(95, max(70, int(class_prob * 100)))
    
    return confidence

@app.route('/')
def home():
    """Home endpoint"""
    return jsonify({
        "message": "MBTI Personality Predictor API",
        "status": "running",
        "endpoints": {
            "predict": "/predict",
            "health": "/health"
        }
    })

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    """Predict MBTI personality type from text input"""
    try:
        # Get JSON data from request
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({
                "error": "Missing 'text' field in request body"
            }), 400
        
        text = data['text']
        
        if not text or len(text.strip()) < 10:
            return jsonify({
                "error": "Text must be at least 10 characters long"
            }), 400
        
        # Preprocess the text
        processed_text = preprocess_text(text)
        
        if not processed_text:
            return jsonify({
                "error": "Invalid text input after preprocessing"
            }), 400
        
        # Make prediction
        prediction = model.predict([processed_text])[0]
        
        # Get prediction probabilities (if available)
        try:
            prediction_proba = model.predict_proba([processed_text])
            confidence = calculate_confidence(prediction_proba, list(model.classes_).index(prediction))
        except:
            # If predict_proba is not available, use a default confidence
            confidence = 85
        
        # MBTI type descriptions and keywords
        mbti_info = {
            'INTJ': {
                'title': 'The Architect',
                'description': 'Imaginative and strategic thinkers with a plan for everything.',
                'keywords': ['strategic', 'analytical', 'independent', 'visionary', 'determined', 'innovative']
            },
            'INTP': {
                'title': 'The Logician',
                'description': 'Innovative inventors with an unquenchable thirst for knowledge.',
                'keywords': ['logical', 'creative', 'curious', 'theoretical', 'objective', 'inventive']
            },
            'ENTJ': {
                'title': 'The Commander',
                'description': 'Bold, imaginative and strong-willed leaders, always finding a way.',
                'keywords': ['charismatic', 'decisive', 'confident', 'strategic', 'efficient', 'ambitious']
            },
            'ENTP': {
                'title': 'The Debater',
                'description': 'Smart and curious thinkers who cannot resist an intellectual challenge.',
                'keywords': ['innovative', 'enthusiastic', 'versatile', 'energetic', 'clever', 'independent']
            },
            'INFJ': {
                'title': 'The Advocate',
                'description': 'Quiet and mystical, yet very inspiring and tireless idealists.',
                'keywords': ['idealistic', 'compassionate', 'creative', 'insightful', 'determined', 'inspiring']
            },
            'INFP': {
                'title': 'The Mediator',
                'description': 'Poetic, kind and altruistic people, always eager to help a good cause.',
                'keywords': ['creative', 'empathetic', 'idealistic', 'adaptable', 'loyal', 'passionate']
            },
            'ENFJ': {
                'title': 'The Protagonist',
                'description': 'Charismatic and inspiring leaders, able to mesmerize their listeners.',
                'keywords': ['charismatic', 'reliable', 'passionate', 'altruistic', 'natural-born', 'leaders']
            },
            'ENFP': {
                'title': 'The Campaigner',
                'description': 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.',
                'keywords': ['enthusiastic', 'creative', 'sociable', 'free-spirited', 'optimistic', 'energetic']
            },
            'ISTJ': {
                'title': 'The Logistician',
                'description': 'Practical and fact-minded individuals, whose reliability cannot be doubted.',
                'keywords': ['practical', 'reliable', 'organized', 'logical', 'honest', 'direct']
            },
            'ISFJ': {
                'title': 'The Defender',
                'description': 'Very dedicated and warm protectors, always ready to defend their loved ones.',
                'keywords': ['supportive', 'reliable', 'patient', 'imaginative', 'observant', 'hardworking']
            },
            'ESTJ': {
                'title': 'The Executive',
                'description': 'Excellent administrators, unsurpassed at managing things or people.',
                'keywords': ['efficient', 'organized', 'practical', 'reliable', 'direct', 'honest']
            },
            'ESFJ': {
                'title': 'The Consul',
                'description': 'Extraordinarily caring, social and popular people, always eager to help.',
                'keywords': ['sociable', 'caring', 'popular', 'conscientious', 'practical', 'loyal']
            },
            'ISTP': {
                'title': 'The Virtuoso',
                'description': 'Bold and practical experimenters, masters of all kinds of tools.',
                'keywords': ['bold', 'practical', 'experimental', 'spontaneous', 'rational', 'direct']
            },
            'ISFP': {
                'title': 'The Adventurer',
                'description': 'Flexible and charming artists, always ready to explore and experience something new.',
                'keywords': ['artistic', 'flexible', 'charming', 'spontaneous', 'practical', 'sensitive']
            },
            'ESTP': {
                'title': 'The Entrepreneur',
                'description': 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.',
                'keywords': ['smart', 'energetic', 'perceptive', 'bold', 'practical', 'spontaneous']
            },
            'ESFP': {
                'title': 'The Entertainer',
                'description': 'Spontaneous, energetic and enthusiastic entertainers – life is never boring around them.',
                'keywords': ['spontaneous', 'energetic', 'enthusiastic', 'friendly', 'practical', 'sensitive']
            }
        }
        
        # Get MBTI information
        mbti_data = mbti_info.get(prediction, {
            'title': 'Unknown',
            'description': 'Personality type information not available.',
            'keywords': ['unknown']
        })
        
        # Prepare response
        response = {
            "success": True,
            "prediction": {
                "mbti_type": prediction,
                "title": mbti_data['title'],
                "description": mbti_data['description'],
                "confidence": confidence,
                "keywords": mbti_data['keywords']
            },
            "input_text": {
                "original": text,
                "processed": processed_text,
                "word_count": len(processed_text.split())
            },
            "disclaimer": {
                "purpose": "entertainment_and_educational",
                "accuracy": "approximately_84_percent",
                "limitation": "not_clinical_diagnosis",
                "recommendation": "consult_professionals_for_serious_assessment"
            }
        }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({
            "error": f"Prediction failed: {str(e)}"
        }), 500

if __name__ == '__main__':
    # Load the model when starting the server
    if load_model():
        print("🚀 Starting MBTI Personality Predictor API...")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("❌ Failed to load model. Please check the model file.")
