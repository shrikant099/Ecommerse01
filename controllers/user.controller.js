// Email Format Validation Function
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

import bcrypt from 'bcrypt';
import { User } from "../models/auth.models.js";

const registerController = async (req, res) => {
    const { username, email, number, password } = req.body;

    // console.log(req.body);

    if (!username || !email || !number || !password) {
        return res.status(403).json(
            {
                success: false,
                message: "Error Please Enter all fileds"
            }
        );
    };

    if (isNaN(number)) {
        return res.status(400).json(
            {
                success: false,
                message: "Number is Not a valid format"
            }
        );
    };



    if (!isValidEmail(email)) {
        return res.status(403).json(
            {
                success: false,
                message: "Invalid email format Please try again"
            }
        );
    };

    try {

        const findUser = await User.findOne({ username: username });
        if (findUser) {
            return res.status(401).json(
                {
                    success: false,
                    message: "User Already ragisterd"
                }
            );
        };



        const userModel = {
            username,
            email,
            number,
            password
        };

        const createUser = await User.create(userModel);

        if (!createUser) {
            console.log(`Error Creating User`);
            return res.status(400).json(
                {
                    success: false,
                    message: "Error Creating User"
                }
            );
        };

        return res.status(200).json(
            {
                success: true,
                message: "User Created succesfull",
                registerUser: createUser
            }
        );

    } catch (error) {
        console.log(`Error Internal server registration ${error}`);
        return res.status(500).json(
            {
                success: false,
                message: "Internal sever error registraion"
            }
        );
    };
};

const loginUser = async (req , res) => {
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(401).json(
            {
                success: false,
                 message: "all fileds are required"
            }
        );
    };

    if(!isValidEmail(email)){
        return res.status(403).json(
            {
                success: false,
                message: "Invalid email format Please try again"
            }
        );
    }

    try {
     
        const findLoginUser = await User.findOne({email: email});
        if(!findLoginUser || !(await bcrypt.compare(password , findLoginUser.password))){
            return res.status(404).json(
                {
                    success: false,
                    message: "User Not Found"
                }
            );
        };

        return res.status(200).json(
            {
                success: true,
                message: "Login Succesfull",
                loginUser: findLoginUser
            }
        );
        
    } catch (error) {
        console.log(`Error login ${error}`);
        return res.status(500).json(
            {
                success: false,
                message: "Internal sever error Login"
            }
        );
    };
}


export {
    registerController,
    loginUser
}

