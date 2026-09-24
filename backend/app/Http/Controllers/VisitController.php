<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use App\Http\Requests\StoreVisitRequest;
use App\Http\Requests\UpdateVisitRequest;

class VisitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVisitRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Visit $visit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVisitRequest $request, Visit $visit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Visit $visit)
    {
        //
    }
}
