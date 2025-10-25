document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // I. وظيفة تفاعل الشريط الجانبي (الميزة الأصلية)
    // ----------------------------------------------------
    const menuItems = document.querySelectorAll('.menu li');
    
    menuItems.forEach(item => {
        // 1. تفعيل حالة النشاط (Active) وتأثير النقر
        item.addEventListener('click', (e) => {
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const icon = item.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 200);

            // 2. تفعيل التمرير إلى القسم المطابق في الصفحة (Self-Navigation)
            const targetId = item.querySelector('a').getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault(); // منع سلوك الرابط الافتراضي
                
                // البحث عن القسم المستهدف في محتوى الصفحة
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // التمرير السلس إلى القسم
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
        
        // 3. تأثير الضوء (Liquid Highlight) عند مرور الفأرة
        item.addEventListener('mousemove', (e) => {
             // إزالة أي Highlight سابق قبل إنشاء واحد جديد
            const existingHighlight = item.querySelector('.highlight');
            if (existingHighlight) {
                existingHighlight.remove();
            }

            const highlight = document.createElement('div');
            highlight.classList.add('highlight');
            highlight.style.cssText = `
                position: absolute;
                top: 0;
                right: 0; /* تم تعديله لـ RTL */
                width: 100%;
                height: 100%;
                border-radius: 16px;
                background: radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
                pointer-events: none;
                opacity: 1;
                transition: opacity 0.3s ease;
            `;
            
            item.appendChild(highlight);
            
            // إزالة الضوء بعد فترة قصيرة
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
    // II. وظيفة تأثير بطاقات المشاريع ثلاثية الأبعاد (3D Tilt) (الميزة الأصلية)
    // ----------------------------------------------------
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // ضبط زوايا الدوران (Rotate)
            const rotateY = (x / rect.width - 0.5) * -10; // تم عكس القيمة ليتناسب مع RTL
            const rotateX = (y / rect.height - 0.5) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // إعادة البطاقة إلى وضعها الأصلي
            card.style.transform = 'translateY(0) scale(1)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
    
    // ----------------------------------------------------
    // III. وظيفة معالجة نموذج طلب المشروع (Form Submission) (الإضافة الجديدة)
    // ----------------------------------------------------
    const requestForm = document.querySelector('.request-form');
    
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault(); // منع الإرسال الافتراضي للصفحة

            // * ملاحظة: في بيئة حقيقية، ستحتاج إلى إرسال هذه البيانات إلى خادم
            // * باستخدام تقنيات مثل AJAX/Fetch أو استخدام خدمة خارجية مثل Formspree أو Netlify Forms.
            // * سنكتفي هنا بإظهار رسالة نجاح بسيطة وتفريغ الحقول.
            
            
            // 1. جمع البيانات (يمكنك استخدامها لإرسال بريد إلكتروني في الكواليس)
            const formData = new FormData(requestForm);
            const data = {};
            formData.forEach((value, key) => { data[key] = value });

            console.log('بيانات الطلب المرسلة:', data);

            // 2. إظهار رسالة نجاح للعميل
            alert('✅ تم استلام طلبك بنجاح! سيتم التواصل معك قريباً عبر البريد الإلكتروني.');
            
            // 3. تفريغ النموذج
            requestForm.reset();

            // 4. (ميزة إضافية) تفعيل زر "اطلب مشروعك" في القائمة عند إرسال الطلب بنجاح
            const requestItem = document.querySelector('a[href="#request"]').closest('li');
            if (requestItem) {
                menuItems.forEach(i => i.classList.remove('active'));
                requestItem.classList.add('active');
            }
        });
    }

});

// ----------------------------------------------------
// IV. وظيفة إضافية: مؤثر ظهور العناصر أثناء التمرير (Reveal on Scroll)
// ----------------------------------------------------
// هذا المؤثر شائع جداً في المواقع العالمية ويضيف لمسة احترافية
// سنضيف CSS بسيط لهذه الوظيفة لاحقًا

const sections = document.querySelectorAll('section, header');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target); // إيقاف المراقبة بعد ظهور العنصر
        }
    });
}, { threshold: 0.1 }); // تفعيل الظهور عندما يظهر 10% من العنصر

sections.forEach(section => {
    section.classList.add('hidden-section'); // إضافة كلاس الإخفاء الأولي
    observer.observe(section);
});
