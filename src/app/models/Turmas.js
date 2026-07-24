import Sequelize, { Model } from "sequelize";

class Turmas extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            homeroom_teacher: Sequelize.STRING,
            shift: Sequelize.STRING,
            school_year: Sequelize.INTEGER,
            max_students: Sequelize.INTEGER,
        },{
            sequelize,
            tableName: 'turmas'
        })
    }
}

export default Turmas;