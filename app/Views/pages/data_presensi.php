<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Presensi - My SAU</title>

    <link rel="stylesheet" href="<?= base_url('css/global.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/home.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/menu.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/notification.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/menu_pages.css') ?>">
    
    <link rel="stylesheet" href="<?= base_url('css/data_presensi.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/profile.css') ?>"> <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <?= $this->include('components/v_header') ?>

    <div class="main-container">
        
        <aside class="sidebar-left">
            <?= $this->include('components/v_profil') ?>
            <?= $this->include('components/v_todo') ?>
        </aside>

        <?= $this->include('components/v_page_data_presensi') ?>

    </div> <?= $this->include('components/v_modals_todo') ?>

    <script>
        // Variabel global JS
        const BASE_URL = "<?= base_url() ?>";
        const CURRENT_PAGE = "<?= $current_page ?? 'data_presensi' ?>";
        const ALL_WORKERS_DATA = <?= json_encode($workers ?? []) ?>;
    </script>

    <script src="<?= base_url('js/notification.js') ?>"></script>
    <script src="<?= base_url('js/menu_pages.js') ?>"></script>
    
    <script src="<?= base_url('js/task-utils.js') ?>"></script>
    <script src="<?= base_url('js/task-render.js') ?>"></script>
    <script src="<?= base_url('js/task-storage.js') ?>"></script>
    <script src="<?= base_url('js/task-modals.js') ?>"></script>
    <script src="<?= base_url('js/task-main.js') ?>"></script>
    
    <script src="<?= base_url('js/data_presensi.js') ?>"></script>
  
</body>
</html>