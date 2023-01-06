// const database = require('../models')
// const Sequelize = require('sequelize')

const {PessoasServices} = require('../services')
const pessoasServices = new PessoasServices()

class PessoaController {
     static async pegaPessoasAtivas(req, res) {
        try{
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
            return res.status(200).json(pessoasAtivas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

     static async pegaTodasAsPessoas(req, res) {
        try{
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
             return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
     }

    static async pegaUmaPessoa(req, res) {
        const {id} = req.params
        try{
            const umaPessoa = await pessoasServices.pegaUmRegistro({id})
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try{
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res) {
        const {id} = req.params
        const novasInfos = req.body
        try {
            await pessoasServices.atualizaRegistro(novasInfos, Number(id))
            return res.status(200).json({ mensagem: `id ${id} atualizado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarPessoa(req, res) {
        const {id} = req.params
        try {
            await pessoasServices.apagaRegistro(Number(id))
            return res.status(200).json({mensagem: `id ${id} deletado com sucesso.`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }


    static async restauraPessoa(req, res) {  
        const { id } = req.params
        try {
          const registroRestaurado = await pessoasServices
            .restauraRegistro(Number(id))
          return res.status(200).json(registroRestaurado)
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }


    static async pegaTurmasLotadas(req, res) {
        const lotacaoTurma = 2
        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(turmasLotadas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelaPessoa(req, res) {
        const {estudanteId} = req.params
        try {
            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
            return res.status(200).json({message: `matrículas ref. estudante ${estudanteId} canceladas`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController;