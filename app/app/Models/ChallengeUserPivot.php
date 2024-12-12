<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ChallengeUserPivot extends Pivot
{
    /**
     * Atributi koji se mogu masovno dodeljivati.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'challenge_id',
        'attempted_at',
        'status',
    ];

    /**
     * Atributi koji treba da budu kastovani u druge tipove.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'attempted_at' => 'datetime',
    ];
}
