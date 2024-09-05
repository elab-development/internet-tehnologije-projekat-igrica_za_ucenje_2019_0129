<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\LessonResource;
use Illuminate\Support\Facades\Auth;

class LessonController extends Controller
{
    // Prikaz svih lekcija
    public function index()
    {
        $lessons = Lesson::all();
        return LessonResource::collection($lessons);
    }

    // Prikaz jedne lekcije
    public function show($id)
    {
        $lesson = Lesson::findOrFail($id);
        return new LessonResource($lesson);
    }

    // Kreiranje nove lekcije
    public function store(Request $request)
    {
        // Validacija podataka
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'difficulty' => 'required|string|max:255',
            'description' => 'required|string',
            'video_url' => 'nullable|url',
            'image_url' => 'nullable|url',
            'estimated_time' => 'nullable|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Kreiranje lekcije sa podacima
        $lesson = Lesson::create([
            'title' => $request->title,
            'content' => $request->content,
            'difficulty' => $request->difficulty,
            'description' => $request->description,
            'video_url' => $request->video_url,
            'image_url' => $request->image_url,
            'estimated_time' => $request->estimated_time,
            'user_id' => Auth::id(), // ID ulogovanog korisnika (admina)
        ]);

        return new LessonResource($lesson);
    }

    // Ažuriranje postojeće lekcije
    public function update(Request $request, $id)
    {
        // Pronalaženje lekcije
        $lesson = Lesson::findOrFail($id);

        // Validacija podataka
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'difficulty' => 'required|string|max:255',
            'description' => 'required|string',
            'video_url' => 'nullable|url',
            'image_url' => 'nullable|url',
            'estimated_time' => 'nullable|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Ažuriranje lekcije sa novim podacima
        $lesson->update($request->all());

        return new LessonResource($lesson);
    }

    // Brisanje lekcije
    public function destroy($id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();

        return response()->json(['message' => 'Lesson deleted successfully'], 200);
    }

    // Pretraga lekcija po naslovu, težini, ili opisu
    public function search(Request $request)
    {
        $query = Lesson::query();

        if ($request->has('title')) {
            $query->where('title', 'like', '%' . $request->input('title') . '%');
        }

        if ($request->has('difficulty')) {
            $query->where('difficulty', $request->input('difficulty'));
        }

        if ($request->has('description')) {
            $query->where('description', 'like', '%' . $request->input('description') . '%');
        }

        $lessons = $query->get();

        return LessonResource::collection($lessons);
    }
}
