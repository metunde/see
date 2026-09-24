<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PropertyController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $properties = $request->user()
        ->properties()
        ->latest()
        ->get();

    return response()->json([
        'data' => $properties,
    ]);    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'address' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:100'],
            'state' => ['nullable', 'string', 'max:100'],
            'country' => ['nullable', 'string', 'max:100'],
        ]);
    
        $baseSlug = Str::slug($validated['name']);
        $slug = $baseSlug;
        $count = 1;
    
        while (Property::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $count;
            $count++;
        }
    
        $validated['slug'] = $slug;
    
        $property = $request->user()
            ->properties()
            ->create($validated);
    
        return response()->json([
            'message' => 'Property created successfully',
            'data' => $property,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Property $property)
    {
        $this->authorize('view', $property);
    
        return response()->json([
            'data' => $property,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Property $property)
    {
        $this->authorize('update', $property);
    
        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'address' => ['sometimes', 'nullable', 'string', 'max:255'],
            'city' => ['sometimes', 'nullable', 'string', 'max:100'],
            'state' => ['sometimes', 'nullable', 'string', 'max:100'],
            'country' => ['sometimes', 'nullable', 'string', 'max:100'],
        ]);
    
        if (isset($validated['name'])) {
            $baseSlug = Str::slug($validated['name']);
            $slug = $baseSlug;
            $count = 1;
    
            while (
                Property::where('slug', $slug)
                    ->where('id', '!=', $property->id)
                    ->exists()
            ) {
                $slug = $baseSlug . '-' . $count;
                $count++;
            }
    
            $validated['slug'] = $slug;
        }
    
        $property->update($validated);
    
        return response()->json([
            'message' => 'Property updated successfully',
            'data' => $property->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        $this->authorize('delete', $property);
    
        $property->delete();
    
        return response()->json([
            'message' => 'Property deleted successfully',
        ]);
    }
}
