import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

class LoginController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(request.body, { strict: true });

    const emailOrPasswordIncorrect = () => {
      return response.status(400).json({ error: 'Email ou senha inválidos.' });
    };

    if (!isValid) {
      emailOrPasswordIncorrect();
    }

    const { email, password } = request.body;

    const userExists = await User.findOne({ where: { email } });

    if (!userExists) {
      emailOrPasswordIncorrect();
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password_hash,
    );

    if (!isPasswordCorrect) {
      emailOrPasswordIncorrect();
    }

    const token = jwt.sign({id: userExists.id}, authConfig.secret, {
      expiresIn: authConfig.expiresIn
    })

    return response.status(200).json({
      message: `Login realizado com sucesso!`,
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      token,
    });
  }
}

export default new LoginController();
