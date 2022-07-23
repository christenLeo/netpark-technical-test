/*
    The goal here is crate a feature that makes a API call to Google reCAPTCHA API
    and return the info with the user response to the widget
*/
/*
    first I get from the html the elements that i will use: div > widget
    and the button to change it to disable until get the response;
    then the function using fetch to make the POST request to https://www.google.com/recaptcha/api/siteverify, the parameters are: 
    secret	Required. The shared key between your site and reCAPTCHA.
    response	Required. The user response token provided by the reCAPTCHA client-side integration on your site, that I get throug grecaptcha.getResponse(opt_widget_id);
*/
const grecaptcha = document.querySelector('#grecaptcha');
const grecaptchaError = document.querySelector('#grecaptchaError');
const submitButton = document.querySelector('#submitButton');

// function to verify if the user clicked on the reCAPTCHA
let userResponse = '';

const canSubmit = () => {
    if (!userResponse) {
        grecaptchaError.innerText = 'Esse campo precisa ser preenchido';
        return false;
    }
    return true;    
};

// now the function that verify if the token exists
function getUserToken (token) {
    userResponse = token;
    if (userResponse) {
        grecaptchaError.innerText = '';
        submitButton.removeAttribute('disabled');
    };    
    console.log(userResponse);
};

// Try out to use fetch method to get a full validation from the google recaptcha
// const myInit = {
//     method: 'POST',
//     body: {
//         secret: 'my-secret-key',
//         response: userResponse
//     },
//     mode: 'no-cors',
//     cache: 'default'
// };

// const apiRes = fetch('https://www.google.com/recaptcha/api/siteverify', myInit)
// .then(response => response.txt())
// .catch(error => console.log(error));

// console.log(apiRes);

/* 
    Here I will get the form elements using DOM then create the object to send to the API - also make the fake API function with the proper validations
*/
