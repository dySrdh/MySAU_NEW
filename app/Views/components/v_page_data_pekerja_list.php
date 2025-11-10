<div id="dataPendingPageContent"> <div class="page-header">
        <a href="<?= base_url('/maintain-data') ?>" class="back-link">
            <i class='bx bx-arrow-back'></i> Kembali ke Maintain Data
        </a>
    </div>

    <div class="profile-page-container">

        <div class="profile-header-box">
            <div class="profile-title-group">
                <i class='bx bxs-group'></i> <h2>Data Pekerja</h2>
            </div>
        </div>

        <div class="profile-content-wrapper">

            <div class="table-actions-header">
                <a href="#" class="btn-download">
                    <i class='bx bxs-download'></i> Download List Pekerja
                </a>
                <a href="<?= base_url('data-pekerja/tambah') ?>" class="btn-add">
                    <i class='bx bx-plus'></i> Tambah Pekerja
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
                    <table id="dataPekerjaTable" class="data-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Personal Number</th>
                                <th>Nama Pekerja</th>
                                <th>Regional Office</th>
                                <th>Jabatan</th>
                                <th>TMT Masuk</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (!empty($workers)): ?>
                                <?php $i = 1; ?>
                                <?php foreach ($workers as $worker): ?>
                                <tr>
                                    <td><?= $i++; ?></td>
                                    <td><?= esc($worker['pn']); ?></td>
                                    <td><?= esc($worker['nama']); ?></td>
                                    <td><?= esc($worker['office']); ?></td>
                                    <td><?= esc($worker['jabatan']); ?></td>
                                    <td><?= esc($worker['tmt']); ?></td>
                                    <td>
                                        <a href="<?= base_url('data-pekerja/detail/' . $worker['id']) ?>" class="btn-detail">Detail</a>
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
                        Showing 1 to 10 of 10 entries
                    </div>
                    <div class="pagination">
                        <a href="#" class="page-btn disabled">Previous</a>
                        <a href="#" class="page-btn active">1</a>
                        <a href="#" class="page-btn">Next</a>
                    </div>
                </div>
            </div> </div> </div> </div>