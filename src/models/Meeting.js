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
  meetDescription: String,
  imageUrl: String,
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
    type: Date,
    default: Date.now
  }
}, {
	timestamps: true
})

MeetingSchema.methods.toJSON = function() {
	return _.pick(this, ['id', 'name', 'address', 'meetDescription', 'creator', 'participants', 'community', 'date', 'imageUrl'])
}

export default mongoose.model('Meeting', MeetingSchema)
