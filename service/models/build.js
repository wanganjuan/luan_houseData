/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const	Build	=	sequelize.define('Build', {
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
		cid: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		position: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		location: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		cname: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		page: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'build',
		timestamps: true
	});
	Build.associate = function(models) {
	// associations can be defined here
	};
	return Build
};
