<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hotspots', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();
            $table->foreignId('target_room_id')->nullable()->nullOnDelete();
            $table->string('type');
            $table->decimal('yaw', 8, 4);
            $table->decimal('pitch', 8, 4);
            $table->string('title')->nullable();
            $table->string('description');
            $table->string('icon')->nullable();
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotspots');
    }
};
