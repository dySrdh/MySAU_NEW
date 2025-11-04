<?php
/* File: components/v_info_kanan.php */

/* * PERBAIKAN:
 * Kita kembalikan div.card.info-kanan-card asli Anda.
 * Slider Swiper kita letakkan DI DALAM div tersebut.
 * Ini "mengisolasi" style Swiper agar tidak merusak layout card.
 */
?>

<div class="card info-kanan-card">

    <div class="swiper info-kanan-swiper">
        <div class="swiper-wrapper">
            
            <div class="swiper-slide">
                <img src="https://picsum.photos/400/200?random=1" alt="Info Banner 1">
            </div>
            
            <div class="swiper-slide">
                <img src="https://picsum.photos/400/200?random=2" alt="Info Banner 2">
            </div>

            <div class="swiper-slide">
                <img src="<?= base_url('images/submarine-banner.png') ?>" alt="Submarine Banner">
            </div>
            
        </div>
        
        <div class="swiper-pagination"></div>
    </div>
    
</div>