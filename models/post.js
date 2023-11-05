//imports sequelize model & datatypes, plus sequelize connection instance
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//extends comment model from Model
class Comment extends Model {}

//initializes post model
Post.init(
{
	id:
	{
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	title:
	{
		type: DataTypes.TEXT,
		allowNull: false,
	},
	text:
	{
		type: DataTypes.TEXT,
		allowNull: false,
	},
	date:
	{
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
		allowNull: false,
	},
	user_id:
	{
		type: DataTypes.INTEGER,
		references:
		{
			model: 'user',
			key: 'id',
		},
	},
},
{
		sequelize,
		freezeTableName: true,
		modelName: 'post',
});

module.exports = Post;