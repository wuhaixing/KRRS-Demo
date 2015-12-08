import babelify from 'babelify'
import browserify from 'browserify-middleware'
import keystone from 'keystone'
import { packages } from '../client/packages'
const importRoutes = keystone.importer(__dirname)

// Load Routes
const routes = {
    views: importRoutes('./views')
}

// Setup Route Bindings
export default function(app) {

	// Browserification
	app.get('/js/packages.js', browserify(packages, {
		cache: true,
		precompile: true
	}))

	app.use('/js', browserify('./client', {
		transform: [babelify.configure({
			presets: ["es2015", "react"],
			plugins: ["transform-object-assign"],
		})],
	}))

	app.get('/', routes.views.home)
}
