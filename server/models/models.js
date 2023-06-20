const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER" },
})

const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    
})

const BasketWeapon = sequelize.define('basketweapon',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const Weapon = sequelize.define('Weapon',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,unique: true,allowNull:false },
    price: {type: DataTypes.INTEGER,allowNull:false},
    img: {type: DataTypes.STRING, allowNull:false},
})
const Brand = sequelize.define('brand',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,unique: true,allowNull:false },
})
const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,unique: true,allowNull:false },
})
const WeaponInfo = sequelize.define('weaponinfo',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING,allowNull:false },
    description: {type: DataTypes.STRING,allowNull:false },
})

const TypeBrand = sequelize.define('typebrand',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    
}) 

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketWeapon)
BasketWeapon.belongsTo(Basket)

Type.hasMany(Weapon)
Weapon.belongsTo(Type)

Brand.hasMany(Weapon)
Weapon.belongsTo(Brand)

Weapon.hasMany(BasketWeapon)
BasketWeapon.belongsTo(Weapon)

Weapon.hasMany(WeaponInfo, {as: 'info'})
WeaponInfo.belongsTo(Weapon)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports = {
    User,
    Basket,
    BasketWeapon,
    Weapon,
    Brand,
    Type,
    WeaponInfo,
    TypeBrand
}