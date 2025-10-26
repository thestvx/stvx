/**
 * Forest Login System
 * Masterfully crafted by TheDoc
 * Advanced glassmorphism with forest theme
 * * تم التحديث للغة العربية (RTL) بواسطة خبير/ة البرمجة
 */

// العناصر الأساسية في DOM
const loginToggle = document.getElementById('loginToggle');
const registerToggle = document.getElementById('registerToggle');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');
const successMessage = document.getElementById('successMessage');
const successText = document.getElementById('successText');

// التوقيع السري (Secret signature)
const ᴛʜᴇᴅᴏᴄ = 'TheDoc';

// التبديل بين نماذج تسجيل الدخول والتسجيل
function switchToLogin() { 
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
}

function switchToRegister() { 
    registerToggle.classList.add('active');
    loginToggle.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
}

// مستمعات الأحداث لأزرار التبديل
loginToggle.addEventListener('click', switchToLogin);
registerToggle.addEventListener('click', switchToRegister);

// إعداد زر إظهار/إخفاء كلمة المرور
function setupPasswordToggle() { 
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// تأثيرات التركيز (Focus) على حقول الإدخال
function setupInputEffects() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        // تأثير Focus-in 
        input.addEventListener('focusin', function() {
            this.parentElement.classList.add('focused');
        });
        
        // تأثير Focus-out 
        input.addEventListener('focusout', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Input Animation
        input.addEventListener('input', function() {
            if (this.value !== '') {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
}

// وظائف التحقق من الصحة (Validation)
function validateEmail(email) { 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
}

function validatePassword(password) { 
    return password.length >= 6; 
}

function validateForm(formType) {
    const form = formType === 'login' ? loginFormElement : registerFormElement;
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        const inputContainer = input.parentElement;
        
        // إزالة أساليب الخطأ السابقة
        inputContainer.classList.remove('error');
        
        // التحقق بناءً على نوع الحقل
        if (input.type === 'email' && value && !validateEmail(value)) {
            inputContainer.classList.add('error');
            isValid = false;
        } else if (input.type === 'password' && value && !validatePassword(value)) {
            inputContainer.classList.add('error');
            isValid = false;
        } else if (!value) {
            inputContainer.classList.add('error');
            isValid = false;
        }
    });
    
    // التحقق الإضافي لنموذج التسجيل
    if (formType === 'register') {
        const passwords = form.querySelectorAll('input[type="password"]');
        if (passwords.length === 2 && passwords[0].value !== passwords[1].value) {
            passwords[1].parentElement.classList.add('error');
            isValid = false;
        }
        
        const checkbox = form.querySelector('input[type="checkbox"]');
        if (!checkbox.checked) {
            checkbox.parentElement.classList.add('error');
            isValid = false;
        }
    }
    
    return isValid;
}

// إظهار رسالة النجاح (معربة)
function showSuccessMessage(message) {
    // تحديث النص في عنصر الرسالة
    successText.textContent = message;
    // عرض الرسالة
    successMessage.classList.add('show');
    
    // إخفاء الرسالة بعد 3 ثوانٍ
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// معالج إرسال النماذج (Form Submit Handler)
function handleFormSubmit(event, formType) {
    event.preventDefault();
    
    if (validateForm(formType)) {
        // محاكاة تسجيل الدخول/التسجيل الناجح
        const message = formType === 'login' 
            ? 'تم تسجيل دخولك بنجاح!' 
            : 'تم إنشاء حسابك بنجاح!';
        
        showSuccessMessage(message);
        
        // إعادة تعيين النموذج بعد الإرسال الناجح
        setTimeout(() => {
            event.target.reset();
            // إزالة جميع أساليب التركيز والقيمة والخطأ
            const inputContainers = event.target.querySelectorAll('.input-container');
            inputContainers.forEach(container => {
                container.classList.remove('focused', 'has-value', 'error');
            });
        }, 1000);
    }
}

// معالج تسجيل الدخول الاجتماعي (Social Login Handler)
function setupSocialLogin() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 
                             this.classList.contains('facebook') ? 'Facebook' : 'X (Twitter)';
            
            // رسالة النجاح المعرّبة للشبكات الاجتماعية
            showSuccessMessage(`جارٍ تسجيل الدخول عبر ${platform}...`);
        });
    });
}

// إنشاء تأثير الجزيئات (Particles) 
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: particleFloat ${Math.random() * 3 + 4}s linear forwards;
        `;
        
        particlesContainer.appendChild(particle);
        
        // إزالة الجزيئات بعد انتهاء حركتها
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 7000);
    }, 2000);
}

// إضافة الأنماط الإضافية للتحقق والتركيز (CSS)
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) translateX(0) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
            transform: scale(1);
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
    
    .input-container.error input {
        border-color: #ff6b6b;
        background: rgba(255, 107, 107, 0.1);
    }
    
    .input-container.error .input-icon {
        color: #ff6b6b;
    }
    
    .checkbox-container.error .checkmark {
        border-color: #ff6b6b;
    }
    
    .input-container.focused .input-icon {
        color: #4a7c23;
        transform: translateY(-50%) scale(1.1);
    }
    
    .input-container.has-value .input-icon {
        color: #568d27;
    }
`;
document.head.appendChild(style);

// التنقل عبر لوحة المفاتيح
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        // Tab بين Login و Register باستخدام Ctrl+Tab
        if (event.ctrlKey && event.key === 'Tab') {
            event.preventDefault();
            if (loginForm.classList.contains('active')) {
                switchToRegister();
            } else {
                switchToLogin();
            }
        }
        
        // Escape لإغلاق رسالة النجاح
        if (event.key === 'Escape' && successMessage.classList.contains('show')) {
            successMessage.classList.remove('show');
        }
    });
}

// معالج النقر على رسالة النجاح لإغلاقها
successMessage.addEventListener('click', function(event) {
    if (event.target === successMessage) {
        successMessage.classList.remove('show');
    }
});

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setupPasswordToggle();
    setupInputEffects();
    setupSocialLogin();
    setupKeyboardNavigation();
    createParticles();
    
    // مستمعات إرسال النماذج
    loginFormElement.addEventListener('submit', (e) => handleFormSubmit(e, 'login'));
    registerFormElement.addEventListener('submit', (e) => handleFormSubmit(e, 'register'));
    
    // منع السلوك الافتراضي للروابط ذات الهاشتاغ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});

// دعم اللمس للأجهزة المحمولة
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // أنماط خاصة باللمس (موجودة في الكود الأصلي)
    const touchStyle = document.createElement('style');
    touchStyle.textContent = `
        .touch-device .submit-btn:active {
            transform: scale(0.98);
        }
        
        .touch-device .toggle-btn:active {
            transform: scale(0.95);
        }
        
        .touch-device .social-btn:active {
            transform: scale(0.9);
        }
    `;
    document.head.appendChild(touchStyle);
}

// تحسين الأداء (Parallax)
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.background-container');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// رسائل الترحيب في الكونسول (معرّبة)
console.log('%cنظام تسجيل الدخول الزجاجي (Glassmorphism Forest Login System)', 'color: #4facfe; font-size: 20px; font-weight: bold;');
console.log('%cأهلاً بك! يتميز هذا النظام بـ:', 'color: #667eea; font-size: 14px;');
console.log('• تصميم زجاجي (Glassmorphism)');
console.log('• خلفية غابة مع تأثيرات حركية');
console.log('• تصميم متجاوب (Responsive)');
console.log('• التحقق من صحة النماذج (Form Validation)');
console.log('• تأثيرات الجزيئات (Particle Effects)');
console.log('• التنقل بلوحة المفاتيح');
console.log('• دعم اللمس');
console.log('%cصممه TheDoc', 'color: #4a7c23; font-size: 12px; font-style: italic;');
// ... (تم الحفاظ على كود Easter Egg وبصمات المصمم الأصلي) ...
