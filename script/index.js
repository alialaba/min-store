const signUp = document.getElementById('sign_up');
const signIn = document.getElementById('sign_in');
const suggest = document.getElementById('suggest-item');
const table = document.getElementById('tableData');


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
        .then((data) => {
            // Handle response you get from the server
            // console.log(data)
            if (data.success === true) {
                const user = data.payload;
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.href = "signIn.html"
            } else {
                setError(data.message)
            }

        }).catch((err) => console.log(err.message));


}


const signInHandler = (e) => {

    e.preventDefault();
    let email = signIn.elements[name = 'email'].value;
    let password = signIn.elements[name = 'psd'].value;


    const data = {
        email,
        password,
    }

    fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if (data.success === true) {
                const user = data.payload;
                //sesesion storage is use to match the recieved datas
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.href = "suggest.html"
            } else {
                setError(data.message);
            }
        }).catch((err) => console.log(err.message))


}

const suggestHandler = (e) => {
    e.preventDefault();
    let itemName = suggest.elements[name = 'name'];
    let itemDescribe = suggest.elements[name = 'describe'];
    let itemCategory = suggest.elements[name = "Category"];
    let itemReason = suggest.elements[name = "reason"];

    const data = {
        itemName,
        itemDescribe,
        itemCategory,
        itemReason,
    }
    try {
        fetch(`${BASE_URL}/suggest`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.token,
                },
                body: JSON.stringify(data),
            })
            .then((res) => res.json())
            .then((data) => {
                const user = data.payload;
                //sesesion storage is use to match the recieved datas
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.href = "/store/suggested.html";

            }).catch((err) => console.log(err))
    } catch (err) {
        console.log(err)
    }


}

const fetchAllData = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    fetch(`${BASE_URL}/suggested`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify(data),
        }).then((res) => res.json())
        .then((data) => {
            console.log(data);
        }).catch((err) => console.log(err.message));


}


//setting error
const setError = (input, message) => {
    let fieldInput = input.parentElement;
    let small = fieldInput.querySelector('small');
    small.innerText = message;
    fieldInput.className = "field error";

}