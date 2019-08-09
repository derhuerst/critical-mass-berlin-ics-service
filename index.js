'use strict'

const {createServer} = require('http')
const generateIcs = require('./ics')

const respond = (res, statusCode, statusMessage, headers, body) => {
	res.writeHead(statusCode, statusMessage, headers)
	res.end(body)
}

const server = createServer((req, res) => {
	const path = new URL(req.url, 'http://example.org').pathname.slice(1)
	if (path !== 'critical-mass-berlin.ics') {
		return respond(res, 404, 'not found', {}, 'not found')
	}

	try {
		const ics = generateIcs()
		respond(res, 200, 'ok', {'content-type': 'text/calendar'}, ics)
	} catch (err) {
		console.error(err)
		respond(res, 500, 'error', {}, err + '')
	}
})

const port = parseInt(process.env.PORT || 3000)
server.listen(port, (err) => {
	if (err) {
		console.error(err)
		process.exit(1)
	} else console.info('listening on ' + port)
})
