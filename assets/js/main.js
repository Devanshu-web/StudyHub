// main.js - Shared functionality

// Show notification function
function showNotification(message, type = 'success', duration = 5000) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification:not(.hidden)');
    if (existingNotification) {
        existingNotification.classList.add('hidden');
        setTimeout(() => existingNotification.remove(), 300);
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after duration
    setTimeout(() => {
        notification.classList.add('hidden');
        setTimeout(() => notification.remove(), 300);
    }, duration);
    
    return notification;
}

// Show field error
function showFieldError(field, message) {
    if (!field) return;
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
    field.classList.add('error');
}

// Clear field error
function clearFieldError(field) {
    if (!field) return;
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate password strength
function checkPasswordStrength(password) {
    if (!password) return 'empty';
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 10;
    
    // Character variety
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 15;
    
    if (score >= 80) return 'strong';
    if (score >= 60) return 'good';
    if (score >= 40) return 'fair';
    return 'weak';
}

// API request helper
async function apiRequest(endpoint, method = 'GET', data = null) {
    const API_BASE_URL = 'https://studyhub-z8gh.onrender.com/api';
    const url = `${API_BASE_URL}${endpoint}`;
    
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Request failed');
        }
        
        return result;
    } catch (error) {
        console.error('API request failed:', error);
        showNotification(error.message || 'Network error', 'error');
        throw error;
    }
}

// Local storage helper
const storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    },
    
    get: function(key) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    },
    
    clear: function() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
};

// Export functions
window.StudyHub = window.StudyHub || {};
window.StudyHub.utils = {
    showNotification,
    showFieldError,
    clearFieldError,
    validateEmail,
    checkPasswordStrength,
    apiRequest,
    storage
};


// assets/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    setupSidebar();
    setupThemeToggle();
});

// Authentication check - YEH IMPORTANT HAI
function checkAuthStatus() {
    const token = localStorage.getItem('studyhub_token');
    const user = localStorage.getItem('studyhub_user');
    
    // Agar user logged in nahi hai
    if (!token || !user) {
        // Dashboard, notes, solutions pages par hai toh login par redirect karo
        const protectedPages = ['dashboard.html', 'notes.html', 'solutions.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
            return;
        }
    } else {
        // Agar user already logged in hai aur login/signup page par hai
        const authPages = ['login.html', 'signup.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (authPages.includes(currentPage)) {
            window.location.href = 'dashboard.html';
            return;
        }
        
        // User data update karo sidebar mein
        updateUserInfo();
    }
}

function updateUserInfo() {
    const userData = JSON.parse(localStorage.getItem('studyhub_user'));
    if (!userData) return;
    
    // Update username
    const usernameElements = document.querySelectorAll('.username');
    usernameElements.forEach(el => {
        if (el) el.textContent = userData.name || 'Student';
    });
    
    // Update class
    const classElements = document.querySelectorAll('.user-class');
    classElements.forEach(el => {
        if (el) el.textContent = `Class ${userData.class || '7'}`;
    });
    
    // Update avatar
    const avatarElements = document.querySelectorAll('.avatar');
    avatarElements.forEach(el => {
        if (el && userData.name) {
            el.textContent = userData.name.charAt(0).toUpperCase();
        }
    });
}

function setupSidebar() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
        });
    }
    
    // Logout functionality
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logoutUser();
        });
    }
}

function logoutUser() {
    // Clear all localStorage items
    localStorage.removeItem('studyhub_token');
    localStorage.removeItem('studyhub_user');
    localStorage.removeItem('studyhub_remember');
    
    // Redirect to login
    window.location.href = 'login.html';
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('studyhub_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update toggle icon
    const icon = themeToggle.querySelector('i');
    if (savedTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('studyhub_theme', newTheme);
        
        if (newTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}