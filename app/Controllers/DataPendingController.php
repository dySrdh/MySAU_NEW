<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class DataPendingController extends BaseController
{
    public function index()
    {
        // Data dummy untuk tabel (nantinya ini dari database/model)
        $pending_data = [
            [
                'id' => 1, // Untuk ID unik tombol detail
                'personal_number' => '500000002',
                'nama_pekerja' => 'Ananda Arya Pratama',
                'tgl_pkwt' => '2023-06-24',
                'tmt_pkwt' => '2023-06-07',
                'no_pkwt' => 'TEST/TEST',
            ]
        ];

        $data = [
            'page_title' => 'Data Pending Pekerja',
            'pending_workers' => $pending_data // Kirim data ke view
        ];

        // Memuat view utama dari folder 'pages/'
        return view('pages/data_pending_pekerja', $data);
    }
}