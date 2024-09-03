<?php

namespace Database\Factories;

use App\Models\Challenge;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChallengeFactory extends Factory
{
    /**
     * Naziv odgovarajućeg modela.
     *
     * @var string
     */
    protected $model = Challenge::class;

    /**
     * Definicija modela.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'question' => $this->faker->sentence, // Nasumično generisano pitanje
            'answer' => $this->faker->word, // Nasumično generisan odgovor
            'lesson_id' => Lesson::inRandomOrder()->first()->id, // Nasumično odabran ID postojeće lekcije
            'difficulty' => $this->faker->randomElement(['easy', 'medium', 'hard']), // Nasumičan nivo težine
            'hint' => $this->faker->sentence, // Nasumičan savet za rešenje
            'max_attempts' => $this->faker->numberBetween(1, 5), // Nasumičan broj maksimalnih pokušaja
            'time_limit' => $this->faker->numberBetween(10, 60), // Nasumično vreme ograničenja u minutama
            'type' => $this->faker->randomElement(['multiple_choice', 'true_false', 'short_answer']), // Nasumičan tip izazova
            'points' => $this->faker->numberBetween(10, 100), // Nasumičan broj poena za rešavanje izazova
        ];
    }
}
