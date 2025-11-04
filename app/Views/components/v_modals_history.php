<div class="modal-backdrop" id="monthFilterModalBackdrop" style="display:none;">
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
                <h2 class="history-detail-task-name" id="historyDetailTaskName">Redesain Halaman Beranda MySAU</h2>
            </div>
            
            <div class="history-detail-section">
                <span class="history-detail-label">Task Detail</span>
                <p class="history-detail-value" id="historyDetailTaskDetails">Task "Redesain..."</p>
            </div>
            
            <div class="history-detail-section">
                <span class="history-detail-label">Assignee(s)</span>
                <div class="history-detail-assignees-grid" id="historyDetailAssignees">
                    <div class="history-assignee-item">
                        <img src="https://i.pravatar.cc/40?img=1" alt="Lee Ji-eun">
                        <span>Lee Ji-eun</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn-primary" id="restoreHistoryTaskButton">
                <i class='bx bx-revision'></i> Restore
            </button>
            <button class="btn-secondary" id="closeHistoryDetailModal">
                <i class='bx bx-x'></i> Close
            </button>
        </div>
    </div>
</div>/