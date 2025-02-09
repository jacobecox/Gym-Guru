import jwt from "jwt-simple";
import User from "../models/user.js";
import keys from "../config/keys.js";

// Create token for user with user id, time given, and expiration date
const userToken = (user) => {
  const timestamp = Math.round(Date.now() / 1000);
  return jwt.encode(
    {
      sub: user.id, // sub = subject (User ID)
      iat: timestamp, // iat = issued at
      exp: timestamp + 5 * 60 * 60, // exp = expires (in 5 hours)
    },
    keys.TOKEN_SECRET // secret key for signing token
  )
}

// When user logs in, they receive back the user's email and token to make authenticated requests
export const login = (req, res) => {
  res.send({ email: req.user.email, token:userToken(req.user) })
}

// Function to create a user which has current user's email and token
export const currentUser = (req,res) => {
  const user = {
    email: req.user.email,
    token: userToken(req.user),
  };
  res.send(user);
};

// Function to create a new account
export const createAccount = async (req, res, next) => {
  const { email, password } = req.body;

// Email and password are required
  if(!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'})
  }
  // mongoose will search for existing user matching that email first
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).send({error: 'Email is already in use'})
    }
// If email isn't in use a new user is created with inputted email and password
    const user = new User();
    user.email = email;
    user.setPassword(password);

    await user.save()

    res.json({ token: userToken(user) })
  } catch (err) {
    next(err)
  }
};

const Authentication = {
  login,
  currentUser,
  createAccount,
};

export default Authentication