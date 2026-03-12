//Importaciones generales 
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

//Creamos el modelo de usuario con sus respectivos campos y validaciones
const userSchema = new mongoose.Schema({
  name: { type: String,
    required: [true, "Name is required"]
    },

    lastName: { type: String,
      required: [true, "Last name is required"]
    },

    email: { type: String,
      required: [true, "Email is required"],
      unique: true
    },

    password: { type: String,
      required: [true, "Password is required"]
    },

    phone: { type: String,
      required: [true, "Phone is required"]
    },

    typeUser: { type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeUser',
        required: [true, "TypeUser is required"]
    },
    
    deletedAt: { type: Date, 
        default: null 
    }    

});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  const passwordHash = await bcrypt.hash(this.password, 10);
  this.password = passwordHash;
  

});

const User = mongoose.model('User', userSchema);
export default User;