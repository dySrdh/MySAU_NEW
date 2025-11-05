<?php
/*
  FILE: components/v_page_history.php
  Ini adalah file komponen baru yang berisi semua konten dan 
  modal yang spesifik untuk halaman Task History.
*/
?>

<a href="#" class="back-link" id="returnToMainFromMenus">
    <i class='bx bx-arrow-back'></i> Kembali ke Dashboard
</a>

<div class="history-page-container card"> 
    
    <div class="history-header-box">
        <div class="history-title-group">
            <i class='bx bxs-check-circle'></i>
            <h2>Task History</h2>
        </div>
        
        <div class="history-controls-group">
            <button class="btn-filter-month" id="monthFilterButton">
                <span>December</span> <i class='bx bxs-down-arrow'></i>
            </button>
            <div class="history-search-bar">
                <i class='bx bx-search'></i>
                <input type="text" id="historySearchInput" placeholder="Search Task...">
            </div>
        </div>
    </div>

    <div class="history-task-grid-scroll" id="historyTaskGridScroll">
        <div class="history-task-grid-container" id="historyTaskGridContainer">
            </div>
    </div>

</div> <div class="modal-backdrop" id="monthFilterModalBackdrop" style="display:none;">
    <div class="modal-content month-filter-modal">
        <div class="month-filter-header">
            <h3 id="monthFilterYear">2024</h3>
        </div>
        <div class="month-filter-grid">
            <span class="month-item" data-month="Jan">Jan</span>
            <span class="month-item" data-month="Feb">Feb</span>
            <span class="month-item" data-month="Mar">Mar</span>
            <span class="month-item" data-month="Apr">Apr</span>
            <span class="month-item" data-month="May">May</span>
            <span class="month-item" data-month="Jun">Jun</span>
            <span class="month-item" data-month="Jul">Jul</span>
            <span class="month-item" data-month="Aug">Aug</span>
            <span class="month-item" data-month="Sep">Sep</span>
            <span class="month-item" data-month="Oct">Oct</span>
            <span class="month-item" data-month="Nov">Nov</span>
            <span class="month-item" data-month="Dec">Dec</span>
        </div>
        <div class="modal-footer">
            <button class="btn-secondary" id="cancelMonthFilter">
                <i class='bx bx-x'></i> Cancel
            </button>
        </div>
    </div>
</div>

<div class="modal-backdrop" id="historyDetailModalBackdrop" style="display:none;">
    <div class="modal-content">
        <div class="modal-header">
            <i class='bx bxs-file-doc modal-icon'></i>
            <div>
                <h3>Task Details</h3>
            </div>
        </div>
        <div class="modal-body history-detail-body">
            <div class="history-detail-section">
                <h2 class="history-detail-task-name" id="historyDetailTaskName">Task Name</h2>
            </div>
            
            <div class="history-detail-section">
                <span class="history-detail-label">Task Detail</span>
                <p class="history-detail-value" id="historyDetailTaskDetails">Task details will appear here...</p>
            </div>
            
            <div class="history-detail-section">
                <span class="history-detail-label">Assignee(s)</span>
                <div class="history-detail-assignees-grid" id="historyDetailAssignees">
                    </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn-secondary" id="closeHistoryDetailModal">
                <i class='bx bx-x'></i> Cancel
            </button>
            <button class="btn-primary" id="restoreHistoryTaskButton">
                <i class='bx bx-revision'></i> Restore
            </button>
        </div>
    </div>
</div>