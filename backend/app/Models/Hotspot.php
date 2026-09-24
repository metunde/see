<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Hotspot extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',        
'target_room_id',
'type',
'yaw',
'pitch',
'title',
'description',
'icon'
    ];

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function targetRoom(): BelongsTo
    {
        return $this->belongsTo(Room::class, 'target_room_id');
    }
}
