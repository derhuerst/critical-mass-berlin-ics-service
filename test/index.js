'use strict'

const {
	notStrictEqual,
} = require('assert')

const getIcs = require('../ics')

notStrictEqual(getIcs(), '', 'generate ICS must not be empty')
