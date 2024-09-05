<?php

namespace App\Http\Controllers;

use App\Models\ChallengeUserPivot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ChallengeUserPivotResource;

class ChallengeUserPivotController extends Controller
{
    // Prikaz svih podataka
    public function index()
    {
        $pivots = ChallengeUserPivot::all();
        return $pivots;
    }

    // Prikaz jednog zapisa
    public function show($id)
    {
        $pivot = ChallengeUserPivot::findOrFail($id);
        return $pivot;
    }

    // Kreiranje novog zapisa
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'challenge_id' => 'required|exists:challenges,id',
            'attempted_at' => 'nullable|date',
            'status' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $pivot = ChallengeUserPivot::create($request->all());
        return $pivot;
    }

    // Ažuriranje zapisa
    public function update(Request $request, $id)
    {
        $pivot = ChallengeUserPivot::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'challenge_id' => 'required|exists:challenges,id',
            'attempted_at' => 'nullable|date',
            'status' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $pivot->update($request->all());
        return $pivot;
    }

    // Brisanje zapisa
    public function destroy($id)
    {
        $pivot = ChallengeUserPivot::findOrFail($id);
        $pivot->delete();

        return response()->json(['message' => 'Record deleted successfully'], 200);
    }
}
