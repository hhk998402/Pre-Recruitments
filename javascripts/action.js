$(document).ready(function() {
    function captchaGen(){
        var d = new Date();
        var n = d.getMilliseconds();
        console.log("HERE");
        var link = "https://prerecruitments-backend.herokuapp.com/captcha/captchagen" + "?param1=" + n.toString();
        document.getElementById("captchaImg").src=link;
    }

    $("#regBtn").click(function(e) {
        e.preventDefault();
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var regno = $("#regno").val();
        var captchaValue = $("#captchaVal").val();
        var Tech = $("#Tech").val();
        var Management = $("#Management").val();
        var Design = $("#Design").val();
        var data = JSON.stringify({
            name: name,
            email : email,
            phone : phone,
            regno : regno,
            captchaValue : captchaValue,
            Tech : Tech,
            Management : Management,
            Design : Design
        });
        $.ajax({
            url: 'https://prerecruitments-backend.herokuapp.com/user/create',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
            },
            data: data
        });



        // if(!name || name === ''){
        //     $('#name').css('border', '1px solid red');
        //     $('#nameErr').text("This field is Mandatory");
        //     $('#nameErr').show();
        // }
        // else if(){
        //
        // }
    });

    captchaGen();


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