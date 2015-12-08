import { start } from './socketServer' 
import keystone from 'keystone'
import { options,locals,nav } from './config'
import routes from './routes/index'
import makeStore from './routes/services/league_store'

keystone.init(options)
keystone.import('models')
keystone.set('locals', locals)
keystone.set('routes', routes)
keystone.set('nav', nav)
keystone.set('store',makeStore())

keystone.start({
	onMount () { console.log('Application Mounted') },
	onStart () { console.log('Application Started') },
	onHttpServerCreated () { start(keystone) }
});
