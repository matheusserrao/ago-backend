import mongoose, { Schema, model } from 'mongoose'
import moment from 'moment'
import timeZone from 'moment-timezone'

const DailySchema = new Schema({
    data: { 
        type: Date,
        require: [true, 'Informe uma data válida'],
        unique: true
    }, 
    fasting: {
        type:  Number,
        default: 0
    }, 
    updateFasting: {
        type: Date
    },
    afterBreakfast: {
        type: Number,
        default: 0
    }, 
    updateAfterBreakfast: {
        type: Date
    },
    beforeLunch: {
        type: Number,
        default: 0
    }, 
    updateBeforeLunch: {
        type: Date
    },
    afterLunch: {
        type: Number,
        default: 0
    }, 
    updateAfterLunch: {
        type: Date
    },
    beforeDinner: {
        type: Number,
        default: 0
    }, 
    updateBeforeDinner: {
        type: Date
    },
    afterDinner: {
        type: Number,
        default: 0
    },
    updateAfterDinner: {
        type: Date
    }
})

const DailyModel = model('daily', DailySchema)


class Daily{

    constructor(){

        this.fields = ['fasting', 'afterBreakfast', 'beforeLunch', 'afterLunch', 'beforeDinner', 'afterDinner']

    }

    idIsValid = (id) => mongoose.Types.ObjectId.isValid(id)

    bodyIsEmpty(body) {
        return (!body) || (Object.keys(body).length === 0 ) 
    }

    async create(body){

        const {
                data, 
                fasting, 
                afterBreakfast, 
                beforeLunch, 
                afterLunch, 
                beforeDinner, 
                afterDinner
              } = body
            
        if (this.bodyIsEmpty(body)){
            throw new Error('Informe um objeto válido')
        }
              
        if (!data){
            throw new Error('Informe uma data válida')
        }

        if ( (!fasting) && (!afterBreakfast) && (!beforeLunch) && (!afterLunch) && (!beforeDinner) && (!afterDinner)){
            throw new Error('Informe pelo menos 1 informação de glicose')
        }

        const validData = moment.utc(data, 'DD/MM/YYYY', true)

        if (!validData.isValid()){
            throw new Error('Informe uma data válida')
        }

        const startData = validData.startOf('day')
        const endData = validData.endOf('day')

        const exists = await DailyModel.findOne({data: {$gte: startData, $lte: endData}})

        if (exists){
            throw new Error('Data já cadastrada! Faça um update...')
        }

        const created = await DailyModel.create({data: validData, fasting, afterBreakfast, beforeLunch, afterLunch, beforeDinner, afterDinner })

        return created
    }

    async getAll(){

        /*
        parametros: (page = 0, limit = 0
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = { }
        const countedDocuments = await DailyModel.countDocuments()
        
        if (endIndex < countedDocuments){

            results.next = {
                page: page + 1,
                limit
            }
        }

        if (startIndex > 0){
            results.previos = {
                page: page -1,
                limit
            }
        }

        const dailys = await DailyModel
                                        .find()
                                        .limit(limit)
                                        .skip(startIndex)
                                        .sort({data: -1})
                                        .then(d => d)*/

        const dailys = await DailyModel.find()

        const dailysFormmated = dailys.map(d => {
            const { _doc } = d
            const formmated = moment.utc(_doc.data).format('DD/MM/YYYY')
            return {..._doc, dataFormmated: formmated}
        })

        //results.results = dailysFormmated
        //return results

        return dailysFormmated
    }

    async delete(id){

        if (!this.idIsValid(id)){
            throw new Error('ID é inválido')
        }

        const countDeleted = await DailyModel.findByIdAndDelete(id)
        return countDeleted
    }

    async patch (id, body){

        if (!this.idIsValid(id)){
            throw new Error('ID é inválido')
        }

        if (this.bodyIsEmpty(body)){
            throw new Error('Informe um objeto válido')
        }

        if (body.hasOwnProperty('data')){
            delete body.data
        }
        
        /*
        let indexOfField = 0

        for (const key in body) {

            const field = this.fields[indexOfField]

            if (body.hasOwnProperty(field)) {

                const value = Number(body[key])

                if (value < 0){
                    throw new Error(`Informe um valor acima ou igual a zero para o campo: ${field}`)
                }    
            }

            indexOfField++
        }*/

        const updated = await DailyModel.findByIdAndUpdate(id, {...body}, {new: true})

        const dataFormmated = moment.utc(updated.data).format('DD/MM/YYYY')

        return {...updated._doc, dataFormmated}
    }
}

export default new Daily()