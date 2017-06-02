import mongoose from 'mongoose'
import _ from 'lodash'

const { Schema } = mongoose

const CommunitySchema = new Schema({
  id: Number,
  name: String,
  // meetDescription: String,
  image: Buffer,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  participants: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  }
}, {
  timestamps: true
})

// UserSchema.methods.toJSON = function() {
// 	return _.pick(this, ['name'])
// }

export default mongoose.model('Community', CommunitySchema)
