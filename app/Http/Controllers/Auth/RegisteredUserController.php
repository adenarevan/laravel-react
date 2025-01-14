<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */

     public function register(Request $request)
     {
         $request->validate([
             'name' => 'required|string|max:255',
             'email' => 'required|email|max:255',
             'password' => 'required|string|confirmed|min:8',
         ]);
     
         // Check if email already exists
         if (User::where('email', $request->email)->exists()) {
             return response()->json([
                 'message' => 'User already registered',
             ], 409);
         }
     
         $user = User::create([
             'name' => $request->name,
             'email' => $request->email,
             'password' => Hash::make($request->password),
         ]);
     
         Auth::login($user);
     
         return response()->json([
             'message' => 'Registration successful',
             'redirect' => '/dashboard',
         ]);
     }

     public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'password' => 'required|string|confirmed|min:8',
    ]);

    // Check if email already exists
    if (User::where('email', $request->email)->exists()) {
        return response()->json([
            'message' => 'User already registered',
        ], 409);
    }

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    Auth::login($user);

    return response()->json([
        'message' => 'Registration successful',
        'redirect' => '/dashboard',
    ]);
}

     
}
