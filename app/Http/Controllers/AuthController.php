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
}
