export function InputValidator(type: string, value: string): boolean{
    let regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let regNickname = /^[a-zA-Z0-9_]{3,20}$/;

    switch (type) {
        case "email":
            if(!regMail.test(value)){
                alert("Email is not correct");
                return false;
            }
            break;

        case "nickname":
            if(!regNickname.test(value) || value.length < 5){
                alert("Nickname is not correct");
                return false;
            }
            break;

        case "password":
            if(value.length < 8){
                alert("Password should contain more than 8 characters");
                return false;
            }
            break;
    }
    return true;
}

export function ConfirmPassValidator(password: string, confirmPassword: string): boolean{
    if(password === confirmPassword){
        return true;
    }

    alert("Passwords are not the same")
    return false;
}