'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
     Pessoas.hasMany(models.Turmas, {
      foreignKey: 'docente_id'
     })
     Pessoas.hasMany(models.Matriculas, {
      foreignKey: 'estudante_id',
      scope: { status: 'confirmado'},
      as: 'aulasMatriculadas'
     })
    }
  }
  Pessoas.init({
    nome: {
      type:DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if(dado.length < 3 ) throw new Error('o campo deve ter mais de 3 caracteres')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail:{
          args: true,
          msg: 'dado do tipo email inválido'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    defaultScope: {
      where: {ativo: true}
    },
    scopes:{
      todos: {where: {}}
    },
    modelName: 'Pessoas',
  });
  return Pessoas;
};