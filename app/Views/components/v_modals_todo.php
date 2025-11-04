<div class="modal-backdrop" id="addTaskModalBackdrop" style="display:none;">
    <div class="modal-content" id="addTaskModalContent">
        <div class="modal-header">
            <i class='bx bxs-edit modal-icon'></i>
            <div>
                <h3>Add New Task</h3>
                <p>Plan your next step by creating a new task.</p>
            </div>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="taskName">Task Name</label>
                <input type="text" id="taskName" placeholder="Task Name" maxlength="50" required>
                <div class="char-count">0/50</div>
            </div>
            <div class="form-group">
                <label for="taskDetails">Task Details</label>
                <textarea id="taskDetails" placeholder="Task Details" maxlength="200" required></textarea>
                <div class="char-count">0/200</div>
            </div>
            
            <div class="form-group">
                <label>Attachment (Optional)</label>
                <div class="attachment-area">
                    <span id="attachmentFileName" class="file-name-display">Your Attachment</span>
                    <input type="file" id="taskAttachment" style="display:none;">
                    <button class="btn-primary btn-add-attachment" id="addAttachmentBtn">
                        <i class='bx bx-plus'></i> Add Attachment
                    </button>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group half-width">
                    <label for="taskPriority">Task Priority</label>
                    <select id="taskPriority" required>
                        <option value="" disabled selected hidden>Task Priority</option>
                        <option value="Biasa">Biasa</option>
                        <option value="Segera">Segera</option>
                        <option value="Sangat Segera">Sangat Segera</option>
                    </select>
                </div>
                <div class="form-group half-width">
                    <label for="taskDueDate">Due Date</label>
                    <input type="text" id="taskDueDate" placeholder="dd/mm/yyyy" required>
                    <i class='bx bx-calendar date-icon'></i>
                </div>
            </div>
        </div>
        
        <div class="modal-footer">
            <div class="modal-assigned-workers" id="modalAssignedWorkers"></div>

            <div class="footer-buttons">
                <button class="btn-secondary" id="cancelAddTaskModal">
                    <i class='bx bx-x'></i> Cancel
                </button>
                <button class="btn-primary" id="nextToInviteWorkers">
                    Next <i class='bx bx-play'></i>
                </button>
                 <button class="btn-primary" id="createTaskBtn" style="display:none;">
                    <i class='bx bx-plus'></i> Create Task
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal-backdrop" id="inviteWorkersModalBackdrop" style="display:none;">
    <div class="modal-content" id="inviteWorkersModalContent">
        <div class="modal-header">
            <i class='bx bx-group modal-icon'></i>
            <div>
                <h3>Invite Workers to Task</h3>
                <p>Invite others, or skip for now.</p>
            </div>
        </div>
        <div class="modal-body">
            <div class="form-group search-workers-group">
                <input type="text" id="searchWorkers" placeholder="Search Workers...">
                <i class='bx bx-search search-icon'></i>
            </div>
            <div class="worker-list" id="workerListContainer">
                </div>
        </div>
        <div class="modal-footer">
            <div class="footer-buttons">
                <button class="btn-secondary" id="cancelInviteWorkersModal">
                    <i class='bx bx-x'></i> Cancel
                </button>
                <button class="btn-primary" id="skipInviteWorkers">
                    Skip for Now <i class='bx bx-play'></i>
                </button>
                <button class="btn-primary" id="nextFromInviteWorkers" style="display:none;">
                    Next <i class='bx bx-play'></i>
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal-backdrop" id="successModalBackdrop" style="display:none;">
    <div class="modal-content success-modal-content">
        <div class="modal-body">
            <img src="" id="successIllustration" alt="Success" class="success-illustration">
            <h3>Success!</h3>
            <p>Your new task has been created successfully.</p>
        </div>
        <div class="modal-footer">
            <button class="btn-primary" id="doneSuccessModal">
                <i class='bx bx-check'></i> Done
            </button>
        </div>
    </div>
</div>

<div class="modal-backdrop" id="failModalBackdrop" style="display:none;">
    <div class="modal-content fail-modal-content">
        <div class="modal-body">
            <img src="" id="failIllustration" alt="Failed" class="fail-illustration">
            <h3>Failed!</h3>
            <p>Something went wrong. Please try again.</p>
        </div>
        <div class="modal-footer">
            <button class="btn-secondary" id="retryTaskModal">
                <i class='bx bx-refresh'></i> Retry
            </button>
            <button class="btn-danger" id="cancelFailModal">
                <i class='bx bx-x'></i> Cancel
            </button>
        </div>
    </div>
</div>
<!-- Modal 5: Edit Task -->
<div class="modal-backdrop" id="editTaskModalBackdrop">
    <div class="modal-content">
        <div class="modal-header">
            <i class='bx bxs-edit modal-icon'></i>
            <div>
                <h3>Task Details</h3>
            </div>
        </div>
        
        <div class="modal-body edit-modal-body">
            <!-- Task Name - BARU DITAMBAHKAN -->
            <div>
                <label class="edit-section-label">Task Name</label>
                <input type="text" class="edit-input" id="editTaskName" placeholder="Task name" maxlength="100">
            </div>

            <!-- Task Details -->
            <div>
                <label class="edit-section-label">Task Details</label>
                <textarea class="edit-textarea" id="editTaskDetails" placeholder="Write your task details"></textarea>
            </div>

            <!-- Attachment -->
            <div id="editAttachmentSection" style="display: none;">
                <label class="edit-section-label">Attachment</label>
                <div class="edit-attachment-wrapper">
                    <i class='bx bxs-file-pdf'></i>
                    <div class="edit-attachment-info">
                        <span id="editAttachmentFileName">file.pdf</span>
                    </div>
                    <i class='bx bx-trash' id="editRemoveAttachment"></i>
                </div>
            </div>

            <!-- Priority & Due Date -->
            <div class="edit-form-row">
                <div class="edit-form-half">
                    <label>Task Priority</label>
                    <select id="editTaskPriority">
                        <option value="Biasa">Biasa</option>
                        <option value="Segera">Segera</option>
                        <option value="Sangat Segera">Sangat Segera</option>
                    </select>
                </div>

                <div class="edit-form-half">
                    <label>Due Date</label>
                    <input type="date" id="editTaskDueDate">
                </div>
            </div>

            <!-- Assignees -->
            <div class="edit-assignees-section">
                <label class="edit-section-label">Assignee(s)</label>
                <div class="edit-assignees-grid" id="editAssigneesGrid">
                    <!-- Avatar workers akan di sini -->
                </div>
            </div>
        </div>

        <div class="modal-footer edit-modal-footer">
            <div class="footer-buttons">
                <button class="btn-secondary" id="cancelEditTaskModal">
                    <i class='bx bx-x'></i> Cancel
                </button>
                <button class="btn-primary" id="saveEditTaskBtn">
                    <i class='bx bx-check'></i> Save
                </button>
            </div>
        </div>
    </div>
</div>
<!-- Modal 4: Task Detail -->
<div class="modal-backdrop" id="taskDetailModalBackdrop">
    <div class="modal-content">
        <div class="modal-header">
            <i class='bx bxs-file-doc modal-icon'></i>
            <div>
                <h3>Task Details</h3>
            </div>
        </div>
        
        <div class="modal-body detail-modal-body">
            <!-- Task Name -->
            <div class="detail-section">
                <h2 class="detail-task-name" id="detailTaskName">Task Name Here</h2>
                <span class="detail-priority-tag" id="detailTaskPriorityTag">Segera</span>
            </div>

            <!-- Due Date -->
            <div class="detail-section">
                <span class="detail-label">Due date</span>
                <span class="detail-value" id="detailTaskDueDate">November 1, 2024</span>
            </div>

            <!-- Task Details -->
            <div class="detail-section">
                <span class="detail-label">Task Detail</span>
                <p class="detail-value" id="detailTaskDetails">Task details will appear here...</p>
            </div>

            <!-- Attachment -->
            <div class="detail-section" id="detailTaskAttachmentWrapper" style="display: none;">
                <span class="detail-label">Attachment</span>
                <div class="detail-attachment-wrapper">
                    <i class='bx bxs-file-pdf'></i>
                    <div class="detail-attachment-info">
                        <span id="detailTaskAttachmentName">file.pdf</span>
                    </div>
                    <i class='bx bx-download' id="detailTaskAttachmentDownload"></i>
                </div>
            </div>

            <!-- Assignees -->
            <div class="detail-section">
                <span class="detail-label">Assignee(s)</span>
                <div class="detail-assignees-grid" id="detailTaskAssignees">
                    <!-- Akan diisi oleh JavaScript -->
                </div>
            </div>
        </div>

        <div class="modal-footer detail-modal-footer">
            <button class="btn-secondary" id="closeDetailModal">
                <i class='bx bx-x'></i> Close
            </button>
            <button class="btn-primary" id="editDetailModal">
                <i class='bx bx-edit'></i> Edit
            </button>
        </div>
    </div>
</div>