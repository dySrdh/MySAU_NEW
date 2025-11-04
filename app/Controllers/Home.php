<?php

namespace App\Controllers;

use App\Models\MenuModel;

class Home extends BaseController
{
    private function getDummyData()
    {
        return [
            'user' => [
                'name'       => 'Lee Ji-eun',
                'id'         => '50000067',
                'role'       => 'Officer',
                'department' => 'Business & Development Department',
                'avatar_url' => 'images/avatar.jpg'
            ],
            'workers' => [
                ['id' => 1, 'name' => 'Karina', 'avatar_url' => 'https://i.pravatar.cc/40?img=1'],
                ['id' => 2, 'name' => 'Ahyeon', 'avatar_url' => 'https://i.pravatar.cc/40?img=2'],
                ['id' => 3, 'name' => 'Asa', 'avatar_url' => 'https://i.pravatar.cc/40?img=3'],
                ['id' => 4, 'name' => 'Giselle', 'avatar_url' => 'https://i.pravatar.cc/40?img=4'],
                ['id' => 5, 'name' => 'Ningning', 'avatar_url' => 'https://i.pravatar.cc/40?img=5'],
                ['id' => 6, 'name' => 'Winter', 'avatar_url' => 'https://i.pravatar.cc/40?img=6'],
            ],
            'menus' => [
                ['id' => 1, 'name' => 'Data Pribadi', 'icon_class' => 'bx bxs-user-detail', 'link_url' => 'profile', 'category' => 'Data Pekerja'],
                ['id' => 2, 'name' => 'Presensi Online', 'icon_class' => 'bx bxs-time', 'link_url' => 'presensi', 'category' => 'Data Pekerja'],
                ['id' => 3, 'name' => 'InOffice', 'icon_class' => 'bx bxs-building-house', 'link_url' => 'inoffice', 'category' => 'Layanan SDM'],
                ['id' => 4, 'name' => 'Knowledge Hub', 'icon_class' => 'bx bxs-brain', 'link_url' => 'knowledge', 'category' => 'Layanan SDM'],
                ['id' => 5, 'name' => 'Lembur', 'icon_class' => 'bx bxs-car-crash', 'link_url' => 'lembur', 'category' => 'Layanan SDM'],
                ['id' => 6, 'name' => 'Data Presensi', 'icon_class' => 'bx bxs-calendar-check', 'link_url' => 'data-presensi', 'category' => 'Data Pekerja'],
                ['id' => 7, 'name' => 'Cuti', 'icon_class' => 'bx bxs-calendar-x', 'link_url' => 'cuti', 'category' => 'Layanan SDM'],
                ['id' => 8, 'name' => 'Pendidikan & Pelatihan', 'icon_class' => 'bx bxs-graduation', 'link_url' => 'pelatihan', 'category' => 'Layanan SDM'],
                ['id' => 9, 'name' => 'SAU Drive', 'icon_class' => 'bx bxs-cloud-upload', 'link_url' => 'drive', 'category' => 'Maintain Data'],
                ['id' => 10, 'name' => 'Rekam Aktivitas', 'icon_class' => 'bx bxs-notepad', 'link_url' => 'aktivitas', 'category' => 'Monitoring'],
            ]
        ];
    }

    public function index(): string
    {
        $data = $this->getDummyData();
        $data['tasks'] = [];
        $data['current_page'] = 'home';

        return view('v_home', $data);
    }

    public function allMenus(): string
    {
        $data = $this->getDummyData();
        $data['current_page'] = 'menus';
        
        return view('v_home', $data);
    }

    public function taskHistory(): string
    {
        $data = $this->getDummyData();
        $data['current_page'] = 'history';

        return view('v_home', $data);
    }

    public function profile(): string
    {
        $data = $this->getDummyData();
        $data['current_page'] = 'profile';

        return view('v_home', $data);
    }

    public function presensi(): string
    {
        $data = $this->getDummyData();
        $data['current_page'] = 'presensi';

        return view('v_home', $data);
    }

    public function dataPresensi(): string
    {
        $data = $this->getDummyData();
        $data['current_page'] = 'data-presensi';

        return view('v_home', $data);
    }

    public function getNotifications()
    {
        $notifications = [
            [
                'id' => 1,
                'type' => 'inbox',
                'sender_name' => 'Karina',
                'sender_avatar' => 'https://i.pravatar.cc/40?img=1',
                'message' => 'mengirimkan surat',
                'time' => '5 menit yang lalu',
                'is_read' => false
            ],
            [
                'id' => 2,
                'type' => 'inbox',
                'sender_name' => 'Ahyeon',
                'sender_avatar' => 'https://i.pravatar.cc/40?img=2',
                'message' => 'mengirimkan surat',
                'time' => '5 menit yang lalu',
                'is_read' => false
            ],
            [
                'id' => 3,
                'type' => 'task',
                'sender_name' => 'Lee Ji-eun',
                'sender_avatar' => 'images/avatar.jpg',
                'message' => 'telah mengundang Anda untuk bergabung dalam tugas',
                'task_name' => 'Redesain Halaman Beranda MySAU',
                'time' => '10 menit yang lalu',
                'is_read' => false,
                'task_id' => 123
            ],
            [
                'id' => 4,
                'type' => 'task',
                'sender_name' => 'Lee Ji-eun',
                'sender_avatar' => 'images/avatar.jpg',
                'message' => 'telah mengundang Anda untuk bergabung dalam tugas',
                'task_name' => 'Redesain Website SAU Work',
                'time' => '10 menit yang lalu',
                'is_read' => false,
                'task_id' => 124
            ],
        ];

        return $this->response->setJSON([
            'success' => true,
            'data' => $notifications
        ]);
    }

    public function markNotificationRead($id)
    {
        return $this->response->setJSON([
            'success' => true,
            'message' => 'Notification marked as read'
        ]);
    }
}