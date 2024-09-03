<?php

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Http\Resources\ChallengeResource;

class ChallengeController extends Controller
{
    public function index()
    {
        $challenges = Challenge::all();
        return ChallengeResource::collection($challenges);
    }

    public function show($id)
    {
        $challenge = Challenge::findOrFail($id);
        return new ChallengeResource($challenge);
    }
}
