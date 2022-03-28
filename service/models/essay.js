/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const	Essay	=	sequelize.define('Essay', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		tag: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		desc: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		create_date: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'essay',
		timestamps: true
	});
	Essay.associate = function(models) {
	// associations can be defined here
	};
	return Essay
};
