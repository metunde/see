<?php

namespace App\Http\Controllers;

use App\Models\Host;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;


class HostController extends Controller implements HasMiddleware
{

    public static function middleware(){

        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];}
 /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Host::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

       
         $field = $request->validate([
          
                'name' => 'required|max:255',
                'email' => 'required',
                'phone' => 'required',
                'department' => 'required',
                'position' => 'required'

        ]);

        $host = $request->user()->host()->create($field);
         return response()->json($host, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Host $host)
    {
        return $host;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Host $host)
    {

        $field = $request->validate([
          
            'name' => 'required|max:255',
            'email' => 'required',
            'phone' => 'required',
            'department' => 'required',
            'position' => 'required'

    ]);

    $host->update($field);
    return $host;
       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Host $host)
    {
        $host->delete();

        return ['message' => 'the staff record has been deleted'];
    }
}
