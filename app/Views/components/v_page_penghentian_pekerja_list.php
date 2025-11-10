<div id="penghentianListPageContent">
    
    <div class="page-header">
        <a href="<?= base_url('/maintain-data') ?>" class="back-link">
            <i class='bx bx-arrow-back'></i> Kembali ke Maintain Data
        </a>
    </div>

    <div class="profile-page-container">

        <div class="profile-header-box">
            <div class="profile-title-group">
                <i class='bx bxs-user-minus'></i> <h2>Penghentian Pekerja</h2>
            </div>
        </div>

        <div class="profile-content-wrapper">

            <div class="table-actions-header">
                <a href="#" class="btn-download">
                    <i class='bx bxs-download'></i> Download List Penghentian Pekerja
                </a>
                <a href="<?= base_url('penghentian-pekerja/tambah') ?>" class="btn-add">
                    <i class='bx bx-plus'></i> Tambah Penghentian Pekerja
                </a>
            </div>

            <div class="data-table-container">
                <div class="table-controls">
                    <div class="show-entries">
                        <label>Show 
                            <select name="terminationsTable_length">
                                <option value="10">10</option>
                                <option value="25">25</option>
                            </select> entries
                        </label>
                    </div>
                    <div class="search-box">
                        <label>Search:
                            <input type="search" placeholder="">
                        </label>
                    </div>
                </div>

                <div class="table-responsive">
                    <table id="terminationsTable" class="data-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Personal Number</th>
                                <th>Nama Pekerja</th>
                                <th>Regional Office</th>
                                <th>Jabatan</th>
                                <th>No SK Keluar</th>
                                <th>TMT Keluar</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (!empty($terminations)): ?>
                                <?php $i = 1; ?>
                                <?php foreach ($terminations as $item): ?>
                                <tr>
                                    <td><?= $i++; ?></td>
                                    <td><?= esc($item['personal_number']); ?></td>
                                    <td><?= esc($item['nama']); ?></td>
                                    <td><?= esc($item['office']); ?></td>
                                    <td><?= esc($item['jabatan']); ?></td>
                                    <td><?= esc($item['no_sk'] ?? '-'); ?></td>
                                    <td><?= esc($item['tmt_keluar']); ?></td>
                                    <td><?= esc($item['status'] ?? '-'); ?></td>
                                </tr>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <tr>
                                    <td colspan="8" style="text-align: center;">Data Tidak Ditemukan</td>
                                </tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>

                <div class="table-footer">
                    <div class="show-info">
                        Showing 1 to 6 of 6 entries
                    </div>
                    <div class="pagination">
                        <a href="#" class="page-btn disabled">Previous</a>
                        <a href="#" class="page-btn active">1</a>
                        <a href="#" class="page-btn">Next</a>
                    </div>
                </div>
            </div> </div> </div> </div>