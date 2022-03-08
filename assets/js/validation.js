
const scriptURL = 'https://script.google.com/macros/s/AKfycbxx8mdjVULzQ4Ke_X_OE1QI2rW_TswVjPcjfMYPPqUai6ifjQO6Q9xf6fyV5qe8Yn3i/exec'
const form = document.forms['contactform']

form.addEventListener('submit', e => {
        let nameFound = nameCheck();
    let numberFound = numberCheck();
    let emailFound = emailCheck();
    let messageFound = messageCheck();
    if (nameFound && numberFound && emailFound && messageFound) {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        $("#contactform")[0].reset();
         swal("You will be contacted soon!", "Form Submitted!", "success");


    }
    else{
        e.preventDefault()
        $("#contactform")[0].reset();
        // $("#form-submit-response").removeClass();
        //  $("#form-submit-response").addClass('text-danger');
        //  $("#form-submit-response").text('Form Not Submitted');





    }
});
const messageCheck = (() => {
    let message = $("#message").val();
    message = message.replace(/  +/g, ' ');
    $("#message").val(message);
    var count = message.replace(/\s+/g, '').length;
    if (message.length == 0) {
        $('#messageErr').show();
        $("#messageErr").text("Please Enter the Message");
        return false;
    }
    else if (message.charCodeAt(0) == 32) {
        $('#messageErr').show();
        $("#messageErr").text("First letter not be a space");
        return false;
    }
    if (count > 10 && count < 250) {
        $('#messageErr').hide();
        return true;
    }
    else if (count < 10) {
        $('#messageErr').show();
        $("#messageErr").text("Minimum 10 characters needed");
        return false;
    }
    else if (count > 250) {
        $('#messageErr').show();
        $("#messageErr").text("Maximum 250 character allowed");
        return false;
    }
})

const emailCheck = (() => {
    let email = $('#email').val();
    filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email.length == 0) {
        $("#emailErr").show();
        $("#emailErr").text("Please enter the Email");
        return false;
    }
    else if (email.endsWith(" ")) {
        $("#emailErr").show();
        $("#emailErr").text("Last letter not be a space");
        return false;
    }
    else if (filter.test(email)) {
        $("#emailErr").hide();
        return true;
    }
    else {
        $("#emailErr").show();
        $("#emailErr").text("Enter the valid email address");
        return false;
    }
})
const numberCheck = (() => {
    let number = $("#number").val();
    var isNum = /^[0-9]+$/;
    if (number.length == 0) {
        $("#numberErr").show();
        $("#numberErr").text("Please enter the number");
        return false;
    }
    if (number.match(isNum)) {
        if (number.length < 10) {
            $("#numberErr").show();
            $("#numberErr").text("Minimum 10 numbers needed");
            return false;
        }
        else if (number.length > 10) {
            $("#numberErr").show();
            $("#numberErr").text("Only 10 numbers allowed");
            return false;
        }
        else if (number.length == 10) {
            $("#numberErr").hide();
            return true;
        }
    }
    else {
        $("#numberErr").show();
        $("#numberErr").text("Please enter the number");
        return false;
    }
})
const nameCheck = (() => {
   $('#name').val($('#name').val().replace(/[^a-zA-Z\s]/gi, ''));
    let name = $("#name").val();
    name = name.replace(/  +/g, ' ');
    var reg_exp = /^[A-Za-z0-9 ]+$/;
    var is_valid = reg_exp.test(name);
    $("#name").val(name);
    if (name.length == 0) {
        $("#nameErr").show();
        $("#nameErr").text("Please enter the name");
        return false;
    }
    else if (name.charCodeAt(0) == 32) {
        $("#nameErr").show();
        $("#nameErr").text("First letter not be a space");
        return false;
    }
    else if (/\s$/.test(name)) {
        $("#nameErr").show();
        $("#nameErr").text("Last letter not be a space");
        return false;
    }
    else if (!is_valid) {
        $("#nameErr").show();
        $("#nameErr").text("Only characters allowed");
        return false;
    }
    else if (name.length >= 3 && name.length <= 20) {
        var hasNumber = /\d/;
        if (hasNumber.test(name)) {
            $("#nameErr").show();
            $("#nameErr").text("Only characters allowed");
            return false;
        }
        else {
            $("#nameErr").hide();
            return true;
        }
    }
    else if (name.length > 20) {
        $("#nameErr").show();
        $("#nameErr").text("Maximum 20 character allowed");
        return false;
    }
    else {
        $("#nameErr").show();
        $("#nameErr").text("Minimum 3 characters needed");
        return false;
    }
})