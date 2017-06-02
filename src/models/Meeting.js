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
  image: Buffer,
  creator: {
	  type: Schema.Types.ObjectId,
    ref: 'User'
  },
  participants: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
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

// UserSchema.methods.toJSON = function() {
// 	return _.pick(this, ['name'])
// }

export default mongoose.model('Meeting', MeetingSchema)
