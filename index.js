'use strict'

const {createServer} = require('http')
const feed = require('./api/feed')

const server = createServer((req, res) => {
	const path = new URL(req.url, 'http://example.org').pathname.slice(1)
	if (path !== 'critical-mass-berlin.ics') {
		res.writeHead(404, 'not found')
		res.end('not found')
		return
	}

	feed(req, res)
})

const port = parseInt(process.env.PORT || 3000)
server.listen(port, (err) => {
	if (err) {
		console.error(err)
		process.exit(1)
	} else console.info('listening on ' + port)
})
