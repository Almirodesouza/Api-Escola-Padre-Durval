import * as Yup from 'yup';

class TurmasController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      homeroom_teacher: Yup.string().required(),
      shift: Yup.string()
        .oneOf(['Matutino', 'Vespertino', 'Noturno'])
        .required(),
      school_year: Yup.number().required(),
      max_students: Yup.number().optional(),
    });

     try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    return response.status(200).json({ ok: 'Turma criada com sucesso!' });
  }
}

export default new TurmasController();
