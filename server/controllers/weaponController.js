const uuid = require('uuid')
const path = require('path')
const {Weapon, WeaponInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class WeaponController{
    async create(req, res, next){
        try{
            let {name,price, brandId,typeId, info } = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const weapon = await Weapon.create({name,price, brandId,typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    WeaponInfo.create({
                        title: i.title,
                        description: i.description,
                        weaponId:  weapon.id
                    })
                    )
            }

            return res.json(weapon)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res){
        let {brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let weapons;
        if (!brandId && !typeId) {
            weapons = await Weapon.findAndCountAll({limit,offset})
        }
        if (brandId && !typeId) {
            weapons = await Weapon.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            weapons = await Weapon.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            weapons = await Weapon.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(weapons)
    }

    async getOne(req, res){
        const {id} = req.params 
        const weapon = await Weapon.findOne(
            {   
                where: {id},
                include: [{model: WeaponInfo, as:'info'}]

            },
        )
        return res.json(weapon)
    }
}

module.exports = new WeaponController()