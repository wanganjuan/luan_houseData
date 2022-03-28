/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const	Dong	=	sequelize.define('Dong', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		bname: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		num: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		area: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		time: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		uprice: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		bid: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		page: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'dong',
		timestamps: true
	});
	Dong.associate = function(models) {
	// associations can be defined here
	};
	return Dong
};
