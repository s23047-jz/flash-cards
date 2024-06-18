const passwordValidator = ({password}: { password: string }) => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    const errors: string[] = []
    if (password.length < 8) errors.push("Password must be 8 characters long");
    if (!uppercaseRegex.test(password)) errors.push("Password must contain 1 uppercase");
    if (!lowercaseRegex.test(password)) errors.push("Password must contain 1 lowercase");
    if (!numberRegex.test(password)) errors.push("Password must contain 1 number");
    if (!specialCharRegex.test(password)) errors.push("Password must contain 1 special character");

    if (errors.length) return errors
    return true;
};

export {};