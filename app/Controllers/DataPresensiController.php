<?php

namespace App\Controllers;

class DataPresensiController extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'Data Presensi - My SAU',
            'user' => $this->getUserData(),
            'current_page' => 'data-presensi'
        ];
        
        return view('pages/data_presensi', $data);
    }
    
    private function getUserData()
    {
        return [
            'name'       => 'Lee Ji-eun',
            'id'         => '50000067',
            'role'       => 'Officer',
            'department' => 'Business & Development Department',
            'avatar_url' => 'images/avatar.jpg'
        ];
    }
}