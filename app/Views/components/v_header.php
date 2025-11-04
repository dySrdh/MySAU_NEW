<header class="main-header">
    
    <div class="header-left">
        <img src="<?= base_url('images/logo_mysau.png') ?>" alt="MySAU Logo" class="header-logo">
    </div>

    <div class="header-greeting">
        <h2>Hello, SAU Peeps! 👋</h2>
        <p>Jangan lupa untuk tetap semangat dan sukseskan harimu!</p>
    </div>

    <div class="header-tools">
        
        <button class="icon-button"><i class='bx bxs-moon'></i></button>
        
        <div class="notification-wrapper">
           
            <button class="icon-button notification-button" id="notificationBtn">
                <i class='bx bxs-bell'></i>
                <span class="notification-count" id="notificationCount" style="display: none;">0</span>
            </button>

            <!-- Dropdown Notifikasi -->
            <?= $this->include('components/v_notification_dropdown') ?>
        </div>

        <div class="search-bar">
            <i class='bx bx-search'></i>
            <input type="text" placeholder="Search Menu...">
        </div>
    </div>

</header>

