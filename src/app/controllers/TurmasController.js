import * as Yup from 'yup';
import Turmas from '../models/Turmas.js';

class TurmasController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      homeroom_teacher: Yup.string().required(),
      shift: Yup.string()
        .oneOf(['matutino', 'vespertino', 'noturno'])
        .required(),
      school_year: Yup.number().required(),
      max_students: Yup.number().optional(),
    });

     try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, homeroom_teacher, shift, school_year, max_students } = request.body;

    const newTurma = await Turmas.create({
      name,
      homeroom_teacher,
      shift,
      school_year,
      max_students,
    })

    return response.status(200).json(newTurma);
  }

  async index(_request, response) {
    const turmas = await Turmas.findAll();

    return response.status(200).json(turmas);
  }
}

export default new TurmasController();
