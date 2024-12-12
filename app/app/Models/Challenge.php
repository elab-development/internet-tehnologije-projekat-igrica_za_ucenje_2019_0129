<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    use HasFactory;

    /**
     * Atributi koji se mogu masovno dodeljivati.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'question',
        'answer',
        'lesson_id',
        'difficulty',  // Dodato polje za težinu
        'hint',  // Dodato polje za pomoć
        'max_attempts',  // Dodato polje za maksimalan broj pokušaja
        'time_limit',  // Dodato polje za vremensko ograničenje
        'type',  // Dodato polje za tip izazova
        'points',  // Dodato polje za poene
    ];

    /**
     * Relacija: Izazov pripada lekciji.
     */
    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    /**
     * Relacija: Izazov ima mnogo učenika kroz pivot tabelu.
     */
    public function students()
    {
        return $this->belongsToMany(User::class)->withPivot('status')->withTimestamps();
    }
}
