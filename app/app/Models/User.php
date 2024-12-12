<?php
 

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * Atributi koji se mogu masovno dodeljivati.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * Atributi koji treba da budu sakriveni pri serijalizaciji.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Atributi koji se automatski kastuju na određeni tip.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Relacija: User (admin) ima mnogo lekcija.
     */
    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    /**
     * Relacija: User (student) ima mnogo izazova kroz pivot tabelu.
     */
    public function challenges()
    {
        return $this->belongsToMany(Challenge::class)->withPivot('status')->withTimestamps();
    }

    /**
     * Provera da li korisnik ima ulogu admina.
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }
}
