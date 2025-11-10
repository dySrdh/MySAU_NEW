<div id="dataPendingPageContent">
    
    <div class="page-header">
        <a href="<?= base_url('/maintain-data') ?>" class="back-link">
            <i class='bx bx-arrow-back'></i> Kembali ke Maintain Data
        </a>
    </div>

    <div class="profile-page-container">

        <div class="profile-header-box">
            <div class="profile-title-group">
                <i class='bx bxs-user-check'></i> 
                <h2>Data Pending Pekerja</h2>
            </div>
        </div>

        <div class="profile-content-wrapper">

            <div class="data-table-container">
                <div class="table-controls">
                    <div class="show-entries">
                        <label>Show 
                            <select name="pendingWorkerTable_length" aria-controls="pendingWorkerTable">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select> entries
                        </label>
                    </div>
                    <div class="search-box">
                        <label>Search:
                            <input type="search" placeholder="" aria-controls="pendingWorkerTable">
                        </label>
                    </div>
                </div>

                <div class="table-responsive">
                    <table id="pendingWorkerTable" class="data-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Personal Number</th>
                                <th>Nama Pekerja</th>
                                <th>Tanggal PKWT</th>
                                <th>TMT PKWT</th>
                                <th>Nomor PKWT</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (!empty($pending_workers)): ?>
                                <?php $i = 1; ?>
                                <?php foreach ($pending_workers as $worker): ?>
                                <tr>
                                    <td><?= $i++; ?></td>
                                    <td><?= esc($worker['personal_number']); ?></td>
                                    <td><?= esc($worker['nama_pekerja']); ?></td>
                                    <td><?= esc($worker['tgl_pkwt']); ?></td>
                                    <td><?= esc($worker['tmt_pkwt']); ?></td>
                                    <td><?= esc($worker['no_pkwt']); ?></td>
                                    <td>
                                        <a href="<?= base_url('detail-pekerja/' . $worker['id']) ?>" class="btn-detail">Detail</a>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <tr>
                                    <td colspan="7" style="text-align: center;">Data Tidak Ditemukan</td>
                                </tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>

                <div class="table-footer">
                    <div class="show-info">
                        Showing 1 to 1 of 1 entries
                    </div>
                    <div class="pagination">
                        <a href="#" class="page-btn disabled">Previous</a>
                        <a href="#" class="page-btn active">1</a>
                        <a href="#" class="page-btn">Next</a>
                    </div>
                </div>
            </div> </div> </div> </div>