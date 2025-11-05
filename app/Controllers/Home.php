<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {
        $data = [
            'title' => 'Dashboard - My SAU',
            'user' => $this->getUserData(),
            'workers' => $this->getWorkersData(),
            'menus' => $this->getQuickAccessMenus(),
            'tasks' => [],
            'current_page' => 'home'
        ];

        return view('pages/dashboard', $data);
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

    private function getWorkersData()
    {
        return [
            ['id' => 1, 'name' => 'Karina', 'avatar_url' => 'https://i.pravatar.cc/40?img=1'],
            ['id' => 2, 'name' => 'Ahyeon', 'avatar_url' => 'https://i.pravatar.cc/40?img=2'],
            ['id' => 3, 'name' => 'Asa', 'avatar_url' => 'https://i.pravatar.cc/40?img=3'],
            ['id' => 4, 'name' => 'Giselle', 'avatar_url' => 'https://i.pravatar.cc/40?img=4'],
            ['id' => 5, 'name' => 'Ningning', 'avatar_url' => 'https://i.pravatar.cc/40?img=5'],
            ['id' => 6, 'name' => 'Winter', 'avatar_url' => 'https://i.pravatar.cc/40?img=6'],
        ];
    }

    private function getQuickAccessMenus()
    {
        // Only return menus for Quick Access Widget (6-8 menus)
        return [
           ['id' => 1, 'name' => 'Data Pribadi', 'icon_class' => 'bx bxs-user-detail', 'link_url' => 'profile', 'category' => 'Data Pekerja'],
            ['id' => 2, 'name' => 'Presensi Online', 'icon_class' => 'bx bxs-time', 'link_url' => 'presensi', 'category' => 'Data Pekerja'],
            ['id' => 6, 'name' => 'Data Presensi', 'icon_class' => 'bx bxs-calendar-check', 'link_url' => 'data-presensi', 'category' => 'Data Pekerja'],
            ['id' => 3, 'name' => 'InOffice', 'icon_class' => 'bx bxs-building-house', 'link_url' => 'inoffice', 'category' => 'Layanan SDM'],
            ['id' => 4, 'name' => 'Knowledge Hub', 'icon_class' => 'bx bxs-brain', 'link_url' => 'knowledge', 'category' => 'Layanan SDM'],
            ['id' => 5, 'name' => 'Lembur', 'icon_class' => 'bx bxs-car-crash', 'link_url' => 'lembur', 'category' => 'Layanan SDM'],
            ['id' => 7, 'name' => 'Cuti', 'icon_class' => 'bx bxs-calendar-x', 'link_url' => 'cuti', 'category' => 'Layanan SDM'],
            ['id' => 8, 'name' => 'Pendidikan & Pelatihan', 'icon_class' => 'bx bxs-graduation', 'link_url' => 'pelatihan', 'category' => 'Layanan SDM'],
            ['id' => 9, 'name' => 'SAU Drive', 'icon_class' => 'bx bxs-cloud-upload', 'link_url' => 'drive', 'category' => 'Maintain Data'],
            ['id' => 10, 'name' => 'Rekam Aktivitas', 'icon_class' => 'bx bxs-notepad', 'link_url' => 'aktivitas', 'category' => 'Monitoring'],
        ];
    }
}