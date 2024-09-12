<?php

namespace App\Http\Controllers;

use App\Models\ChallengeUserPivot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ChallengeUserPivotResource;
use App\Models\Challenge;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Support\Facades\DB;
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


    public function statistics()
    {
        // Broj lekcija
        $lessonCount = Lesson::count();
    
        // Broj učenika (korisnika sa rolom 'student')
        $studentCount = User::where('role', 'student')->count();
    
        // Broj izazova
        $challengeCount = Challenge::count();
    
        // Statistika uspešnih i neuspešnih pokušaja po izazovu
        $challenges = DB::table('challenge_user_pivot')
            ->select('challenge_id')
            ->selectRaw("SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as success_count")
            ->selectRaw("SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as fail_count")
            ->groupBy('challenge_id')
            ->get();
    
        // Vraćamo statistike kao JSON
        return response()->json([
            'lesson_count' => $lessonCount,
            'student_count' => $studentCount,
            'challenge_count' => $challengeCount,
            'challenges' => $challenges,
        ]);
    }
    
    
    
}
