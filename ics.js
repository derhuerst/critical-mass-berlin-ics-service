'use strict'

const {DateTime, IANAZone} = require('luxon')
const nextCriticalMassDates = require('next-critical-mass-berlin-dates')
const generateIcs = require('ics-service/generate-ics')

const TITLE = 'Critical Mass Berlin'
const REPO_URL = 'https://github.com/derhuerst/critical-mass-berlin-ics-service'

const ADDRESS = 'Mariannenplatz\\nMariannenplatz, Berlin, BE, Germany'
const LATITUDE = 52.502222
const LONGITUDE = 13.424387
const RADIUS = 60

const zone = new IANAZone('Europe/Berlin')
const berlinTime = ms => DateTime.fromMillis(ms, {zone})

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
			location: ADDRESS,
			url: 'https://criticalmass.berlin/',
			geo: {lat: LATITUDE, lon: LONGITUDE, radius: RADIUS},
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

	return generateIcs(TITLE, events, feedUrl)
}

module.exports = generateCriticalMassBerlinIcs
