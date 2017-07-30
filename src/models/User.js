import mongoose from 'mongoose'
import _ from 'lodash'

const { Schema } = mongoose

const UserSchema = new Schema({
  id: Number,
  firstName: String,
  lastName: String,
  age: String,
  followingIds: [Number],
  api: {
    type: String,
    enum: ['none', 'vk', 'fb'],
  }
}, {
	timestamps: true
})

UserSchema.methods.toJSON = function() {
	return _.pick(this, ['id', 'firstName', 'lastName', 'age', 'api', 'followingIds'])
}

export default mongoose.model('User', UserSchema)
