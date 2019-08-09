'use strict'

const {DateTime, IANAZone} = require('luxon')
const nextCriticalMassDates = require('next-critical-mass-berlin-dates')
const {createEvents} = require('ics')
const appleStructuredLocation = require('./lib/apple-structured-location')

const REPO_URL = 'https://github.com/derhuerst/critical-mass-berlin-ics-service'

const ADDRESS = 'Mariannenplatz\\nMariannenplatz, Berlin, BE, Germany'
const LATITUDE = 52.502222
const LONGITUDE = 13.424387

const zone = new IANAZone('Europe/Berlin')
const berlinTime = ms => DateTime.fromMillis(ms, {zone})

const insertAfter = (lines, marker, newLines) => {
	if (!lines.includes(marker)) {
		throw new Error(`couldnt find the "${marker}" marker`)
	}
	const i = lines.indexOf(marker) + marker.length
	return [
		lines.slice(0, i),
		...newLines.filter(line => !!line).map(line => '\r\n' + line),
		lines.slice(i)
	].join('')
}

const generateCriticalMassBerlinIcs = (feedUrl = null) => {
	const dates = nextCriticalMassDates()

	const events = []
	for (let i = 0; i < 10; i++) {
		const t = dates.next().value
		const dt = berlinTime(t)

		events.push({
			uid: (t / 1000 | 0) + '',
			title: 'Critical Mass',
			description: 'Critical Mass Berlin',
			location: ADDRESS.replace(/,/g, '\\,'),
			url: 'https://criticalmass.berlin/',
			geo: {lat: LATITUDE, lon: LONGITUDE},
			categories: ['Critical Mass'],
			start: [dt.year, dt.month, dt.day, dt.hour, dt.minute],
			startOutputType: 'local',
			// tzid: 'Europe/Berlin',
			duration: {hours: 3, minutes: 0},
			status: 'CONFIRMED',
			sequence: 1,
			productId: REPO_URL
			// todo: alarms?
		})
	}

	const {error, value: rawIcs} = createEvents(events)
	if (error) throw error

	// add feed metadata
	// todo: this is really brittle, make it more robust
	const ics = insertAfter(rawIcs, 'METHOD:PUBLISH', [
		'X-WR-CALNAME:Critical Mass Berlin',
		feedUrl ? 'X-ORIGINAL-URL:' + feedUrl : null
	])
	return insertAfter(ics, 'STATUS:CONFIRMED', [
		appleStructuredLocation(ADDRESS, LATITUDE, LONGITUDE, 60)
	])
}

module.exports = generateCriticalMassBerlinIcs
