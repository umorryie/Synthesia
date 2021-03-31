import User from '../database/userSchema/UserSchema';

const validateUserExistence = async (req: any, res: any, next: any) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ error: { message: "User with this email does not exist." } });
        } else {
            req.body.user = user;
            next();
        }
    } catch (error) {
        return res.json({ error });
    }
}

export { validateUserExistence };