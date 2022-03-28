/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const	User	=	sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		pwd: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		create_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		backup: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'user',
		timestamps: true
	});
	User.associate = function(models) {
	// associations can be defined here
	};
	return User
};
