
# MBTI Personality Predictor

An advanced web application that predicts Myers-Briggs Type Indicator (MBTI) personality types using AI-powered text analysis. Designed for modern browsers, it features a sleek UI, real-time feedback, and robust machine learning.


## Features

### Core
- AI-powered MBTI prediction (SVM, TF-IDF)
- Real-time word counter & input validation
- Confidence scoring & visual feedback
- All 16 MBTI types with descriptions

### UI/UX
- Dark/Light mode with persistence
- Responsive, mobile-first design
- Smooth CSS animations
- Modern, minimalist interface

### Interactivity
- Dynamic input validation
- Animated feedback (confetti, progress bar)
- Keyboard shortcuts (Ctrl/Cmd+Enter, Esc)
- Touch-friendly & accessible


## Getting Started

### Prerequisites
- Modern browser (Chrome, Firefox, Safari, Edge)
- Python 3.11+

### Installation


#### Quick Start
1. Install dependencies: `pip install -r requirements.txt`
2. Run the backend: `python app.py`
3. Open `index.html` in your browser

#### Manual Setup
1. (Optional) Train model: `python setup.py` or use `MBTI.ipynb`
2. Place model file in project root
3. Start backend: `python app.py`
4. Open `index.html`


### File Structure
```
root/
├── index.html        # Frontend
├── styles.css        # Styles
├── script.js         # JS logic
├── app.py            # Flask backend
├── setup.py          # Model training
├── requirements.txt  # Python deps
├── README.md         # Docs
```


## Usage

1. Enter your thoughts (min. 20 words)
2. Click "Analyze Personality" or Ctrl/Cmd+Enter
3. View MBTI type, confidence, and keywords
4. Share or start a new analysis


## Theme System

Light and dark modes, gradient accents, and smooth transitions. Customizable via CSS variables.


## Technical Details

**Frontend:** HTML, CSS, Bootstrap, JS
**Backend:** Python Flask
**ML:** Scikit-learn SVM, TF-IDF
**Data:** MBTI dataset
**Icons:** Font Awesome

**API:** RESTful, CORS enabled
**Browser Support:** Chrome, Firefox, Safari, Edge


## MBTI Types

All 16 Myers-Briggs types included:
INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP


## Customization

Edit CSS variables and keyframes in `styles.css` for colors and animations.


## Mobile Optimization

Fully responsive, touch-friendly, and mobile-first.


## Privacy & Security

- Local text processing
- No permanent data storage
- Secure API, CORS, input validation


## Legal & Ethics

- For entertainment/education only
- Not a clinical tool
- ~84% accuracy
- Updated regularly
- Consult professionals for serious needs


## Performance

- Fast SVM inference
- Efficient text processing
- CDN for libraries
- Optimized CSS animations


## Contributing

1. Fork repo
2. Create feature branch
3. Commit changes
4. Submit pull request


## License

MIT License


## Acknowledgments

- Myers & Briggs Foundation
- Bootstrap
- Font Awesome
- Open-source community

---

**Discover your personality type!** 🎉
