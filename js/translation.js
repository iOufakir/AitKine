
const transactionIdsElements = [
    "welcome-text",
    "welcome-text-details",
    "btn-open-location",
    "aitkine-video",
    "span-scroll-down",
    "about-title",
    "about-details-1",
    "about-details-2",
    "about-details-3",
    "into-village-title",
    "about-country-title",
    "about-country-detail-1",
    "about-country-detail-2",
    "origin-title",
    "origin-details-1",
    "village-location-title",
    "village-details-1",
    "travel-title",
    "travel-description-1",
    "gallery-title",
    "weather-title",
    "weather-details-1",
    "weather-details-2",
    "weather-details-3",
    "weather-details-4",
    "contact-title",
    "contact-submit-button",
    "footer-details-1",
    "footer-details-2",
    "footer-link-home",
    "footer-link-about",
    "footer-link-gallery",
    "action-watch-video",
    "header-link-home",
    "header-link-about",
    "header-link-gallery",
    "header-link-weather",
    "header-link-contact"
];

const loadTranslations = async (lang) => {
    const response = await fetch(`translations/${lang}.json`);
    return await response.json();
}


const changeLanguage = async (lang) => {
    const cachedTranslations = localStorage.getItem(`translations_${lang}`);
    let translationsData;
    if (cachedTranslations) {
        translationsData = JSON.parse(cachedTranslations);
    } else {
        translationsData = await loadTranslations(lang);
        localStorage.setItem(`translations_${lang}`, JSON.stringify(translationsData));
    }

    applyRTLStyles(lang);
    updateTextContent(translationsData);
}

const updateTextContent = async (translations) => {
    transactionIdsElements.forEach(id => {
        const targetElement = document.querySelector(`#${id}`);
        if (targetElement && translations[id]) {
            targetElement.innerHTML = translations[id];
        }
    });
}


const applyRTLStyles = (lang) => {
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
        document.body.style.textAlign = 'right';
    } else {
        document.documentElement.dir = 'ltr';
        document.body.style.textAlign = 'left';
    }
}
