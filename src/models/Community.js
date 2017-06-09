import mongoose from 'mongoose'
import _ from 'lodash'

const { Schema } = mongoose

const CommunitySchema = new Schema({
  id: Number,
  name: String,
  communityDescription: String,
  image: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

CommunitySchema.methods.toJSON = function() {
	return _.pick(this, ['id', 'name', 'communityDescription', 'image', 'creator', 'participants'])
}

export default mongoose.model('Community', CommunitySchema)
