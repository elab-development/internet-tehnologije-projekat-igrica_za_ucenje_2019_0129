<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ChallengeResource;
use Illuminate\Support\Facades\Auth;

class ChallengeController extends Controller
{
    // Prikaz svih izazova
    public function index()
    {
        $challenges = Challenge::all();
        return ChallengeResource::collection($challenges);
    }

    // Prikaz jednog izazova
    public function show($id)
    {
        $challenge = Challenge::findOrFail($id);
        return new ChallengeResource($challenge);
    }

    // Kreiranje novog izazova
    public function store(Request $request)
    {
        // Validacija podataka
        $validator = Validator::make($request->all(), [
            'question' => 'required|string|max:255',
            'answer' => 'required|string|max:255',
            'lesson_id' => 'required|exists:lessons,id',
            'difficulty' => 'required|string|max:255',
            'hint' => 'nullable|string|max:255',
            'max_attempts' => 'nullable|integer|min:1',
            'time_limit' => 'nullable|integer|min:1',
            'type' => 'required|string|max:50',
            'points' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Kreiranje izazova
        $challenge = Challenge::create([
            'question' => $request->question,
            'answer' => $request->answer,
            'lesson_id' => $request->lesson_id,
            'difficulty' => $request->difficulty,
            'hint' => $request->hint,
            'max_attempts' => $request->max_attempts,
            'time_limit' => $request->time_limit,
            'type' => $request->type,
            'points' => $request->points,
        ]);

        return new ChallengeResource($challenge);
    }

    // Ažuriranje postojećeg izazova
    public function update(Request $request, $id)
    {
        // Pronalaženje izazova
        $challenge = Challenge::findOrFail($id);

        // Validacija podataka
        $validator = Validator::make($request->all(), [
            'question' => 'required|string|max:255',
            'answer' => 'required|string|max:255',
            'lesson_id' => 'required|exists:lessons,id',
            'difficulty' => 'required|string|max:255',
            'hint' => 'nullable|string|max:255',
            'max_attempts' => 'nullable|integer|min:1',
            'time_limit' => 'nullable|integer|min:1',
            'type' => 'required|string|max:50',
            'points' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Ažuriranje izazova
        $challenge->update($request->all());

        return new ChallengeResource($challenge);
    }

    // Brisanje izazova
    public function destroy($id)
    {
        $challenge = Challenge::findOrFail($id);
        $challenge->delete();

        return response()->json(['message' => 'Challenge deleted successfully'], 200);
    }
}
