// 1. تحديد النصوص المترجمة
// هذا هو قلب نظام تغيير اللغة. نستخدم "مفتاح" واحد لكل نص.
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
    // 1. ترجمة جميع النصوص: نبحث عن جميع العناصر التي لديها خاصية 'data-key'
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[key] && translations[key][language]) {
            element.textContent = translations[key][language];
        }
    });

    // 2. تحديث خاصية اللغة واتجاه النص في وسم <html>
    const html = document.documentElement;
    html.lang = language; // تحديث لغة الصفحة
    html.dir = (language === 'ar') ? 'rtl' : 'ltr'; // تغيير اتجاه النص (Right-to-Left للأفقي)
    
    // 3. تخزين اللغة المختارة في ذاكرة المتصفح
    localStorage.setItem('STVX_language', language);
}

// 3. ربط الدالة بزر اختيار اللغة
document.addEventListener('DOMContentLoaded', () => {
    const langSwitcher = document.getElementById('language-switcher');
    
    // محاولة تحميل اللغة المحفوظة أو استخدام "ar" كإعداد افتراضي
    const savedLanguage = localStorage.getItem('STVX_language') || 'ar';
    
    // تطبيق اللغة المحفوظة
    setLanguage(savedLanguage);
    langSwitcher.value = savedLanguage; // تحديد الخيار الصحيح في القائمة المنسدلة

    // إضافة مستمع حدث لتغيير اللغة عند اختيار خيار جديد
    langSwitcher.addEventListener('change', (event) => {
        setLanguage(event.target.value);
    });
});
