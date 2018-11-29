$(document).ready(function() {
    $('#nameErr').hide();
    $('#regnoErr').hide();
    $('#emailErr').hide();
    $('#phoneErr').hide();

    var typingTimer;                //timer identifier
    var doneTypingInterval = 500;  //time in ms (5 seconds)

    var isMLChecked = $('#session-radio-3').prop('checked');

    $('#name').keyup(function(){
        $('#nameErr').hide();
        $('#name').css('border', 'none');
        clearTimeout(typingTimer);
        console.log("HERE");
        if ($('#name').val()) {
            typingTimer = setTimeout(nameCheck, doneTypingInterval);
        }
        else{
            $('#name').css('border', '1px solid red');
            $('#nameErr').text("This field is Mandatory");
            $('#nameErr').show();
        }
    });

    function nameCheck(){
        var nameRegex = /^[ A-Za-z0-9_@."'/#&,/-]*$/;
        var enteredValue = $('#name').val();
        if(enteredValue.length>100){
            $('#name').css('border', '1px solid red');
            $('#nameErr').show();
        }
        else if((!nameRegex.test(enteredValue))){
            $('#name').css('border', '1px solid red');
            $('#nameErr').show();
        }

    }
});