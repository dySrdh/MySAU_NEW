<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ganti Password - My SAU</title>

    <link rel="stylesheet" href="<?= base_url('css/global.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/home.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/menu.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/notification.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/menu_pages.css') ?>">
    
    <link rel="stylesheet" href="<?= base_url('css/change_password.css') ?>">

    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>

    <?= $this->include('components/v_header') ?>

    <div class="main-container">
        
        <aside class="sidebar-left">
            <?= $this->include('components/v_profil') ?>
            <?= $this->include('components/v_todo') ?>
        </aside>

        <?= $this->include('components/v_page_change_password') ?>

    </div> <?= $this->include('components/v_modals_todo') ?>

    <script>
        // Data PHP ke JS
        const BASE_URL = "<?= base_url() ?>";
        const CURRENT_PAGE = "<?= $current_page ?? 'change-password' ?>";
    </script>
    
    <script src="<?= base_url('js/notification.js') ?>"></script>
    <script src="<?= base_url('js/task-utils.js') ?>"></script>
    <script src="<?= base_url('js/task-render.js') ?>"></script>
    <script src="<?= base_url('js/task-storage.js') ?>"></script>
    <script src="<?= base_url('js/task-modals.js') ?>"></script>
    <script src="<?= base_url('js/task-main.js') ?>"></script>
    
    <script src="<?= base_url('js/change_password.js') ?>"></script>

    <script>
        // Script Dropdown Header (Sama seperti halaman lain)
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
    </script>
</body>
</html>