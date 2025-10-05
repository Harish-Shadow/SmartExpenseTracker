import { findUserByEmail, createUser } from '../models/userModel.js';

// Signup controller
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const { user: existUser } = await findUserByEmail(email);
        if (existUser) {
            return res.status(400).json({ message: 'User exists' });
        }
        const { user, error } = await createUser({ username, email, password });
        if (error) {
            return res.status(500).json({ message: 'Error creating user' });
        }
        return res.status(201).json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user } = await findUserByEmail(email);
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        return res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
