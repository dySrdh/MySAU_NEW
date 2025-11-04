/* File: public/js/banner.js */

// Initialize Swiper Banner
document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah element swiper ada di halaman
    const swiperElement = document.querySelector('.info-kanan-swiper');
    
    if (swiperElement) {
        const bannerSwiper = new Swiper('.info-kanan-swiper', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            speed: 600,
            effect: 'slide', // bisa diganti: 'fade', 'cube', 'flip', 'coverflow'
        });
        
        console.log('Banner Swiper initialized successfully');
    }
});