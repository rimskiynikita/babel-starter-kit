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
  .populate('community')
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

app.get('/allMyMeetings/:userId', async (req, res) => {
  const userId = await parseInt(req.params.userId)
  var me = await User.findOne({
    id: userId
  }, function(err, user) {
    if (err) throw err
    console.log(user)
  })
  const meetings = await Meeting.find({
    participants: { "$in" : [me]}
  })
  .sort('-date')
  .populate('creator')
  .populate('participants')
return res.json(meetings)
})

app.get('/maxMeetingId', async (req, res) => {
  var count = await Meeting.count({}, function(err, count) {
    if (err) throw err
    console.log(count)
  })
  if (count == 0) {
  return res.json(-1)
  } else {
    const maxMeetingId = await Meeting.find().sort({
      'id': -1
    }).limit(1)
  return res.json(maxMeetingId[0].id)
  }
})

app.get('/maxCommunityId', async (req, res) => {
  var count = await Community.count({}, function(err, count) {
    if (err) throw err
    console.log(count)
  })
  if (count == 0) {
    return res.json(-1)
  } else {
  const maxCommunityId = await Community.find().sort({
    'id': -1
  }).limit(1)
    return res.json(maxCommunityId[0].id)
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

app.get('/addMeetingParticipant/:meetingId/:userId', async (req, res) => {
  const meetingId = await parseInt(req.params.meetingId)
  const userId = await parseInt(req.params.userId)
  var me = await User.findOne({
    id: userId
  }, function(err, user) {
    if (err) throw err
      console.log(user)
    })

  await Meeting.update({
    id: meetingId
  },
    {
      $push: {
        participants: me._id
      }
    },
  function(err, num, n) {
    if(err) throw err
    console.log(num, n)
  })
  return res.json(me)
})

app.get('/communityMeetings/:communityId', async (req, res) => {
  const communityId = await parseInt(req.params.communityId)
  var community = await Community.findOne({
    id: communityId
  })

  var meetings = await Meeting.find({
    community: community._id
  })
  return res.json(meetings)
})

app.get('/removeMeetingParticipant/:meetingId/:userId', async (req, res) => {
  const meetingId = await parseInt(req.params.meetingId)
  const userId = await parseInt(req.params.userId)
  var me = await User.findOne({
    id: userId
  }, function(err, user) {
    if (err) throw err
    console.log(user)
  })

  await Meeting.update({
    id: meetingId
  },
  {
    $pull: {
      participants: me._id
    }
  },
  function(err, num, n) {
    if(err) throw err
    console.log(num, n)
  })
  return res.json(me)
})

app.get('/addCommunityParticipant/:communityId/:userId', async (req, res) => {
  const communityId = await parseInt(req.params.communityId)
const userId = await parseInt(req.params.userId)
var me = await User.findOne({
  id: userId
}, function(err, user) {
  if (err) throw err
  console.log(user)
})

await Community.update({
    id: communityId
  },
  {
    $push: {
      participants: me._id
    }
  },
  function(err, num, n) {
    if(err) throw err
    console.log(num, n)
  })
return res.json(me)
})

app.get('/user/:userId', async (req, res) => {
  const userId = await parseInt(req,params.userId)
  var user = await User.findOne({
    id: userId
  }, function(err, user) {
    if (err) throw err
    console.log(user)
  })
  return res.json(user)
})

app.get('/community/:communityId', async (req, res) => {
  const communityId = await parseInt(req.params.communityId)
var community = await Community.findOne({
  id: communityId
}, function(err, user) {
  if (err) throw err
  console.log(community)
}).populate('participants')

return res.json(community)
})

app.get('/removeCommunityParticipant/:communityId/:userId', async (req, res) => {
  const communityId = await parseInt(req.params.communityId)
const userId = await parseInt(req.params.userId)
var me = await User.findOne({
  id: userId
}, function(err, user) {
  if (err) throw err
  console.log(user)
})

await Community.update({
    id: communityId
  },
  {
    $pull: {
      participants: me._id
    }
  },
  function(err, num, n) {
    if(err) throw err
    console.log(num, n)
  })
return res.json(me)
})

// app.listen(3000, () => {
//   console.log('You are listening to port 3000')
// })

app.listen(80, '138.197.101.36', () => {
	console.log('You are listening to rupor.space port 80!')
})
