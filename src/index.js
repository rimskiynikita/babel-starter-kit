import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Promise from 'bluebird'
import bodyParser from 'body-parser'
import User from './models/User'
import Meeting from './models/Meeting'
import Community from './models/Community'

mongoose.Promise = Promise
mongoose.connect('mongodb://rupor.space/ruporDB');

const app = express()
var api = require('./api.js')
app.use(bodyParser.json())
app.use(cors())

app.get('/users', async (req, res) => {
	const users = await User.find()
	return res.json(users)
})

app.get('/meetings', async (req, res) => {
	const meetings = await Meeting.find()
  .populate('creator')
  .populate('participants')
	return res.json(meetings)
})

app.get('/maxMeetingId', async (req, res) => {
  const maxMeetingId = await Meeting.find().sort({
    'id': -1
  }).limit(1)
  if (maxMeetingId.count == 0) {
    return res.json(0)
  } else {
    return res.json(maxMeetingId[0].id)
  }
})

app.post('/meeting', async (req, res) => {
	const data = req.body
	try {
		const result = await api.addMeeting(data)
		return res.json(result)
	} catch(err) {
		return res.status(400).json(err)
	}
})

app.post('/user', async (req, res) => {
  const data = req.body
  try {
    const result = await api.addUser(data)
    return res.json(data)
  } catch (err) {
    return res.status(400).json(err)
  }
})

app.listen(80, '138.197.101.36', () => {
	console.log('You are listening to rupor.space port 80!')
})
