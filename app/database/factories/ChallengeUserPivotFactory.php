<?php

namespace Database\Factories;

use App\Models\ChallengeUserPivot;
use App\Models\User;
use App\Models\Challenge;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChallengeUserPivotFactory extends Factory
{
    /**
     * Naziv odgovarajućeg modela.
     *
     * @var string
     */
    protected $model = ChallengeUserPivot::class;

    /**
     * Definicija modela.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id, // Nasumično uzimanje korisnika iz postojeće tabele
            'challenge_id' => Challenge::inRandomOrder()->first()->id, // Nasumično uzimanje izazova iz postojeće tabele
            'attempted_at' => $this->faker->dateTimeBetween('-1 year', 'now'), // Nasumičan datum pokušaja u proteklih godinu dana
            'status' => $this->faker->randomElement(['completed', 'pending']), // Nasumičan status pokušaja
        ];
    }
}
