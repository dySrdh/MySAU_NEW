<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class PenghentianController extends BaseController
{
    /**
     * Halaman 1: Menampilkan LIST Penghentian Pekerja
     */
    public function index()
    {
        // Data dummy untuk tabel list (sesuai Gambar 1)
        $dummy_terminations = [
            [
                'personal_number' => '500000001',
                'nama' => 'Aisah Putri Shabina',
                'office' => 'Kantor Pusat|Business Development Team',
                'jabatan' => 'Junior Officer',
                'no_sk' => 'test',
                'tmt_keluar' => '2025-09-22',
                'status' => 'pending'
            ],
            [
                'personal_number' => '500000211',
                'nama' => 'Ryan Dzul Fatah',
                'office' => 'Kantor Pusat|IT Development & Operation Team',
                'jabatan' => 'Junior Officer',
                'no_sk' => 'test',
                'tmt_keluar' => '2025-09-22',
                'status' => 'pending'
            ],
            [
                'personal_number' => '500000260',
                'nama' => 'Maria Astuti Dwi Putri T',
                'office' => 'Corporate University|Learning Force Team (LFT)',
                'jabatan' => 'Officer LFT',
                'no_sk' => null,
                'tmt_keluar' => '2025-10-14',
                'status' => null
            ],
            [
                'personal_number' => '500000205',
                'nama' => 'AGUS SALIM S',
                'office' => 'Regional Office Makassar|Regional Service Officer (RSO)',
                'jabatan' => 'Junior Officer',
                'no_sk' => null,
                'tmt_keluar' => '2025-11-01',
                'status' => null
            ],
            [
                'personal_number' => '500000295',
                'nama' => 'Muhammad Qushai',
                'office' => 'Kantor Pusat|PKSS',
                'jabatan' => 'Junior Officer (OS IT)',
                'no_sk' => null,
                'tmt_keluar' => '2025-09-30',
                'status' => null
            ],
            [
                'personal_number' => '500000233',
                'nama' => 'Aditya Purnama',
                'office' => 'Kantor Pusat|BRI Danareksa',
                'jabatan' => 'Junior Officer (OS IT)',
                'no_sk' => null,
                'tmt_keluar' => '2025-10-27',
                'status' => null
            ],
        ];

        $data = [
            'page_title' => 'Penghentian Pekerja',
            'terminations' => $dummy_terminations
        ];

        return view('pages/penghentian_pekerja_list', $data);
    }

    /**
     * Halaman 2: Menampilkan FORM Tambah Penghentian
     */
    public function tambah()
    {
        // Data dummy untuk dropdown "Nama Pekerja"
        $dummy_workers_list = [
            ['id' => '00019813', 'nama' => '00019813 - Evita Meiliani'],
            ['id' => '00019814', 'nama' => '00019814 - Budi Santoso'],
            ['id' => '00019815', 'nama' => '00019815 - Citra Lestari'],
        ];

        // Data dummy untuk detail pekerja (JSON untuk JS)
        $dummy_workers_details = [
            '00019813' => [
                'personal_number' => '00019813',
                'nama' => 'Evita Meiliani',
                'no_ktp' => '3175026505710009',
                'ttl' => 'Jakarta, 25 Mei 1971',
                'tmt_masuk' => '2022-08-01',
                'unit_kerja' => 'Kantor Pusat|Direktur',
                'jabatan' => 'Direktur'
            ],
            '00019814' => [
                'personal_number' => '00019814',
                'nama' => 'Budi Santoso',
                'no_ktp' => '3201080101800001',
                'ttl' => 'Bandung, 01 Jan 1980',
                'tmt_masuk' => '2020-01-10',
                'unit_kerja' => 'Kantor Pusat|IT Development',
                'jabatan' => 'Manager IT'
            ],
            '00019815' => [
                'personal_number' => '00019815',
                'nama' => 'Citra Lestari',
                'no_ktp' => '3404021005900002',
                'ttl' => 'Yogyakarta, 10 Mei 1990',
                'tmt_masuk' => '2021-03-15',
                'unit_kerja' => 'Kantor Pusat|Human Capital',
                'jabatan' => 'HR Officer'
            ],
        ];

        $data = [
            'page_title' => 'Tambah Penghentian Pekerja',
            'workers_list' => $dummy_workers_list,
            'workers_details_json' => json_encode($dummy_workers_details) // Kirim sbg JSON
        ];

        return view('pages/penghentian_pekerja_form', $data);
    }
}