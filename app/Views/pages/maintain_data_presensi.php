<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-K">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maintain Data Presensi - My SAU</title>
    
    <link rel="stylesheet" href="<?= base_url('css/global.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/home.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/menu.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/notification.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/menu_pages.css') ?>">
    
    <link rel="stylesheet" href="<?= base_url('css/data_pending.css') ?>">
    
    <link rel="stylesheet" href="<?= base_url('css/profile.css') ?>">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>

    <?= $this->include('components/v_header') ?>

    <div class="main-container">
        
        <aside class="sidebar-left">
            <?= $this->include('components/v_profil') ?>
            <?= $this->include('components/v_todo') ?>
        </aside>

        <?= $this->include('components/v_page_maintain_data_presensi') ?>

    </div>

    <?= $this->include('components/v_modals_todo') ?>

    <script>
        const BASE_URL = "<?= base_url() ?>";
        const CURRENT_PAGE = "maintain-presensi"; // Set halaman aktif
        const ALL_WORKERS_DATA = <?= json_encode($workers_json ?? []) ?>; 
    </script>
    
    <script src="<?= base_url('js/menu_pages.js') ?>"></script>
    <script src="<?= base_url('js/notification.js') ?>"></script>
    <script src="<?= base_url('js/task-utils.js') ?>"></script>
    <script src="<?= base_url('js/task-render.js') ?>"></script>
    <script src="<?= base_url('js/task-storage.js') ?>"></script>
    <script src="<?= base_url('js/task-modals.js') ?>"></script>
    <script src="<?= base_url('js/task-main.js') ?>"></script>

</body>
</html>