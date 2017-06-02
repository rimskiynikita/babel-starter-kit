import mongoose from 'mongoose'
import _ from 'lodash'

const { Schema } = mongoose

const UserSchema = new Schema({
	id: Number,
  firstName: String,
  lastName: String,
  image: Buffer,
  age: Number,
  api: {
    type: String,
    enum: ['none', 'vk', 'fb'],
  },
  vkFriends: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  }
}, {
	timestamps: true
})

// PetSchema.methods.toJSON = function() {
// 	return _.pick(this, ['name', 'type', 'owner'])
// }

export default mongoose.model('User', UserSchema)
