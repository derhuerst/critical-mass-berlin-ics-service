'use strict'

const aboutPage = (host) => `
	<!DOCTYPE html>
	<head>
	<meta charset="utf-8">
	<title>Critical Mass Berlin calendar feed</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	</head>
	<body>
	<h1>Critical Mass Berlin calendar feed</h1>
	<p>
		<a href="webcal://${host}/api/feed">subscribe to this calendar</a>
	</p><p>
		If the link above doesn't open your calendar, copy the link below and create a subscription in your calendar app:
		<br>
		<a href="https://${host}/api/feed">
			<code style="display:block">https://${host}/api/feed</code>
		</a>
	</p>
	</body>
	</html>
`

module.exports = (req, res) => {
	const {host} = req.headers
	res.writeHead(200, 'ok', {'content-type': 'text/html'})
	res.end(aboutPage(host))
}
