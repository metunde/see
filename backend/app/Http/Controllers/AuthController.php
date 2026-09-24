<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  public function register(Request $request){
    $validated = $request->validate([
        'name' => 'required|max:255',
        'email' => 'required|max:255|unique:users',
        'password' => 'required|max:255|confirmed',
    ]);

    $user = User::create($validated);

    $token = $user->createToken($request->name);

    return [
        'user' => $user,
        'token' => $token->plainTextToken
    ];
  }

  public function login(Request $request){
    $request->validate([
        'email' => 'required|max:255|exists:users',
        'password' => 'required|max:255|',
    ]);

    $user = User::where('email', $request->email)->first();
    
    if(!$user || !Hash::check($request->password,$user->password)){
     return ["errors"=>[
      "email"=>[
        "The provided credentials are incorrect."
      ]
     ]];                                                           
    }

    $token = $user->createToken($user->name);

    return [
        'user' => $user,
        'token' => $token->plainTextToken
    ];

  }


  public function logout(Request $request){
   $request->user()->tokens()->delete();
  
   return ["message" => "you are logged out!!!"];

}
}
