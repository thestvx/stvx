/* --------------------------------- */
/* 1. تحديد النصوص المترجمة */
/* --------------------------------- */
const translations = {
    // المفتاح : {ar: "النص العربي", en: "English Text", fr: "Texte Français"}
    pageTitle: {
        ar: "STVX | معرض فنون رقمية",
        en: "STVX | Digital Art Gallery",
        fr: "STVX | Galerie d'Art Numérique"
    },
    navHome: {
        ar: "الرئيسية",
        en: "Home",
        fr: "Accueil"
    },
    navPortfolio: {
        ar: "المشاريع",
        en: "Portfolio",
        fr: "Projets"
    },
    navAbout: {
        ar: "عن المنصة",
        en: "About",
        fr: "À Propos"
    },
    navContact: {
        ar: "تواصل",
        en: "Contact",
        fr: "Contact"
    },
    mainHeading: {
        ar: "مرحبًا بك في STVX",
        en: "Welcome to STVX",
        fr: "Bienvenue sur STVX"
    },
    mainParagraph: {
        ar: "منصتك لعرض إبداعات الفوتوشوب والتصاميم الفنية. استكشف اللوغوهات والتصاميم ثلاثية الأبعاد هنا.",
        en: "Your platform for showcasing Photoshop and artistic designs. Explore logos and 3D designs here.",
        fr: "Votre plateforme pour présenter vos créations Photoshop et artistiques. Explorez les logos et les designs 3D ici."
    }
};

// 2. الدالة المسؤولة عن تغيير اللغة
function setLanguage(language) {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[key] && translations[key][language]) {
            element.textContent = translations[key][language];
        }
    });

    const html = document.documentElement;
    html.lang = language; 
    html.dir = (language === 'ar') ? 'rtl' : 'ltr'; 
    
    localStorage.setItem('STVX_language', language);
}


/* --------------------------------- */
/* 3. تطبيق المنطق عند تحميل الصفحة */
/* --------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const langSwitcher = document.getElementById('language-switcher');
    
    // منطق تغيير اللغة
    const savedLanguage = localStorage.getItem('STVX_language') || 'ar';
    setLanguage(savedLanguage);
    langSwitcher.value = savedLanguage;

    langSwitcher.addEventListener('change', (event) => {
        setLanguage(event.target.value);
    });
    
    /* --------------------------------- */
    /* 4. منطق المؤشر المخصص (Custom Cursor Logic) */
    /* --------------------------------- */
    const cursor = document.getElementById('custom-cursor');
    // العناصر التي ستؤدي إلى تغيير شكل المؤشر
    const links = document.querySelectorAll('a, button, select'); 
    
    // 1. تتبّع حركة المؤشر
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 2. تفعيل تأثير "النمو" عند التحويم
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            document.body.classList.add('link-grow');
        });

        link.addEventListener('mouseleave', () => {
            document.body.classList.remove('link-grow');
        });
    });
});
