<?php

namespace App\Controllers;

class AllMenusController extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'All Menus - My SAU',
            'user' => $this->getUserData(),
            'menus' => $this->getMenusData(),
            'current_page' => 'all-menus'
        ];
        
        return view('pages/all_menus', $data);
    }
    
    private function getUserData()
    {
        return [
            'name'      => 'Lee Ji-eun',
            'id'        => '50000067',
            'role'      => 'Officer',
            'department' => 'Business & Development Department',
            'avatar_url' => 'images/avatar.jpg'
        ];
    }
    
    private function getMenusData()
    {
        // Group menus by category
        $allMenus = [
            ['id' => 1, 'name' => 'Data Pribadi', 'icon_class' => 'bx bxs-user-detail', 'link_url' => 'profile', 'category' => 'Data Pekerja'],
            ['id' => 2, 'name' => 'Presensi Online', 'icon_class' => 'bx bxs-time', 'link_url' => 'presensi', 'category' => 'Data Pekerja'],
            ['id' => 6, 'name' => 'Data Presensi', 'icon_class' => 'bx bxs-calendar-check', 'link_url' => 'data-presensi', 'category' => 'Data Pekerja'],
            ['id' => 3, 'name' => 'InOffice', 'icon_class' => 'bx bxs-building-house', 'link_url' => 'inoffice', 'category' => 'Layanan SDM'],
            ['id' => 4, 'name' => 'Knowledge Hub', 'icon_class' => 'bx bxs-brain', 'link_url' => 'knowledge', 'category' => 'Layanan SDM'],
            ['id' => 5, 'name' => 'Lembur', 'icon_class' => 'bx bxs-car-crash', 'link_url' => 'lembur', 'category' => 'Layanan SDM'],
            ['id' => 7, 'name' => 'Cuti', 'icon_class' => 'bx bxs-calendar-x', 'link_url' => 'cuti', 'category' => 'Layanan SDM'],
            ['id' => 8, 'name' => 'Pendidikan & Pelatihan', 'icon_class' => 'bx bxs-graduation', 'link_url' => 'pelatihan', 'category' => 'Layanan SDM'],
            ['id' => 9, 'name' => 'SAU Drive', 'icon_class' => 'bx bxs-cloud-upload', 'link_url' => 'drive', 'category' => 'Maintain Data'],
            
            ['id' => 11, 'name' => 'Maintain Data', 'icon_class' => 'bx bxs-data', 'link_url' => 'maintain-data', 'category' => 'Maintain Data'],
            
            ['id' => 10, 'name' => 'Rekam Aktivitas', 'icon_class' => 'bx bxs-notepad', 'link_url' => 'aktivitas', 'category' => 'Monitoring'],
        ];
        
        // Group by category
        $groupedMenus = [];
        foreach ($allMenus as $menu) {
            $category = $menu['category'];
            if (!isset($groupedMenus[$category])) {
                $groupedMenus[$category] = [];
            }
            $groupedMenus[$category][] = $menu;
        }
        
        return $groupedMenus;
    }
}