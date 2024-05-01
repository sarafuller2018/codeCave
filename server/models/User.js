const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
          },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
          },
        githubProfileLink: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        projects: [
            {
                type: Schema.Types.ObjectId,
                ref: "Project"
            }
        ]
    }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
 userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = model("User", userSchema);

module.exports = User;