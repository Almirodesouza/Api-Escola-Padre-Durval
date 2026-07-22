import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import User from '../models/user.js';

class UserController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, email, password, admin } = request.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return response.status(400).json({ error: 'Email já existe!' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    });

    return response
      .status(200)
      .json(
        `Usuário ${user.name} criado com sucesso, ID: ${user.id}, email: ${user.email}!`,
      );
  }
}

export default new UserController();
