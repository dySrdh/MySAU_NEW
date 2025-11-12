<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class StrukturOrganisasiController extends BaseController
{
    public function index()
    {
        $data = [
            'page_title' => 'Struktur Organisasi',
            // Nanti kamu bisa kirim data karyawan ke sini
            // 'all_employees_json' => json_encode($this->model->findAll())
        ];

        return view('pages/struktur_organisasi', $data);
    }
}