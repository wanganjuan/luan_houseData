/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const	Clazz	=	sequelize.define('Clazz', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		sort: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		backup: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'clazz',
		timestamps: true
	});
	Clazz.associate = function(models) {
	// associations can be defined here
	};
	return Clazz
};
