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
/* 3. تطبيق المنطق عند تحميل الصفحة (اللغة والمؤشر 3D) */
/* --------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    // ********* منطق تغيير اللغة *********
    const langSwitcher = document.getElementById('language-switcher');
    
    const savedLanguage = localStorage.getItem('STVX_language') || 'ar';
    setLanguage(savedLanguage);
    langSwitcher.value = savedLanguage;

    langSwitcher.addEventListener('change', (event) => {
        setLanguage(event.target.value);
    });
    
    
    /* --------------------------------- */
    /* 4. منطق مؤشر 3D Fluid Glass باستخدام THREE.js */
    /* --------------------------------- */
    
    // التأكد من أن مكتبة THREE.js قد تم تحميلها (ستكون مُعرّفة بعد التعديل في index.html)
    if (typeof THREE === 'undefined') {
        console.error("THREE.js library is not loaded. Cannot initialize 3D cursor.");
        return;
    }
    
    const canvas = document.getElementById('three-cursor');
    
    // ********** إعداد المشهد الأساسي **********
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true }); 
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ********** إنشاء الجسم الزجاجي (Fluid Glass) **********
    
    const geometry = new THREE.SphereGeometry(0.3, 32, 32); 

    const material = new THREE.MeshPhysicalMaterial({
        color: 0x9c27b0, // بنفسجي فاتح
        metalness: 0.1,
        roughness: 0,
        ior: 1.5,
        transmission: 1.0, 
        transparent: true,
        opacity: 0.8,
        reflectivity: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });

    const glassCursor = new THREE.Mesh(geometry, material);
    scene.add(glassCursor);

    // ********** الإضاءة **********
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // ********** منطق حركة المؤشر والتتبع **********
    const targetPosition = new THREE.Vector3(0, 0, 0); 
    
    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = - (event.clientY / window.innerHeight) * 2 + 1;

        targetPosition.set(mouseX * camera.aspect * (camera.position.z * 0.4), mouseY * (camera.position.z * 0.4), 0);
    });

    // ********** حلقة الرسم (Animation Loop) **********

    function animate() {
        requestAnimationFrame(animate);

        glassCursor.position.lerp(targetPosition, 0.1); 
        
        glassCursor.rotation.x += 0.005;
        glassCursor.rotation.y += 0.005;

        renderer.render(scene, camera);
    }

    animate();

    // ********** الاستجابة لتغيير حجم الشاشة **********
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
