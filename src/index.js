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

app.get('/meetings/:offset/:count', async (req, res) => {
  const offset = await parseInt(req.params.offset)
  const count = await parseInt(req.params.count)
	const meetings = await Meeting.find({
  "$gte": Date.now
	})
  .sort('-date')
  .skip(offset)
  .limit(count)
  .populate('creator')
  .populate('participants')
	return res.json(meetings)
})

app.get('/communities/:offset/:count', async (req, res) => {
  const offset = await parseInt(req.params.offset)
  const count = await parseInt(req.params.count)
  const communities = await Community.find().skip(offset).limit(count)
  .populate('creator')
  .populate('participants')
  return res.json(communities)
})

app.get('/maxMeetingId', async (req, res) => {
  const maxMeetingId = await Meeting.find().sort({
    'id': -1
  }).limit(1)
  return res.json(maxMeetingId[0].id)
})

app.get('/maxCommunityId', async (req, res) => {
  const maxCommunityId = await Community.find().sort({
    'id': -1
  }).limit(1)
  return res.json(maxCommunityId[0].id)
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

app.post('/community', async (req, res) => {
  const data = req.body
  try {
    const result = await api.addCommunity(data)
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

// app.listen(3000, () => {
//   console.log('You are listening to port 3000')
// })

app.listen(80, '138.197.101.36', () => {
	console.log('You are listening to rupor.space port 80!')
})
