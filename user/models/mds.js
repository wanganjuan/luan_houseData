/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const	Mds	=	sequelize.define('Mds', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		backup: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'mds',
		timestamps: false
	});
	Mds.associate = function(models) {
	// associations can be defined here
	};
	return Mds
};
