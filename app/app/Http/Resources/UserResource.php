<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'lessons' => LessonResource::collection($this->whenLoaded('lessons')),
            'challenges' => ChallengeResource::collection($this->whenLoaded('challenges')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
