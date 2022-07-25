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
const form = document.querySelector('#form');

/* 
    Here I will get the form elements using DOM then create the object to send to the API - also make the fake API function with the proper validations
*/

// function to validate the object info simulating the API behavior
const validateObj = (obj) => {
    if (!obj || obj === {}) {
        console.log({internalCode: 450, message: 'erro no processamento'});
        alert('Ops, algo deu errado, verifique seu formulário e por gentileza tente outra vez');
        return false;
    }
    else {
        const {
            companyName, 
            companyCnpj, 
            businessName, 
            businessEmail, 
            businessPhone, 
            financialName, 
            financialEmail, 
            financialPhone, 
            contract, 
            address, 
            addressNumber, 
            city, 
            county, 
            state, 
            zipCode, 
            timeDayInitial, 
            timeDayFinal, 
            qtyGuest, 
            eventDay
        } = obj;
    
        if (!companyName || !companyCnpj || !businessName || !businessEmail || !businessPhone || !financialName || !financialEmail || !financialPhone || !contract || !address || !addressNumber || !city || !county || !state || !zipCode || !timeDayInitial || !timeDayFinal || !qtyGuest || !eventDay) {
            console.log({internalCode: 999999, message: 'Parâmetros faltantes na chamada'});
            alert('Verifique se todos os campos obrigatórios foram preenchidos por gentileza e tente outra vez');
            return false;
        }
    }
    console.log({internalCode: 201, message: 'Evento criado', data: obj});
    
    return true;
};

// function to get inputs and create the object to send to the API
const getBody = (elements) => {
    const inputs = [];
    let body = {};

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        if ((element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') && (element.name !== '' || element.name !== 'g-recaptcha-response')) inputs.push(element); 
    };

    inputs.forEach((input) => {
        let newBody = {...body, [input.name]: input.value}
        body = newBody;
    });

    return body;
};

// function to verify if the user clicked on the reCAPTCHA
let userResponse = '';

const canSubmit = () => {
    if (!userResponse) {
        grecaptchaError.innerText = 'Esse campo precisa ser preenchido';

        console.log({internalCode: 131, message: 'erro no Google Recaptcha'});

        return false;
    }
    else {
        const body = getBody(form.elements);

        const isValid = validateObj(body);

        if (isValid) {
            alert('Evento criado, tenha um bom dia e até logo!');

            return true; 
        }

        return false;
    }      
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