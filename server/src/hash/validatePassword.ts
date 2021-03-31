import passwordHash from 'password-hash';

const validatePassword = (password: string, hashedPassword: string): boolean => {
    const validPassword: boolean = passwordHash.verify(password, hashedPassword);

    return validPassword;
}

export { validatePassword }