$('.data-group-title form').submit(checkKey);
$('.data-group-title form input[type=password]').on('input', checkKey);

var click = (('ontouchend' in window)) ? 'touchend' : 'click';
var keypad = '';

notIncognito(function() {
    //alert('For safety reasons, please use Chrome incognito mode instead.');
});

$('#login-form form').submit(function(e) {
    e.preventDefault();
    e.stopPropagation();

    var email = $('input[type=email]', this).val();
    var pass = $('input[type=password]', this).val();

    if (valEmail(email) && pass.length > 0) {
        $.post('/', {
            user: email,
            pass: pass
        }, function(resp) {
            if (resp == 'success') {
                location.reload();
            }
        })
    }

    return false;
})




$(document).ready(function() {
    $(window).load(function() {
        triggerMod();
    });
    
    $('.modal-close').on(click, function() {
        hideModal($(this).parent().parent().parent());
    });

    $('#notify-trigger').on(click, triggerMod);


    $('#create-trigger').on(click, function() {
        showModal($('#create-modal'));

        $('#create-modal .modal-content').outerClick(function() {
            hideModal($('#create-modal'));
        });
    });
});

$('#numpad-modal .inner-modal button.key').on(click, function() {
    $('#numpad-modal .modal-title span').append('*');
    keypad += $(this).html();
})
$('#numpad-modal .inner-modal button.back').on(click, function() {
    var el = $('#numpad-modal .modal-title span');

    var html = el.html();

    html = html.slice(0, html.length - 1);
    el.html(html);
    keypad = keypad.slice(0, keypad.length - 1);
})


$('#numpad-modal .inner-modal .go').on(click, function() {
    hideModal($('#numpad-modal'));
})
$('.nosubmit').submit(function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
})

function encryptText(text, pass, master_key, entropy) {
    var key = CryptoJS.PBKDF2(pass, master_key + entropy, {
        keySize: 256 / 32
    }).toString();
    
    key = CryptoJS.AES.encrypt(text, key).toString();

    return key;
}



function checkKey() {
    var this_input = $(this);
    var pass = $(this).val();

    var key = CryptoJS.PBKDF2(pass, keypad + salt, {
        keySize: 256 / 32
    }).toString();

    $(this).parent().parent().parent().find('.data-box p').each(function() {
        try {
            var decrypted = CryptoJS.AES.decrypt($(this).html(), key).toString(CryptoJS.enc.Utf8);
        }
        catch (e) {}
        
        if (typeof decrypted !== 'undefined' && decrypted.length > 3) {
            $(this).html(decrypted);
            this_input.remove();
        }
        else {
            return false;
        }
    });
}

$(document).ready(function() {
    $('#add-modal form').submit(function() {
        var pass        = $('input[type=password]', this).val();
        var text        = $('textarea', this).html();
        var encrypted   = encryptText(text, pass, keypad, salt);
        console.log(encrypted);
        $('textarea', this).val(encrypted);
        
        $.post('/api/add', {
            data: encrypted
        }, function(resp) {
            
        })
    });
});