document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // I. وظيفة تفاعل الشريط الجانبي
    // ----------------------------------------------------
    const menuItems = document.querySelectorAll('.menu li');
    // الحصول على اسم الملف الحالي لتعيين العنصر النشط
    const currentPath = window.location.pathname.split('/').pop() || 'index.html'; 

    // 1. تفعيل حالة النشاط بناءً على اسم الملف
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            const linkPath = link.getAttribute('href');
             // مقارنة اسم الملف (مثل 'index.html')
            if (linkPath === currentPath) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }
    });

    // 2. تفعيل تأثير النقر (Scale) وتأثير الضوء (Liquid Highlight)
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            
            const icon = item.querySelector('i');
            if(icon) {
                icon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 200);
            }
        });
        
        // تأثير الضوء (Liquid Highlight) عند مرور الفأرة
        item.addEventListener('mousemove', (e) => {
            const existingHighlight = item.querySelector('.highlight');
            if (existingHighlight) {
                existingHighlight.remove();
            }

            const highlight = document.createElement('div');
            highlight.classList.add('highlight');
            highlight.style.cssText = `
                position: absolute;
                top: 0;
                right: 0; 
                width: 100%;
                height: 100%;
                border-radius: 16px;
                background: radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
                pointer-events: none;
                opacity: 1;
                transition: opacity 0.3s ease;
            `;
            
            item.appendChild(highlight);
            
            setTimeout(() => {
                highlight.style.opacity = '0';
                setTimeout(() => {
                    highlight.remove();
                }, 300);
            }, 100); 
        });

        item.addEventListener('mouseleave', () => {
            const highlight = item.querySelector('.highlight');
            if (highlight) {
                highlight.style.opacity = '0';
                setTimeout(() => {
                    highlight.remove();
                }, 300);
            }
        });
    });

    // ----------------------------------------------------
    // II. وظيفة تأثير بطاقات المشاريع ثلاثية الأبعاد (3D Tilt) 
    // ----------------------------------------------------
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateY = (x / rect.width - 0.5) * -10; 
            const rotateX = (y / rect.height - 0.5) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
    
    // ----------------------------------------------------
    // III. وظيفة معالجة نموذج طلب المشروع (Form Submission) 
    // ----------------------------------------------------
    // نستهدف نموذج طلب الخدمة فقط (يجب ألا يؤثر على نماذج Firebase)
    const requestForm = document.querySelector('.request-form:not(#loginForm):not(#signupForm)');
    
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const formData = new FormData(requestForm);
            const data = {};
            formData.forEach((value, key) => { data[key] = value });

            console.log('بيانات الطلب المرسلة:', data);

            alert('✅ تم استلام طلبك بنجاح! سيتم التواصل معك قريباً عبر البريد الإلكتروني.');
            
            requestForm.reset();
        });
    }

    // ----------------------------------------------------
    // IV. وظيفة مؤثر ظهور العناصر أثناء التمرير (Reveal on Scroll)
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section, header');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 }); 

    sections.forEach(section => {
        section.classList.add('hidden-section'); 
        observer.observe(section);
    });
});
