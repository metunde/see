<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Property extends Model
{
    use HasFactory; 

    protected $fillable = [
        'user-id',
        'name',
        'slug',
        'description',
        'address',
        'city',
        'state',
        'country',
        'status',
        'published_at',
        'updated_at'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function rooms(): HasMany 
    {
        return $this->hasMany(Room::class);
    }
}
