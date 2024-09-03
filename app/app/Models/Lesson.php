<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    /**
     * Atributi koji se mogu masovno dodeljivati.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'content',
        'user_id',
    ];

    /**
     * Relacija: Lekcija ima mnogo izazova.
     */
    public function challenges()
    {
        return $this->hasMany(Challenge::class);
    }

    /**
     * Relacija: Lekcija pripada korisniku (adminu) koji je kreirao lekciju.
     */
    public function admin()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
