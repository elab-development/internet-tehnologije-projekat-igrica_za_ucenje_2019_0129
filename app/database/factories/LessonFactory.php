<?php

namespace Database\Factories;

use App\Models\Lesson;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonFactory extends Factory
{
    /**
     * Naziv odgovarajućeg modela.
     *
     * @var string
     */
    protected $model = Lesson::class;

    /**
     * Definicija modela.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
            'user_id' => User::factory(), // Kreiranje korisnika i dodeljivanje ID-a
            'difficulty' => $this->faker->randomElement(['easy', 'medium', 'hard']),
            'description' => $this->faker->text(200),
            'video_url' => $this->faker->url,
            'image_url' => $this->faker->imageUrl,
            'estimated_time' => $this->faker->numberBetween(10, 60), // Procena vremena u minutima
        ];
    }
}
