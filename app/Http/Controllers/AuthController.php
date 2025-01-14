<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validasi input
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Coba login
        if (Auth::attempt($credentials, $request->remember)) {
            $request->session()->regenerate(); // Regenerasi session untuk keamanan

            return response()->json([
                'message' => 'Login berhasil!',
                'redirect' => '/dashboard',
            ]);
        }

        // Jika gagal login
        throw ValidationException::withMessages([
            'email' => 'The provided credentials are incorrect.',
        ]);
    }


    public function register(Request $request)
    {
        // Validasi data input
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed', // Konfirmasi password
        ]);

        // Buat user baru
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        // Login user
        auth()->login($user);

        return response()->json([
            'message' => 'Registration successful',
            'redirect' => '/dashboard', // Redirect setelah register
        ]);
    }
}
