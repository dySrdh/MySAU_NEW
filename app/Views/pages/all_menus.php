<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Menus - My SAU</title>

    <link rel="stylesheet" href="<?= base_url('css/global.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/home.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/menu.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/notification.css') ?>">
    
    <link rel="stylesheet" href="<?= base_url('css/menu_pages.css') ?>">
    
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
</head>
<body>
    <?= $this->include('components/v_header') ?>
    
    <div class="main-container">
        
        <aside class="sidebar-left">
            <?= $this->include('components/v_profil') ?>
            <?= $this->include('components/v_todo') ?>
        </aside>

        <div class="main-content-wrapper">

            <div class="all-menus-page">
    
                <a href="#" id="returnToMainFromMenus" class="back-link">
                    <i class='bx bx-arrow-back'></i> Kembali ke Dashboard
                </a>

                <div id="menusContentContainer">

                    <?php foreach ($menus as $category => $items): ?>
                    <div class="menu-category-section">
                        
                        <div class="category-title">
                            <h2><?= $category ?></h2>
                        </div>
                        
                        <div class="menu-grid">
                            <?php foreach ($items as $menu): ?>
                            <div class="menu-item" data-name="<?= strtolower($menu['name']) ?>" data-link="<?= $menu['link_url'] ?>">
                                <i class='<?= $menu['icon_class'] ?>'></i>
                                <span><?= $menu['name'] ?></span>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <?php endforeach; ?>

                    <div class="no-results" style="display:none;">
                        <p>Tidak ada menu yang ditemukan</p>
                    </div>

                </div> </div> </div> </div> <?= $this->include('components/v_modals_todo') ?>
    <?= $this->include('components/v_modals_history') ?>

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <script>
        // Data PHP ke JS
        const BASE_URL = "<?= base_url() ?>";
        const CURRENT_PAGE = "<?= $current_page ?? 'all_menus' ?>";
        const ALL_WORKERS_DATA = <?= json_encode($workers ?? []) ?>;
        const ALL_MENUS_DATA = <?= json_encode($menus ?? []) ?>; 
    </script>
    

    <script src="<?= base_url('js/menu_pages.js') ?>"></script>
    <script src="<?= base_url('js/notification.js') ?>"></script>
    <script src="<?= base_url('js/menu.js') ?>"></script>
    <script src="<?= base_url('js/task-utils.js') ?>"></script>
    <script src="<?= base_url('js/task-render.js') ?>"></script>
    <script src="<?= base_url('js/task-storage.js') ?>"></script>
    <script src="<?= base_url('js/task-modals.js') ?>"></script>
    <script src="<?= base_url('js/task-main.js') ?>"></script>
    <script src="<?= base_url('js/history.js') ?>"></script>
    
    
    
</body>
</html>