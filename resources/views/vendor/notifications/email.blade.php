<x-mail::message>
{{-- Salam Pembuka --}}
@if (! empty($greeting))
# {{ $greeting }}
@else
@if ($level === 'error')
# @lang('Whoops!')
@else
# @lang('Halo!')
@endif
@endif

{{-- Baris Pembuka --}}
@foreach ($introLines as $line)
{{ $line }}

@endforeach

{{-- Tombol Aksi --}}
@isset($actionText)
<?php
    $color = match ($level) {
        'success', 'error' => $level,
        default => 'primary',
    };
?>
<x-mail::button :url="$actionUrl" :color="$color">
{{ $actionText }}
</x-mail::button>
@endisset

{{-- Baris Penutup --}}
@foreach ($outroLines as $line)
{{ $line }}

@endforeach

{{-- Salam Penutup --}}
@if (! empty($salutation))
{{ $salutation }}
@else
@lang('Salam Hangat'),<br>
Portofolio Adena
@endif

{{-- Subcopy --}}
@isset($actionText)
<x-slot:subcopy>
@lang(
    "Jika Anda mengalami kesulitan untuk mengklik tombol \":actionText\", salin dan tempel URL di bawah ini\n".
    'ke dalam browser web Anda:',
    [
        'actionText' => $actionText,
    ]
) <span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
</x-slot:subcopy>
@endisset
</x-mail::message>
