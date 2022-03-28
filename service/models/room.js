/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const	Room	=	sequelize.define('Room', {
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
		bnum: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		num: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		totalArea: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		useArea: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		price: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		commonArea: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		totalPrice: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		display: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		decorate: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		remark: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		did: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'room',
		timestamps: true
	});
	Room.associate = function(models) {
	// associations can be defined here
	};
	return Room
};
