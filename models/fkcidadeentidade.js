const Cidade = this.sequelize.define('cidadesteste', {/* attributes */})
const Entidade  = this.sequelize.define('entidadesteste', {/* attributes */})

User.belongsTo(Entidade, {foreignKey: 'fk_enditadesteste'}) // Adds fk_company to User