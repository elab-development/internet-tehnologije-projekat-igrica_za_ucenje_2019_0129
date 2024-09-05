<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChallengeResource extends JsonResource
{
    /**
     * Transformiše resurs u JSON format.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'question' => $this->question,
            'answer' => $this->answer,
            'lesson_id' => $this->lesson_id,
            'difficulty' => $this->difficulty,
            'hint' => $this->hint,
            'max_attempts' => $this->max_attempts,
            'time_limit' => $this->time_limit,
            'type' => $this->type,
            'points' => $this->points,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
