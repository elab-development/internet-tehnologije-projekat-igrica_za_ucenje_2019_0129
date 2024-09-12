<?php

use App\Models\Challenge;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Pokreće seedovanje baze podataka.
     *
     * @return void
     */
    public function run()
    {
        // Kreiranje admin korisnika
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        // Kreiranje učenika
        $student = User::factory()->create([
            'name' => 'Student User',
            'email' => 'student@example.com',
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);

        // Kreiranje lekcija vezanih za admina
        $lessons = Lesson::factory()->count(5)->create([
            'user_id' => $admin->id,
        ]);

        // Kreiranje izazova za svaku lekciju
        $lessons->each(function ($lesson) {
            Challenge::factory()->count(3)->create([
                'lesson_id' => $lesson->id,
            ]);
        });

        // Povezivanje učenika sa izazovima putem pivot tabele
        $challenges = Challenge::all();
        $challenges->each(function ($challenge) use ($student) {
            $statusOptions = ['failed', 'success'];
            $status = $statusOptions[array_rand($statusOptions)];  // za status bira random element
            
            DB::table('challenge_user_pivot')->insert([
                'user_id' => $student->id,
                'challenge_id' => $challenge->id,
                'attempted_at' => now(),
                'status' => $status,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
        });
    }
}

