const {PessoasServices, MatriculasServices} = require('../services')
const pessoasServices = new PessoasServices()


class MatriculaController {

    static async pegaUmaMatricula(req, res) {
        const {estudanteId, matriculaId} = req.params
        try{
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula(req, res) {
        const {estudanteId} = req.params
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId)}
        try{
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res) {
        const {estudanteId, matriculaId} = req.params
        const novasInfos = req.body
        try {
            await database.Matriculas.update(novasInfos, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            const matriculaAtualizada = await database.Matriculas.findOne( {where: {id: Number(matriculaId)}})
            return res.status(200).send(matriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarMatricula(req, res) {
        const {estudanteId, matriculaId} = req.params
        try {
            await database.Matriculas.destroy({where: {
                id: Number(matriculaId)
            }
        })
            return res.status(200).json({mensagem: `id ${matriculaId} deletado com sucesso.`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculas(req, res) {
        const {estudanteId} = req.params
        try {
            const pessoa = await database.Pessoas.findOne({where: {
                id: Number(estudanteId)
            }
        })
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        const {turmaId} = req.params
        try {
            const todasAsMatriculas = await matriculasServices.encontraEContaRegistros(
                {turma_id: Number(turmaId), status: 'confirmado'},
                {limit: 20, order: [['estudante_id', 'DESC']] })
            return res.status(200).json(todasAsMatriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraMatricula(req, res) {  
        const { id } = req.params
        try {
          await MatriculasService.restauraMatricula(id)
          return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }
}

module.exports = MatriculaController