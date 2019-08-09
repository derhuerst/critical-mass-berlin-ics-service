'use strict'

const {createServer} = require('http')
const generateIcs = require('../ics')

const feedUrl = (req) => {
	const url = new URL(req.url, 'http://' + req.headers.host)
	url.search = ''
	return url.href
}

module.exports = (req, res) => {
	try {
		const ics = generateIcs(feedUrl(req))
		res.writeHead(200, 'ok', {'content-type': 'text/calendar'})
		res.end(ics)
	} catch (err) {
		console.error(err)
		res.writeHead(500, 'error')
		res.end(err + '')
	}
}
