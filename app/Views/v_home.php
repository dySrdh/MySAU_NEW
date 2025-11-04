<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - My SAU</title>
    
    <link rel="stylesheet" href="<?= base_url('css/global.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/home.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/menu.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/menu_pages.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/history.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/banner.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/calendar.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/notification.css') ?>">
    
    <!-- New CSS Files -->
    <link rel="stylesheet" href="<?= base_url('css/profile.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/presensi.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/data_presensi.css') ?>">
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
    
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>

    <?= $this->include('components/v_header') ?>

    <div class="main-container">
        
        <aside class="sidebar-left">
            <?= $this->include('components/v_profil') ?>
            <?= $this->include('components/v_todo') ?>
        </aside>

        <!-- Main Dashboard Content -->
        <div id="mainDashboardContent" class="main-content-wrapper" style="display: contents;">            
            <main class="content-middle">
                <?= $this->include('components/v_visimisi') ?>

                <div class="card-header menu-widget-header">
                    <h4><i class='bx bxs-grid-alt'></i> Quick Access Widgets</h4>
                    <a href="#" id="viewAllMenusBtn" class="btn-icon-styled">
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

        <!-- All Menus Page -->
        <div id="allMenusPageContent" class="main-content-wrapper" style="display: none;">
            <?= $this->include('components/v_page_all_menus') ?>
        </div>

        <!-- History Page -->
        <div id="historyPageContent" class="main-content-wrapper" style="display: none;">
            <?= $this->include('components/v_page_history') ?>
        </div>

        <!-- Profile / Data Pribadi Page -->
        <div id="profilePageContent" class="main-content-wrapper" style="display: none;">
            <?= $this->include('components/v_page_data_pribadi') ?>
        </div>

        <!-- Presensi Online Page -->
        <div id="presensiPageContent" class="main-content-wrapper" style="display: none;">
            <?= $this->include('components/v_page_presensi') ?>
        </div>

        <!-- Data Presensi Page -->
        <div id="dataPresensiPageContent" class="main-content-wrapper" style="display: none;">
            <?= $this->include('components/v_page_data_presensi') ?>
        </div>

    </div>

    <?= $this->include('components/v_modals_todo') ?>
    <?= $this->include('components/v_modals_history') ?>

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <script>
        // 1. Script untuk Dropdown Profile
        const profileBtn = document.getElementById('profile-settings-btn');
        const profileMenu = document.getElementById('profile-dropdown-menu');
        const profileArrow = document.getElementById('profile-arrow-icon');

        if (profileBtn && profileMenu && profileArrow) {
            profileBtn.addEventListener('click', function(event) {
                const isShowing = profileMenu.classList.toggle('show');
                profileArrow.className = isShowing ? 'bx bxs-chevron-up' : 'bx bxs-chevron-down';
                event.stopPropagation();
            });

            window.addEventListener('click', function(event) {
                if (profileMenu.classList.contains('show') && !profileMenu.contains(event.target)) {
                    profileMenu.classList.remove('show');
                    profileArrow.className = 'bx bxs-chevron-down';
                }
            });
        }

        // 2. Kirim Data PHP ke JavaScript
        const ALL_WORKERS_DATA = <?= json_encode($workers ?? []) ?>;
        const BASE_URL = "<?= base_url() ?>";
        const ALL_MENUS_DATA = <?= json_encode($menus ?? []) ?>; 
        const CURRENT_PAGE = "<?= $current_page ?? 'home' ?>";
    </script>
    
    <script src="<?= base_url('js/menu_pages.js') ?>"></script>
    <script src="<?= base_url('js/calendar.js') ?>"></script>
    <script src="<?= base_url('js/banner.js') ?>"></script>
    <script src="<?= base_url('js/notification.js') ?>"></script>
    <script src="<?= base_url('js/menu.js') ?>"></script>

    <script src="<?= base_url('js/task-utils.js') ?>"></script>
    <script src="<?= base_url('js/task-render.js') ?>"></script>
    <script src="<?= base_url('js/task-storage.js') ?>"></script>
    <script src="<?= base_url('js/task-modals.js') ?>"></script>
    <script src="<?= base_url('js/task-main.js') ?>"></script>
    <script src="<?= base_url('js/history.js') ?>"></script>

    <!-- New JS Files -->
    <script src="<?= base_url('js/profile.js') ?>"></script>
    <script src="<?= base_url('js/presensi.js') ?>"></script>
    <script src="<?= base_url('js/data_presensi.js') ?>"></script>

</body>
</html>