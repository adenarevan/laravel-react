<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    public function index()
    {
        // Filter artikel berdasarkan user yang sedang login
        $articles = Article::where('user_id', Auth::id())->with('user')->get();

        return Inertia::render('Article', [
            'menus' => [
                ['name' => 'Home', 'route' => '/dashboard', 'icon' => 'FaHome'],
                ['name' => 'About Me', 'route' => '/about', 'icon' => 'FaUser'],
                ['name' => 'Contact', 'route' => '/contact', 'icon' => 'FaEnvelope'],
                ['name' => 'Article', 'route' => '/article', 'icon' => 'FaNewspaper'],
            ],
            'articles' => $articles,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('articles', 'public');
        }

        Article::create([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $path,
            'user_id' => auth()->id(),
            'published_at' => now(),
        ]);

        return redirect()->route('article.index')->with('success', 'Artikel berhasil ditambahkan.');
    }

    public function update(Request $request, Article $article)
    {
        if ($article->user_id !== Auth::id()) {
            abort(403, 'Anda tidak diizinkan mengedit artikel ini.');
        }
    
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);
    
        $path = $article->image;
    
        if ($request->hasFile('image')) {
            if ($path) {
                \Storage::delete('public/' . $path);
            }
            $path = $request->file('image')->store('articles', 'public');
        }
    
        $article->update([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $path,
        ]);
    
        return redirect()->route('article.index')->with('success', 'Artikel berhasil diperbarui.');
    }
    
    public function destroy(Article $article)
    {
        if ($article->user_id !== Auth::id()) {
            abort(403, 'Anda tidak diizinkan menghapus artikel ini.');
        }
    
        if ($article->image) {
            \Storage::delete('public/' . $article->image);
        }
    
        $article->delete();
    
        return redirect()->route('article.index')->with('success', 'Artikel berhasil dihapus.');
    }
    

    public function show(Article $article)
            {
                return Inertia::render('ArticlesCarousel', [
                    'article' => $article->load('user'), // Memuat data artikel beserta user yang menulisnya
                ]);
            }

}

