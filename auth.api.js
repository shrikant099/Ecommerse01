document.addEventListener("DOMContentLoaded", (event) => {
    const registerForm = document.querySelector("#signUpForm");
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.querySelector("#username").value.trim()
        const email = document.querySelector("#email").value.trim()
        const number = document.querySelector("#number").value.trim()
        const password = document.querySelector("#password").value.trim()

        console.log(username);
        
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
        

        try {
            const registerFetchApi = await fetch("http://localhost:3000/api/register-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            console.log("Response Status:", registerFetchApi.status); // Check response status

            const data = await registerFetchApi.json();

            if (!data.success) {
                console.log(`Error please try again`);
                return;
            };



        } catch (error) {
            console.log(`Error: ${error.message}`);
        }

    })
})