<div class="card profile-card">
    <div class="profile-header">
        
        <img src="<?= base_url(esc($user['avatar_url'])) ?>" alt="Profile Picture" class="profile-pic">
        <div class="profile-info">
            <strong><?= esc($user['name']) ?></strong>
            <span><?= esc($user['id']) ?></span>
        </div>
        
        <button class="btn-icon-dropdown" id="profile-settings-btn">
            <i class='bx bxs-cog'></i>
            
            <i class='bx bxs-chevron-down' id="profile-arrow-icon"></i>

        </button>
    </div>
    
    <div class="profile-details">
        <div class="detail-item">
            <i class='bx bxs-briefcase'></i>
            <span><?= esc($user['role']) ?></span>
        </div>
        <div class="detail-item">
            <i class='bx bxs-buildings'></i>
            <span><?= esc($user['department']) ?></span>
        </div>
    </div>

    <div class="profile-dropdown" id="profile-dropdown-menu">
        <a href="#" class="dropdown-item">
            <i class='bx bxs-user-circle dropdown-icon-grey'></i>
            <span>Profile Settings</span>
        </a>
        <a href="#" class="dropdown-item">
            <i class='bx bxs-key dropdown-icon-grey'></i>
            <span>Change Password</span>
        </a>

        <hr class="dropdown-divider">

        <a href="#" class="dropdown-item dropdown-item-signout">
            <i class='bx bxs-log-out-circle dropdown-icon-red'></i>
            <span>Sign Out</span>
        </a>
    </div>
</div>