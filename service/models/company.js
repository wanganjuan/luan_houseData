/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const	Company	=	sequelize.define('Company', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED.ZEROFILL,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			primaryKey: true
		}
	}, {
		tableName: 'company',
		timestamps: true
	});
	Company.associate = function(models) {
	// associations can be defined here
	};
	return Company
};
