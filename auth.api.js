function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

document.addEventListener("DOMContentLoaded", (event) => {
    const registerForm = document.querySelector("#signUpForm");
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.querySelector("#username").value.trim()
        const email = document.querySelector("#email").value.trim()
        const number = document.querySelector("#number").value.trim()
        const password = document.querySelector("#password").value.trim()

        //  console.log(username);

        if (!username || !email || !number || !password) {
            console.log("Please fill all fields");
            return;
        }

        const formData = {
            username,
            email,
            number,
            password
        };

        if(!isValidEmail(email)){
            alert("Invalid email format Please try again ");
            return;
        };
        

        try {
            const registerFetchApi = await fetch("http://localhost:3000/api/register-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            //console.log("Response Status:", registerFetchApi.status); // Check response status

            const data = await registerFetchApi.json();


            if (data.message === "User Already ragisterd") {
                alert("Email or Username Already Ragisterd ! ");
                return;
            }

            if (data.message === "Invalid email format Please try again") {
                alert("Invalid email format Please try again ");
                return;
            }

            if (data.message === "Number is Not a valid format") {
                alert("Number is Not a valid format");
                return;
            }

            if (data.message === "Error Please Enter all fileds") {
                alert("Error Please Enter all fileds");
                return;
            }

            if (data.message === "Invalid email format Please try again") {
                alert("Invalid email format Please try again ");
                return;
            }


            if (!data.success) {
                console.log(`Error please try again`);
                return;
            };

            alert("ragistration succesfull")

        } catch (error) {
            console.log(`Error: ${error}`);
        }

    })
})