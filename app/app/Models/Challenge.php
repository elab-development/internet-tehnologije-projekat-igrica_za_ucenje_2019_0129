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
