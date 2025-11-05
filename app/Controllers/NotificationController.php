<?php

namespace App\Controllers;

class NotificationController extends BaseController
{
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

    public function markAsRead($id)
    {
        // TODO: Update notification status in database
        return $this->response->setJSON([
            'success' => true,
            'message' => 'Notification marked as read',
            'id' => $id
        ]);
    }
}