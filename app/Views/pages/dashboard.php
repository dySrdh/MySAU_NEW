<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?? 'Dashboard - My SAU' ?></title>
    
    <!-- CSS Files -->
    <link rel="stylesheet" href="<?= base_url('css/global.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/home.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/menu.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/banner.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/calendar.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/notification.css') ?>">
    
    <!-- Swiper CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
    
    <!-- Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>

    <?= $this->include('components/v_header') ?>

    <div class="main-container">
        
        <aside class="sidebar-left">
            <?= $this->include('components/v_profil') ?>
            <?= $this->include('components/v_todo') ?>
        </aside>

        <main class="content-middle">
            <?= $this->include('components/v_visimisi') ?>

            <div class="card-header menu-widget-header">
                <h4><i class='bx bxs-grid-alt'></i> Quick Access Widgets</h4>
                <a href="<?= base_url('all-menus') ?>" class="btn-icon-styled">
                    <i class='bx bxs-grid'></i> View All Menus
                </a>
            </div>
            
            <?= $this->include('components/v_menu') ?>
        </main>

        <aside class="sidebar-right">
            <?= $this->include('components/v_info_kanan') ?>
            <?= $this->include('components/v_kalender') ?>
        </aside>
        
    </div>

    <?= $this->include('components/v_modals_todo') ?>

    <!-- Swiper JS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <!-- Pass Data to JavaScript -->
    <script>
        const BASE_URL = "<?= base_url() ?>";
        const CURRENT_PAGE = "<?= $current_page ?? 'home' ?>";
        const ALL_WORKERS_DATA = <?= json_encode($workers ?? []) ?>;
        const ALL_MENUS_DATA = <?= json_encode($menus ?? []) ?>;
    </script>
    
    <!-- JavaScript Files -->
    <script src="<?= base_url('js/calendar.js') ?>"></script>
    <script src="<?= base_url('js/banner.js') ?>"></script>
    <script src="<?= base_url('js/notification.js') ?>"></script>
    <script src="<?= base_url('js/menu.js') ?>"></script>

    <!-- Task Management Scripts -->
    <script src="<?= base_url('js/menu_pages.js') ?>"></script>
    <script src="<?= base_url('js/task-utils.js') ?>"></script>
    <script src="<?= base_url('js/task-render.js') ?>"></script>
    <script src="<?= base_url('js/task-storage.js') ?>"></script>
    <script src="<?= base_url('js/task-modals.js') ?>"></script>
    <script src="<?= base_url('js/task-main.js') ?>"></script>
    <script src="<?= base_url('js/history.js') ?>"></script>

</body>
</html>