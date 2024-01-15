import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = 'root'; // Troque isso por uma chave secreta mais segura em produção

const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token: string): any => {
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        return decodedToken;
    } catch (error) {
        throw new Error('Token inválido');
    }
};

const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

export {
    generateToken,
    verifyToken,
    hashPassword,
    comparePassword
};
