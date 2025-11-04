<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta tags & CSS -->
    <link rel="stylesheet" href="<?= base_url('css/global.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/home.css') ?>">
    <!-- Other CSS files -->
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
            <?= $this->include('components/v_menu') ?>
        </main>

        <aside class="sidebar-right">
            <?= $this->include('components/v_info_kanan') ?>
            <?= $this->include('components/v_kalender') ?>
        </aside>
    </div>

    <script>
        const BASE_URL = "<?= base_url() ?>";
        const CURRENT_PAGE = "<?= $current_page ?>";
        const ALL_WORKERS_DATA = <?= json_encode($workers) ?>;
    </script>
    
    <script src="<?= base_url('js/menu_pages.js') ?>"></script>
    <!-- Other JS files -->
</body>
</html>