'use strict'

const slice = (str, l) => {
	let res = str.slice(0, 73)
	for (let i = 73; i < str.length; i += 72) {
		res += '\r\n ' + str.slice(i, i + 72)
	}
	return res
}

const appleStructuredLocation = (addr, lat, lon, r) => slice([
	  'X-APPLE-STRUCTURED-LOCATION;'
	, 'VALUE=URI;'
	, `X-APPLE-RADIUS=${r | 0};`
	, `X-TITLE="${addr}":`
	, `geo:${lat.toFixed(6)},${lon.toFixed(6)}`
].join(''))

module.exports = appleStructuredLocation
