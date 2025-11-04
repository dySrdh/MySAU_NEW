<div class="notification-dropdown" id="notificationDropdown">
    <div class="notification-header">
        <h3>Notifications</h3>
        <button class="notification-close" id="notificationClose">
            <i class='bx bx-x'></i>
        </button>
    </div>

    <div class="notification-tabs">
        <button class="notification-tab active" data-tab="all">
            All <span class="tab-badge" id="allBadge">0</span>
        </button>
        <button class="notification-tab" data-tab="inbox">
            Inbox <span class="tab-badge" id="inboxBadge">0</span>
        </button>
        <button class="notification-tab" data-tab="task">
            Tasks <span class="tab-badge" id="tasksBadge">0</span>
        </button>
    </div>

    <div class="notification-content" id="notificationContent">
        <!-- Empty State -->
        <div class="notification-empty" id="notificationEmpty">
            <img src="<?= base_url('images/notification-empty.png') ?>" alt="No Notifications">
            <p>You have no notifications at the moment.</p>
        </div>

        <!-- Notification List -->
        <div class="notification-list" id="notificationList" style="display: none;">
            <!-- Notifications akan diisi oleh JavaScript -->
        </div>
    </div>
</div>