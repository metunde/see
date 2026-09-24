<?php

namespace App\Http\Controllers;

use App\Models\Visitor;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class VisitorController extends Controller implements HasMiddleware
{

    public static function middleware(){
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    } 
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $visitors = Visitor::all()->map(function ($visitor) {
            return [
                'id' => $visitor->id,
                'name' => $visitor['full-name'], // Map 'full-name' to 'name'
                'email' => $visitor->email,
                'phone' => $visitor->phone,
                'company' => $visitor->company,
            ];
        });
    
        return response()->json($visitors);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $field =  $request->validate([
            'name' => 'required|max:255',
            'email' => 'required',
            'phone' => 'required',
            'company' => 'required',
        ]);

        $field['full-name'] = $field['name'];
         unset($field['name']);

        $visitor = $request->user()->visitor()->create($field);
        return response()->json($visitor, 201);

       // return  $visitor;
    }

    /**
     * Display the specified resource.
     */
    public function show(Visitor $visitor)
    {

      
        return $visitor;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Visitor $visitor)
    {

    

        $field =  $request->validate([
            'name' => 'required|max:255',
            'email' => 'required',
            'phone' => 'required',
            'company' => 'required',
        ]);

        $field['full-name'] = $field['name'];
        unset($field['name']);

        $visitor->update($field);

        return  $visitor;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Visitor $visitor)
    {
        
        $visitor->delete();

        return ['message' => 'the visitor record has been deleted'];
    }
}
