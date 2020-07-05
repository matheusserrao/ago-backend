import Daily from '../models/Daily'

class DailyController{
    constructor(){

    }

    async create( req, res ){
        const { body } = req
                
        await Daily
                .create(body)
                .then(response => {
                        return res.status(200).json(response)
                })
                .catch(error => {
                    return res.status(500).json(error.message)
                })
    }

    async getAll(req, res){

       // const page = parseInt(req.query.page)
       // const limit = parseInt(req.query.limit)

        return await Daily.getAll().then(dailys => {
            return res.status(200).json(dailys || [])

        }).catch(error => {
            console.log(error)
            return res.status(500).json([])
        })
    }

    async delete (req, res ){

        const { id } = req.params

        await Daily
                .delete(id)
                .then(deleted => {
                    if (deleted == null){
                        return res.status(500).json('Documento não encontrado')
                    }

                    return res.status(200).json(deleted)
                })
                .catch(error => {
                    console.log(error)
                    return res.status(500).json(error.message)
                })

    }

    async patch ( req, res ){
        const { id } = req.params
        const { body } = req

        await Daily
                .patch(id, body)
                .then(updated => {
                    if (updated == null){
                        return res.status(500).json('Documento não encontrado')
                    }

                    return res.status(200).send(updated)
                })
                .catch(error => {
                    console.log(error)
                    return res.status(500).json(error.message)
                })

    }
}

export default new DailyController()