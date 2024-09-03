<?php

 

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
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
            'title' => $this->title,
            'content' => $this->content,
            'user_id' => $this->user_id,
            'difficulty' => $this->difficulty,
            'description' => $this->description,
            'video_url' => $this->video_url,
            'image_url' => $this->image_url,
            'estimated_time' => $this->estimated_time,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'challenges' => ChallengeResource::collection($this->whenLoaded('challenges')),
        ];
    }
}
