<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
'property_id',
'name',
'description',
'panorama_path',
'thumbnail_path',
'sort_path',
'is_starting_room'

    ];

    protected $casts = [
        'is_starting_room' => 'boolean'
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    public function hotspots(): HasMany
    {
        return $this->hasMany(Hotspot::class);
    }

    public function incomingHotspots(): HasMany
    {
        return $this->HasMany(Hotspot::class, 'target_room_id');
    }

}
