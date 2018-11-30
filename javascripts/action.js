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
        console.log($('#rec-form').serialize());
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var regno = $("#regno").val();
        var captchaValue = $("#captchaVal").val();
        var Tech = false;
        var Management = false;
        var Design = false;

        if($("#Tech"). prop("checked") === true){
            Tech = true;
        }

        if($("#Management"). prop("checked") === true){
            Management = true;
        }

        if($("#Design"). prop("checked") === true){
            Design = true;
        }
        // var Tech = $("#Tech").val();
        // var Management = $("#Management").val();
        // var Design = $("#Design").val();
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
            xhrFields: {
                withCredentials: true
            },
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
                $('#nameErr').hide();
                $('#regnoErr').hide();
                $('#emailErr').hide();
                $('#phoneErr').hide();
                $('#domainErr').hide();
                $('#captchaErr').hide();

                if(data.Status){
                    if(data.Status === "Failed"){

                        var errArr = data.Message;
                        var errMsgs = ["Invalid Name","Invalid Registration Number","Invalid EMail ID","Invalid Phone Number","Please Select a Field","Invalid Captcha Value"];
                        if(typeof errArr === "object") {
                            for (var i = 0; i < 5; i++) {
                                if(errArr[i].toString() === "0"){
                                    $(".errMsg:eq(" + i.toString() + ")").show();
                                    $(".errMsg:eq(" + i.toString() + ")").text(errMsgs[i]);
                                }
                            }
                        }
                        else{
                            $(".errMsg:eq(" + "5" + ")").show();
                            $(".errMsg:eq(" + "5" + ")").text(errArr);
                            $('#modal-alert').text(errArr);
                        }
                        $('#myModal').modal('show');
                        captchaGen();
                    }
                    else if(data.Status === "Success"){
                        $('#nameErr').hide();
                        $('#regnoErr').hide();
                        $('#emailErr').hide();
                        $('#phoneErr').hide();
                        $('#domainErr').hide();
                        $('#captchaErr').hide();


                        $('#myModal').modal('show');
                        $('#modal-alert').text("You have Successfully Registered! Stay tuned to our Social Media for more updates");
                        document.getElementById("rec-form").reset();
                        captchaGen();
                        console.log("Success");
                    }
                }
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
    $('#domainErr').hide();
    $('#captchaErr').hide();


    var typingTimer;                //timer identifier
    var doneTypingInterval = 500;  //time in ms (5 seconds)

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
            $('#nameErr').text("Name should not exceed 100 Characters");
            $('#nameErr').show();
        }
        else if((!nameRegex.test(enteredValue))){
            $('#name').css('border', '1px solid red');
            $('#nameErr').text("Only alphabets allowed in name");
            $('#nameErr').show();
        }

    }

    $('#email').keyup(function(){
        $('#emailErr').hide();
        $('#email').css('border', 'none');
        clearTimeout(typingTimer);
        console.log("HERE");
        if ($('#email').val()) {
            typingTimer = setTimeout(emailCheck, doneTypingInterval);
        }
        else{
            $('#email').css('border', '1px solid red');
            $('#emailErr').text("This field is Mandatory");
            $('#emailErr').show();
        }
    });

    function emailCheck(){
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var enteredValue = $('#email').val();
        if(enteredValue.length>100){
            $('#email').css('border', '1px solid red');
            $('#emailErr').text("EMail should not exceed 100 Characters");
            $('#emailErr').show();
        }
        else if((!emailRegex.test(enteredValue))){
            $('#email').css('border', '1px solid red');
            $('#emailErr').text("Invalid EMail Entered");
            $('#emailErr').show();
        }

    }

    $('#regno').keyup(function(){
        $('#regnoErr').hide();
        $('#regno').css('border', 'none');
        clearTimeout(typingTimer);
        console.log("HERE");
        if ($('#regno').val()) {
            typingTimer = setTimeout(regnoCheck, doneTypingInterval);
        }
        else{
            $('#regno').css('border', '1px solid red');
            $('#regnoErr').text("This field is Mandatory");
            $('#regnoErr').show();
        }
    });

    function regnoCheck(){
        var regnoRegex = /18[A-Za-z]{3}\d\d\d\d$/;
        var enteredValue = $('#regno').val();
        if(enteredValue.length>9){
            $('#regno').css('border', '1px solid red');
            $('#regnoErr').text("Registration Number should be of type 18XXYYYY");
            $('#regnoErr').show();
        }
        else if((!regnoRegex.test(enteredValue))){
            $('#regno').css('border', '1px solid red');
            $('#regnoErr').text("Invalid Registration Number Entered");
            $('#regnoErr').show();
        }

    }

    $('#phone').keyup(function(){
        $('#phoneErr').hide();
        $('#phone').css('border', 'none');
        clearTimeout(typingTimer);
        console.log("HERE");
        if ($('#phone').val()) {
            typingTimer = setTimeout(phoneCheck, doneTypingInterval);
        }
        else{
            $('#phone').css('border', '1px solid red');
            $('#phoneErr').text("This field is Mandatory");
            $('#phoneErr').show();
        }
    });

    function phoneCheck(){
        var phoneRegex = /^[0-9]{10}$/;
        var enteredValue = $('#phone').val();
        if(enteredValue.length>10){
            $('#phone').css('border', '1px solid red');
            $('#phoneErr').text("Phone Number should not exceed 10 Characters");
            $('#phoneErr').show();
        }
        else if((!phoneRegex.test(enteredValue))){
            $('#phone').css('border', '1px solid red');
            $('#phoneErr').text("Invalid Phone Number Entered");
            $('#phoneErr').show();
        }

    }

    $('#captchaVal').keyup(function(){
        $('#captchaErr').hide();
        $('#captchaVal').css('border', 'none');
        clearTimeout(typingTimer);
        console.log("HERE");
        if (!$('#captchaVal').val()) {
            $('#captchaVal').css('border', '1px solid red');
            $('#captchaErr').text("This field is Mandatory");
            $('#captchaErr').show();
        }
    });


});