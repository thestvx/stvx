document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.querySelector('.auth-container');
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    const recoveryCard = document.querySelector('.recovery-card');

    // ----------------------------------------------------
    // I. منطق التبديل بين النماذج
    // ----------------------------------------------------

    // التبديل إلى نموذج التسجيل
    document.getElementById('switch-to-register')?.addEventListener('click', function(e) {
        e.preventDefault();
        authContainer.classList.add('show-register');
        authContainer.classList.remove('show-recovery');
    });

    // التبديل إلى نموذج تسجيل الدخول
    document.getElementById('switch-to-login')?.addEventListener('click', function(e) {
        e.preventDefault();
        authContainer.classList.remove('show-register');
        authContainer.classList.remove('show-recovery');
    });

    // إظهار نموذج الاستعادة
    document.getElementById('forgot-password')?.addEventListener('click', function(e) {
        e.preventDefault();
        authContainer.classList.add('show-recovery');
        authContainer.classList.remove('show-register');
    });

    // العودة إلى تسجيل الدخول من الاستعادة
    document.querySelector('.back-to-login')?.addEventListener('click', function(e) {
        e.preventDefault();
        authContainer.classList.remove('show-recovery');
        authContainer.classList.remove('show-register');
    });
    
    // ----------------------------------------------------
    // II. تأثير الحركة ثلاثية الأبعاد (3D Tilt Effect)
    // ----------------------------------------------------
    
    // استهداف جميع النماذج التي تحتاج الحركة
    const tiltCards = [loginForm, registerForm, recoveryCard];

    tiltCards.forEach(card => {
        if (!card) return; // تأكد من وجود العنصر

        const handleMove = (e) => {
            const rect = card.getBoundingClientRect();
            
            // حساب الزوايا من مركز البطاقة
            const mouseX = e.clientX - (rect.left + rect.width / 2);
            const mouseY = e.clientY - (rect.top + rect.height / 2);
            
            const rotateX = (mouseY / (rect.height / 2)) * -5; // تقليل الزاوية ليكون التأثير أنعم
            const rotateY = (mouseX / (rect.width / 2)) * 5; 
            
            // تحديد حالة البطاقة (لأنها قد تكون مُدارة أو مُزاحة)
            let rotationY = 0;
            if (card.classList.contains('register-form')) {
                rotationY = 180; // البطاقة الخلفية يجب أن تحافظ على دورانها الأساسي
            }

            // تطبيق التحويل
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotationY + rotateY}deg) /* إضافة دوران الحركة إلى الدوران الأساسي */
                translateZ(20px)
            `;

            // تحديث تأثير الإضاءة (Glare)
            const glare = card.querySelector('.card-glare');
            if (glare) {
                const glareX = ((e.clientX - rect.left) / rect.width) * 100;
                const glareY = ((e.clientY - rect.top) / rect.height) * 100;
                glare.style.background = `
                    radial-gradient(
                        circle at ${glareX}% ${glareY}%,
                        rgba(255, 255, 255, 0.1) 0%,
                        rgba(255, 255, 255, 0.04) 25%,
                        rgba(255, 255, 255, 0) 50%
                    )
                `;
            }
        };

        const handleLeave = () => {
            let initialRotationY = 0;
            if (card.classList.contains('register-form')) {
                initialRotationY = 180;
            }

            // العودة بسلاسة للوضعية الأصلية
            card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(${initialRotationY}deg)
                translateZ(0px)
            `;

            const glare = card.querySelector('.card-glare');
            if (glare) {
                glare.style.background = 'none';
            }
        };

        card.addEventListener('mousemove', handleMove);
        card.addEventListener('mouseleave', handleLeave);
        
        // تعيين وضع البداية الافتراضي (لـ recovery-card خاصة)
        if (card.classList.contains('login-form')) {
             card.style.transform = `perspective(1000px) rotateY(0deg) translateZ(0px)`;
        } else if (card.classList.contains('register-form')) {
             card.style.transform = `perspective(1000px) rotateY(180deg) translateZ(0px)`;
        }
    });

    // ----------------------------------------------------
    // III. معالجة نماذج المصادقة (لربط Firebase لاحقاً)
    // ----------------------------------------------------

    // نموذج تسجيل الدخول
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        console.log(`تسجيل الدخول: ${email} | ${password}`);
        // هنا سيتم استدعاء وظيفة تسجيل الدخول من Firebase
    });

    // نموذج التسجيل
    document.getElementById('registerForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;

        if (password !== confirmPassword) {
            alert('كلمتا المرور غير متطابقتين!');
            return;
        }

        console.log(`تسجيل جديد: ${name} | ${email}`);
        // هنا سيتم استدعاء وظيفة التسجيل من Firebase
    });

    // نموذج الاستعادة
    document.getElementById('recovery-card')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('recoveryEmail').value;
        console.log(`استعادة كلمة المرور لـ: ${email}`);
        alert(`تم إرسال تعليمات استعادة كلمة المرور إلى ${email}.`);
        // هنا سيتم استدعاء وظيفة استعادة كلمة المرور من Firebase
    });
});
