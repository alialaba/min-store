const signUp = document.getElementById('sign_up');

const BASE_URL = 'https://jsminnastore.herokuapp.com';

const signUpHandler = (e) => {
    e.preventDefault()

    let fullName = signUp.elements[name = 'name'].value;
    let email = signUp.elements[name = 'email'].value;
    let mobileNumber = signUp.elements[name = 'phone'].value;
    let address = signUp.elements[name = 'home'].value;
    let gender = signUp.elements[name = "gender"].value;
    let password = signUp.elements[name = 'psd'].value;


    const data = {
        fullName,
        email,
        mobileNumber,
        address,
        gender,
        password,
    }
    fetch(`${BASE_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then(function(data) {
            // Handle response you get from the server
            console.log(data)
            const user = data.payload;
            sessionStorage.setItem(user, JSON.stringify(user));
            window.location.href = "/store/suggest.html"

        }).catch(function(error) {
            console.log(error);
        });

    // console.log(data)
}


const signIn = document.getElementById('sign_in');

const signInHandler = (e) => {

    e.preventDefault();
    let email = signIn.elements[name = 'email'].value;
    let password = signIn.elements[name = 'psd'].value;


    const data = {
        email,
        password,
    }
    try {
        fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "Bearer " + user.token,
                },
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                const user = data.payload;
                //sesesion storage is use to match the recieved datas
                sessionStorage.setItem(user, JSON.stringify(user));
                window.location.href = "/store/suggest.html"


            }).catch((err) => console.log(err))

    } catch (err) {
        console.log(err)
    }

}