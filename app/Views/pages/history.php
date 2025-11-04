<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="<?= base_url('css/global.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/history.css') ?>">
</head>
<body>
    <?= $this->include('components/v_header') ?>

    <div class="main-container">
        <div class="history-page">
            <div class="page-header">
                <button id="returnToMainPageLink" class="btn-back">
                    <i class='bx bx-arrow-back'></i> Kembali ke Dashboard
                </button>
                <h2>Task History</h2>
            </div>

            <div class="history-controls">
                <button id="monthFilterButton">
                    <i class='bx bx-filter'></i>
                    <span>All Months</span>
                </button>
            </div>

            <div id="historyTaskGridScroll" class="history-scroll-container">
                <div id="historyTaskGridContainer" class="history-task-container">
                    <!-- Tasks will be loaded here by JS -->
                </div>
            </div>
        </div>
    </div>

    <?= $this->include('components/v_modals_history') ?>

    <script>
        const BASE_URL = "<?= base_url() ?>";
        const CURRENT_PAGE = "<?= $current_page ?>";
        const ALL_WORKERS_DATA = <?= json_encode($workers) ?>;
    </script>
    <script src="<?= base_url('js/menu_pages.js') ?>"></script>
    <script src="<?= base_url('js/history.js') ?>"></script>
</body>
</html>