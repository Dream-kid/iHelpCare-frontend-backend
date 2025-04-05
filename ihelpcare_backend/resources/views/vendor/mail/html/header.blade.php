<tr>
    <td class="header-body" width="100%" cellpadding="0" cellspacing="0">
        <table class="header-inner-body" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
            <!-- Body content -->
            <tr>
                <td class="header-content-cell">
                    <a href="{{ $url }}" style="display: inline-block;">
                        @if (trim($slot) === 'Laravel')
                            <img src="https://laravel.com/img/notification-logo.png" class="logo" alt="Laravel Logo">
                        @else
                            {{ $slot }}
                        @endif
                    </a>
                </td>
            </tr>
        </table>
    </td>
</tr>
