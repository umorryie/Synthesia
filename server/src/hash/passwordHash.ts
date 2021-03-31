import passwordHash from 'password-hash';

const hashPassword = (password: string): string => {
    const hashedPw: string = passwordHash.generate(password);

    return hashedPw;
}

export { hashPassword }