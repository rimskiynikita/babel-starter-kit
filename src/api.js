import User from './models/User'
import Meeting from './models/Meeting'
import Community from './models/Community'

var fs = require('fs')

exports.addMeeting = async function(data) {
  try {
    var participants = []
    var creator = await User.findOne({
      id: data.creator.id
    }, function(err, user) {
      if (err) throw err
      console.log(user)
    })

    if (data.community != null) {
      var community = await
      Community.findOne({
        id: data.community.id
      }, function (err, community) {
        if (err) throw err
        console.log(community)
      })
    }

    for (var participant of data.participants) {
      var user = await User.findOne({
        id: participant.id
      }, function(err, user) {
        if (err) throw err
        console.log(user)
        participants.push(user._id)
      })
    }

    var imageBuffer = await new Buffer(data.image, 'base64')
    console.log(imageBuffer)

    var meetingData = {
      id: data.id,
      name: data.name,
      address: data.address,
      meetDescription: data.meetDescription,
      creator: creator._id,
      participants: participants,
      image: imageBuffer,
      date: data.date
    }

    var meeting = new Meeting(meetingData)
    await Meeting.update({
      id: meeting.id
    }, meetingData, {
      upsert: true
    }, function(err, num, n) {
      if(err) throw err
      console.log(num, n)
    })
    console.log('success')
    return {
      meeting
    }
  } catch (err) {
    console.log('error', err);
    throw err
  }
}

  exports.addUser = async function(data) {
    try {
      var user = new User(data)
      await User.update({
        id: user.id
      }, data, {
        upsert: true
      }, function(err, num, n) {
        if (err) throw err
        console.log(num, n)
      })
      console.log('success')
      return {
        user
      }
    } catch(err) {
      console.log('error', err);
      throw err
    }
  }
