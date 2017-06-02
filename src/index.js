import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Promise from 'bluebird'
import bodyParser from 'body-parser'
import saveDataInDb from './saveDataInDb'
import User from './models/User'
import Meeting from './models/Meeting',
import Community from './models/Community'

mongoose.Promise = Promise
mongoose.connect('mongodb://rupor.space/ruporDB');

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/users', async (req, res) => {
	const users = await User.find()
	return res.json(users)
})

app.get('/meetings', async (req, res) => {
	const meetings = await Meeting.find().populate('creator')
	return res.json(meetings)
})

app.post('/data', async (req, res) => {
	const data = req.body

	const user = await User.findOne({
		name: data.user.name
	})
	if (user) return res.status(400).send('user.name exists')
	try {
		const result = await saveDataInDb(data)
		return res.json(result)
	} catch(err) {
		return res.status(500).json(err)
	}
})

app.listen(3000, 'localhost', () => {
	console.log('You are listening to port 3000!')
})
