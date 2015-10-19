function valEmail(email) {
    var pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/;

    if (email.match(pattern)) {
        return true;
    }
}

function notIncognito(callback) {
  var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
  if (!fs) {
    result.textContent = "check failed?";
    return;
  }
  fs(window.TEMPORARY, 100, function(fs) {
    callback();
  }, function(err) {
    console.log('Browser in incognito mode, continuing.')
  });
}

function triggerMod() {
    showModal($('.modal-container'));
}

function showModal(el) {
    el.fadeIn('fast');
    $('.modal-content', el).addClass('active');
}

function hideModal(el) {
    el.fadeOut('fast');
    $('.modal-content', el).removeClass('active');
}

$.fn.outerClick = function(callback) {
    var mouse_inside = false;
    
    $(this).hover(function() { 
        mouse_inside = true; 
    }, function() { 
        mouse_inside = false; 
    });
    
    $('body').mouseup(function(){ 
        if(!mouse_inside) callback();
    });
}
