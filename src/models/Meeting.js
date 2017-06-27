import mongoose from 'mongoose'
import _ from 'lodash'

const { Schema } = mongoose

const MeetingSchema = new Schema({
  id: Number,
	name: String,
  address: {
	  type: String,
    default: 'ул. Волхонка, 12'
  },
  latitude: Number,
  longtitude: Number,
  meetDescription: String,
  creator: {
	  type: Schema.Types.ObjectId,
    ref: 'User'
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  community: {
    type: Schema.Types.ObjectId,
    ref: 'Community'
  },
  date: {
    type: String,
  }
}, {
	timestamps: true
})

MeetingSchema.methods.toJSON = function() {
	return _.pick(this, ['id', 'name', 'address', 'latitude', 'longtitude', 'meetDescription', 'creator', 'participants', 'community', 'date'])
}

export default mongoose.model('Meeting', MeetingSchema)
