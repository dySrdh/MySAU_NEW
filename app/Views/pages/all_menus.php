<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="<?= base_url('css/global.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/menu_pages.css') ?>">
</head>
<body>
    <?= $this->include('components/v_header') ?>

    <div class="main-container">
        <div class="all-menus-page">
            <div class="page-header">
                <button id="returnToMainFromMenus" class="btn-back">
                    <i class='bx bx-arrow-back'></i> Kembali ke Dashboard
                </button>
                <h2>All Menus</h2>
            </div>

            <div class="search-bar">
                <input type="text" id="menuSearchInput" placeholder="Cari menu...">
            </div>

            <div class="menu-count">
                Total: <span id="menuCount"><?= count($menus) ?></span> menus
            </div>

            <!-- Menu Grid by Category -->
            <?php foreach ($menus as $category => $items): ?>
            <div class="menu-category-section">
                <h3><?= $category ?></h3>
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
        </div>
    </div>

    <script>
        const BASE_URL = "<?= base_url() ?>";
        const CURRENT_PAGE = "<?= $current_page ?>";
    </script>
    <script src="<?= base_url('js/menu_pages.js') ?>"></script>
</body>
</html>