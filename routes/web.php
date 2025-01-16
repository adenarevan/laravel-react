<?php
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Models\Article;

use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'articles' => Article::with('user')->latest()->take(5)->get(), // Muat relasi user
    ]);
})->name('welcome');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/auth/google', function () {
    return Socialite::driver('google')->redirect();
});



Route::get('/auth/google/callback', function () {
    try {
        $googleUser = Socialite::driver('google')->user();

        // Cari user berdasarkan email
        $user = User::where('email', $googleUser->getEmail())->first();

        if ($user) {
            // Update data jika user sudah ada
            $user->update([
                'provider' => 'google',
                'provider_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
            ]);
        } else {
            // Buat user baru jika tidak ditemukan
            $user = User::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'provider' => 'google',
                'provider_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
                // Tambahkan password default jika diperlukan
                'password' => bcrypt(str()->random(16)),
            ]);
        }

        // Login user
        Auth::login($user);

        return redirect('/dashboard');
    } catch (\Exception $e) {
        return redirect('/login')->with('error', 'Gagal login dengan Google.');
    }
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'user' => Auth::user(),
        'menus' => [
            ['name' => 'Home', 'route' => '/dashboard', 'icon' => 'FaHome'], // Halaman utama
            ['name' => 'About Me', 'route' => '/about', 'icon' => 'FaUser'], // Tentang pengguna
            ['name' => 'Contact', 'route' => '/contact', 'icon' => 'FaEnvelope'], // Halaman kontak
            ['name' => 'Articel', 'route' => '/article', 'icon' => 'FaNewspaper'], // Halaman article
        ],
    ]);
})->middleware(['auth'])->name('dashboard');


Route::post('/logout', function () {
    Auth::logout();
    return redirect('/login');
})->name('logout');


Route::post('/login', [AuthController::class, 'login'])->name('login');


Route::post('/register', [AuthController::class, 'register'])->name('register');




Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink'])->name('password.email');


Route::middleware('auth')->get('/api/user', function () {
    return response()->json(Auth::user());
})->name('api.user');


Route::get('/about', function () {
    return Inertia::render('About', [
        'user' => Auth::user(),
        'menus' => [
            ['name' => 'Home', 'route' => '/dashboard', 'icon' => 'FaHome'],
            ['name' => 'About Me', 'route' => '/about', 'icon' => 'FaUser'],
            ['name' => 'Contact', 'route' => '/contact', 'icon' => 'FaEnvelope'], 
            ['name' => 'Articel', 'route' => '/article', 'icon' => 'FaNewspaper'], // Halaman article
        ],
    ]);
})->middleware(['auth'])->name('about');


// Route Artikel Detail
Route::get('/article/{id}', function ($id) {
    return Inertia::render('ArticleDetail', [
        'article' => Article::with('user')->findOrFail($id),
    ]);
})->name('article.detail');

Route::middleware(['auth'])->group(function () {
    Route::get('/article', [ArticleController::class, 'index'])->name('article.index');
    Route::post('/article', [ArticleController::class, 'store'])->name('article.store');
    Route::put('/article/{article}', [ArticleController::class, 'update'])->name('article.update');
    Route::delete('/article/{article}', [ArticleController::class, 'destroy'])->name('article.destroy');
    
    Route::get('/article/{article}', [ArticleController::class, 'show'])->name('article.show');

});





require __DIR__.'/auth.php';