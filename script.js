// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const personalityInput = document.getElementById('personalityInput');
const wordCount = document.getElementById('wordCount');
const wordRequirement = document.getElementById('wordRequirement');
const analyzeBtn = document.getElementById('analyzeBtn');
const inputSection = document.getElementById('inputSection');
const resultsSection = document.getElementById('resultsSection');
const mbtiType = document.getElementById('mbtiType');
const mbtiTitle = document.getElementById('mbtiTitle');
const typeDescription = document.getElementById('typeDescription');
const confidencePercent = document.getElementById('confidencePercent');
const confidenceFill = document.getElementById('confidenceFill');
const confidenceLabel = document.getElementById('confidenceLabel');
const keywordBubbles = document.getElementById('keywordBubbles');
const newAnalysisBtn = document.getElementById('newAnalysisBtn');
const shareResultsBtn = document.getElementById('shareResultsBtn');
const confettiContainer = document.getElementById('confettiContainer');

// MBTI Data
const mbtiTypes = {
    'INTJ': {
        title: 'The Architect',
        description: 'Imaginative and strategic thinkers with a plan for everything.',
        keywords: ['strategic', 'analytical', 'independent', 'visionary', 'determined', 'innovative'],
        confidence: 95
    },
    'INTP': {
        title: 'The Logician',
        description: 'Innovative inventors with an unquenchable thirst for knowledge.',
        keywords: ['logical', 'creative', 'curious', 'theoretical', 'objective', 'inventive'],
        confidence: 92
    },
    'ENTJ': {
        title: 'The Commander',
        description: 'Bold, imaginative and strong-willed leaders, always finding a way.',
        keywords: ['charismatic', 'decisive', 'confident', 'strategic', 'efficient', 'ambitious'],
        confidence: 88
    },
    'ENTP': {
        title: 'The Debater',
        description: 'Smart and curious thinkers who cannot resist an intellectual challenge.',
        keywords: ['innovative', 'enthusiastic', 'versatile', 'energetic', 'clever', 'independent'],
        confidence: 90
    },
    'INFJ': {
        title: 'The Advocate',
        description: 'Quiet and mystical, yet very inspiring and tireless idealists.',
        keywords: ['idealistic', 'compassionate', 'creative', 'insightful', 'determined', 'inspiring'],
        confidence: 87
    },
    'INFP': {
        title: 'The Mediator',
        description: 'Poetic, kind and altruistic people, always eager to help a good cause.',
        keywords: ['creative', 'empathetic', 'idealistic', 'adaptable', 'loyal', 'passionate'],
        confidence: 89
    },
    'ENFJ': {
        title: 'The Protagonist',
        description: 'Charismatic and inspiring leaders, able to mesmerize their listeners.',
        keywords: ['charismatic', 'reliable', 'passionate', 'altruistic', 'natural-born', 'leaders'],
        confidence: 91
    },
    'ENFP': {
        title: 'The Campaigner',
        description: 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.',
        keywords: ['enthusiastic', 'creative', 'sociable', 'free-spirited', 'optimistic', 'energetic'],
        confidence: 93
    },
    'ISTJ': {
        title: 'The Logistician',
        description: 'Practical and fact-minded individuals, whose reliability cannot be doubted.',
        keywords: ['practical', 'reliable', 'organized', 'logical', 'honest', 'direct'],
        confidence: 86
    },
    'ISFJ': {
        title: 'The Defender',
        description: 'Very dedicated and warm protectors, always ready to defend their loved ones.',
        keywords: ['supportive', 'reliable', 'patient', 'imaginative', 'observant', 'hardworking'],
        confidence: 88
    },
    'ESTJ': {
        title: 'The Executive',
        description: 'Excellent administrators, unsurpassed at managing things or people.',
        keywords: ['efficient', 'organized', 'practical', 'reliable', 'direct', 'honest'],
        confidence: 85
    },
    'ESFJ': {
        title: 'The Consul',
        description: 'Extraordinarily caring, social and popular people, always eager to help.',
        keywords: ['sociable', 'caring', 'popular', 'conscientious', 'practical', 'loyal'],
        confidence: 87
    },
    'ISTP': {
        title: 'The Virtuoso',
        description: 'Bold and practical experimenters, masters of all kinds of tools.',
        keywords: ['bold', 'practical', 'experimental', 'spontaneous', 'rational', 'direct'],
        confidence: 84
    },
    'ISFP': {
        title: 'The Adventurer',
        description: 'Flexible and charming artists, always ready to explore and experience something new.',
        keywords: ['artistic', 'flexible', 'charming', 'spontaneous', 'practical', 'sensitive'],
        confidence: 86
    },
    'ESTP': {
        title: 'The Entrepreneur',
        description: 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.',
        keywords: ['smart', 'energetic', 'perceptive', 'bold', 'practical', 'spontaneous'],
        confidence: 89
    },
    'ESFP': {
        title: 'The Entertainer',
        description: 'Spontaneous, energetic and enthusiastic entertainers – life is never boring around them.',
        keywords: ['spontaneous', 'energetic', 'enthusiastic', 'friendly', 'practical', 'sensitive'],
        confidence: 90
    }
};

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    // Update theme toggle icon
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Initialize theme
setTheme(currentTheme);

// Theme toggle event
themeToggle.addEventListener('click', () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// Word counting and input validation
function updateWordCount() {
    const text = personalityInput.value.trim();
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const count = words.length;
    
    wordCount.textContent = count;
    
    // Update word requirement message
    if (count < 20) {
        const remaining = 20 - count;
        wordRequirement.textContent = `Write ${remaining} more word${remaining !== 1 ? 's' : ''} for analysis`;
        wordRequirement.style.color = 'var(--text-secondary)';
        analyzeBtn.disabled = true;
    } else {
        wordRequirement.textContent = 'Perfect! Ready for detailed personality analysis.';
        wordRequirement.style.color = '#28a745';
        analyzeBtn.disabled = false;
    }
    
    // Update word counter color
    if (count >= 20) {
        wordCount.style.color = '#28a745';
    } else {
        wordCount.style.color = 'var(--text-secondary)';
    }
}

// Input event listener
personalityInput.addEventListener('input', updateWordCount);

// Analyze button click handler
analyzeBtn.addEventListener('click', async () => {
    // Add loading state
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    
    try {
        // Get the input text
        const inputText = personalityInput.value.trim();
        
        // Make API call to the Flask backend
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: inputText
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            const prediction = data.prediction;
            
            // Update results with real prediction
            mbtiType.textContent = prediction.mbti_type;
            mbtiTitle.textContent = prediction.title;
            typeDescription.textContent = prediction.description;
            confidencePercent.textContent = `${prediction.confidence}%`;
            
            // Animate confidence bar
            setTimeout(() => {
                confidenceFill.style.width = `${prediction.confidence}%`;
            }, 100);
            
            // Update confidence label
            let confidenceText = 'Low Confidence';
            if (prediction.confidence >= 90) confidenceText = 'Very High Confidence';
            else if (prediction.confidence >= 80) confidenceText = 'High Confidence';
            else if (prediction.confidence >= 70) confidenceText = 'Medium Confidence';
            confidenceLabel.textContent = confidenceText;
            
            // Generate keyword bubbles
            keywordBubbles.innerHTML = '';
            prediction.keywords.forEach((keyword, index) => {
                setTimeout(() => {
                    const bubble = document.createElement('div');
                    bubble.className = 'keyword-bubble';
                    bubble.textContent = keyword;
                    keywordBubbles.appendChild(bubble);
                }, index * 100);
            });
            
            // Show results
            inputSection.style.display = 'none';
            resultsSection.style.display = 'block';
            
            // Trigger confetti animation
            createConfetti();
            
        } else {
            throw new Error(data.error || 'Prediction failed');
        }
        
    } catch (error) {
        console.error('Error during analysis:', error);
        
        // Show error message to user
        alert(`Analysis failed: ${error.message}. Please try again.`);
        
        // Reset button state
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i class="fas fa-brain"></i> Analyze Personality';
        return;
    }
    
    // Reset analyze button
    analyzeBtn.disabled = false;
    analyzeBtn.innerHTML = '<i class="fas fa-brain"></i> Analyze Personality';
});

// New analysis button
newAnalysisBtn.addEventListener('click', () => {
    // Reset form
    personalityInput.value = '';
    updateWordCount();
    
    // Hide results, show input
    resultsSection.style.display = 'none';
    inputSection.style.display = 'block';
    
    // Reset confidence bar
    confidenceFill.style.width = '0%';
    
    // Clear keyword bubbles
    keywordBubbles.innerHTML = '';
});

// Share results button
shareResultsBtn.addEventListener('click', () => {
    const resultText = `I just discovered I'm an ${mbtiType.textContent} - ${mbtiTitle.textContent}! Take the MBTI Personality Test to discover your type.`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My MBTI Personality Type',
            text: resultText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(resultText).then(() => {
            // Show success message
            const originalText = shareResultsBtn.innerHTML;
            shareResultsBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            shareResultsBtn.style.background = '#28a745';
            
            setTimeout(() => {
                shareResultsBtn.innerHTML = originalText;
                shareResultsBtn.style.background = '';
            }, 2000);
        });
    }
});

// Confetti animation
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 20);
    }
}

// Add pulse animation to analyze button when ready
analyzeBtn.addEventListener('mouseenter', () => {
    if (!analyzeBtn.disabled) {
        analyzeBtn.style.animation = 'pulse 1s infinite';
    }
});

analyzeBtn.addEventListener('mouseleave', () => {
    analyzeBtn.style.animation = '';
});

// Initialize word count on page load
updateWordCount();

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to analyze
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (!analyzeBtn.disabled) {
            analyzeBtn.click();
        }
    }
    
    // Escape to go back to input
    if (e.key === 'Escape' && resultsSection.style.display !== 'none') {
        newAnalysisBtn.click();
    }
});

// Add loading animation for better perceived performance
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.headline, .stats, .input-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
