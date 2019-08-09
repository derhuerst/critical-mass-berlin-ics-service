'use strict'

const {DateTime, IANAZone} = require('luxon')
const nextCriticalMassDates = require('next-critical-mass-berlin-dates')
const {createEvents} = require('ics')

const REPO_URL = 'https://github.com/derhuerst/critical-mass-berlin-ics-service'

const zone = new IANAZone('Europe/Berlin')
const berlinTime = ms => DateTime.fromMillis(ms, {zone})

const generateCriticalMassBerlinIcs = () => {
	const dates = nextCriticalMassDates()

	const events = []
	for (let i = 0; i < 10; i++) {
		const t = dates.next().value
		const dt = berlinTime(t)

		events.push({
			uid: (t / 1000 | 0) + '',
			title: 'Critical Mass',
			description: 'Critical Mass Berlin',
			location: 'Mariannenplatz, Berlin',
			url: 'https://criticalmass.berlin/',
			geo: {lat: 52.502222, lon: 13.424387},
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

	const {error, value} = createEvents(events)
	if (error) throw error
	return value
}

module.exports = generateCriticalMassBerlinIcs
