const providerRoutes = require('./providersRoutes')

module.exports = function(app, database) {
	providerRoutes(app,database);
	
}