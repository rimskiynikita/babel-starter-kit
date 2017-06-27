import mongoose from 'mongoose'
import _ from 'lodash'

const { Schema } = mongoose

const UserSchema = new Schema({
  id: Number,
  firstName: String,
  lastName: String,
  age: String,
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  api: {
    type: String,
    enum: ['none', 'vk', 'fb'],
  }
}, {
	timestamps: true
})

UserSchema.methods.toJSON = function() {
	return _.pick(this, ['id', 'firstName', 'lastName', 'age', 'api', 'following'])
}

export default mongoose.model('User', UserSchema)
