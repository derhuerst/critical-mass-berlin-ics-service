'use strict'

const {createServer} = require('http')
const generateIcs = require('../ics')

module.exports = (req, res) => {
	try {
		const ics = generateIcs()
		res.writeHead(200, 'ok', {'content-type': 'text/calendar'})
		res.end(ics)
	} catch (err) {
		console.error(err)
		res.writeHead(500, 'error')
		res.end(err + '')
	}
}
