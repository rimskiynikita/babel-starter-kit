import User from './models/User'
import Meeting from './models/Meeting'
import Community from './models/Community'

exports.addMeeting = async function(data) {
  try {
    var creator = await User.findOne({
      id: data.creator.id
    }, function(err, user) {
      if (err) throw err
      console.log(user)
    })

    if (data.community != null) {
      var community = await Community.findOne({
        id: data.community.id
      }, function (err, community) {
        if (err) throw err
        console.log(community)
      })
    }

    var participants = []
    for (var participant of data.participants) {
      var user = await User.findOne({
        id: participant.id
      }, function(err, user) {
        if (err) throw err
        console.log(user)
        participants.push(user._id)
      })
    }
    var meetingData = {}
    if (data.community != null) {
      meetingData = {
        id: data.id,
        name: data.name,
        address: data.address,
        longtitude: data.longtitude,
        latitude: data.latitude,
        meetDescription: data.meetDescription,
        creator: creator._id,
        participants: participants,
        date: data.date,
        community: community._id
      }
    } else {
      meetingData = {
        id: data.id,
        name: data.name,
        address: data.address,
        longtitude: data.longtitude,
        latitude: data.latitude,
        meetDescription: data.meetDescription,
        creator: creator._id,
        participants: participants,
        date: data.date,
      }
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

exports.addCommunity = async function(data) {
  try {
    var creator = await User.findOne({
      id: data.creator.id
    }, function(err, user) {
      if (err) throw err
      console.log(user)
    })

    var participants = []
    for (var participant of data.participants) {
      var user = await User.findOne({
        id: participant.id
      }, function(err, user) {
        if (err) throw err
        console.log(user)
        participants.push(user._id)
      })
    }

    var communityData = {
      id: data.id,
      name: data.name,
      communityDescription: data.communityDescription,
      creator: creator._id,
      participants: participants
    }

    var community = new Community(communityData)
    await Community.update({
      id: community.id
    }, communityData, {
      upsert: true
    }, function(err, num, n) {
      if(err) throw err
      console.log(num, n)
    })
    console.log('success')
    return {
      community
    }
  } catch (err) {
    console.log('error', err);
    throw err
  }
}

exports.addUser = async function(data) {
    try {
      var userData = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        followingIds: data.followingIds,
        age: data.age,
        api: data.api
      }

      var user = new User(userData)
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
