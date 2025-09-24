// Simple JavaScript for Note App - Utilizes styles.css

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Note App initialized!');
    
    // Initialize all functionality
    initFormAnimations();
    initButtonEffects();
    initNoteCardAnimations();
    initThemeToggle();
    addWelcomeMessage();
});

// Form input animations and validation
function initFormAnimations() {
    const inputs = document.querySelectorAll('.form-group input');
    
    inputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            console.log('Input focused:', this.name);
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Simple validation feedback
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = '#28a745'; // Green
            } else {
                this.style.borderColor = '#ddd'; // Default
            }
        });
    });
}

// Enhanced button interactions
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        // Add click ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Button loading state
        if (button.type === 'submit') {
            button.addEventListener('click', function() {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            });
        }
    });
    
    // Add ripple animation to CSS
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Note card hover animations
function initNoteCardAnimations() {
    const noteCards = document.querySelectorAll('.note-card');
    
    noteCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(5px) scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'translateX(5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateX(5px) scale(1)';
            }, 150);
            
            console.log('Note card clicked:', this.querySelector('h3')?.textContent);
        });
    });
}

// Simple theme toggle functionality
function initThemeToggle() {
    // Create theme toggle button if it doesn't exist
    const colorControls = document.querySelector('.color-controls');
    if (colorControls && !document.querySelector('#theme-toggle')) {
        const themeButton = document.createElement('button');
        themeButton.id = 'theme-toggle';
        themeButton.className = 'btn-secondary';
        themeButton.textContent = '🌙 Dark Mode';
        themeButton.style.marginLeft = '10px';
        
        themeButton.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                this.textContent = '☀️ Light Mode';
                applyDarkTheme();
            } else {
                this.textContent = '🌙 Dark Mode';
                removeDarkTheme();
            }
        });
        
        colorControls.appendChild(themeButton);
    }
}

// Apply dark theme styles
function applyDarkTheme() {
    if (!document.querySelector('#dark-theme-styles')) {
        const style = document.createElement('style');
        style.id = 'dark-theme-styles';
        style.textContent = `
            .dark-theme {
                background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
            }
            .dark-theme .auth-container,
            .dark-theme .dashboard-container {
                background: #34495e !important;
                color: white !important;
            }
            .dark-theme .form-group input {
                background: #2c3e50 !important;
                color: white !important;
                border-color: #4a6741 !important;
            }
            .dark-theme .note-card {
                background: #2c3e50 !important;
                color: white !important;
            }
            .dark-theme h1, .dark-theme h2, .dark-theme h3 {
                color: white !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Remove dark theme styles
function removeDarkTheme() {
    const darkStyles = document.querySelector('#dark-theme-styles');
    if (darkStyles) {
        darkStyles.remove();
    }
}

// Add welcome message with animation
function addWelcomeMessage() {
    if (document.querySelector('.dashboard-container')) {
        setTimeout(() => {
            const message = document.createElement('div');
            message.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(45deg, #667eea, #764ba2);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: slideIn 0.5s ease-out;
            `;
            message.textContent = '👋 Welcome to your Note App!';
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.style.animation = 'slideOut 0.5s ease-in forwards';
                setTimeout(() => message.remove(), 500);
            }, 3000);
        }, 1000);
        
        // Add animation styles
        if (!document.querySelector('#welcome-styles')) {
            const style = document.createElement('style');
            style.id = 'welcome-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Utility function to add new note (demo)
function addNewNote() {
    const notesGrid = document.querySelector('.notes-grid');
    if (notesGrid) {
        const newNote = document.createElement('div');
        newNote.className = 'note-card';
        newNote.innerHTML = `
            <h3>New Note #${Date.now()}</h3>
            <p>This is a new note created dynamically!</p>
            <small>Created: ${new Date().toLocaleDateString()}</small>
        `;
        
        notesGrid.appendChild(newNote);
        initNoteCardAnimations(); // Re-initialize animations for new card
        
        // Scroll to new note
        newNote.scrollIntoView({ behavior: 'smooth' });
    }
}

// Make functions globally available
window.addNewNote = addNewNote;

console.log('✨ Note App JavaScript loaded successfully!');