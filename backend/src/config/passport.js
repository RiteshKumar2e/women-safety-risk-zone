import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
            scope: ['profile', 'email']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let user = await User.findOne({
                    where: { googleId: profile.id }
                });

                if (user) {
                    // Update last login
                    user.lastLogin = new Date();
                    await user.save();
                    return done(null, user);
                }

                // Check if email already exists (local account)
                const emailExists = await User.findOne({
                    where: { email: profile.emails[0].value }
                });

                if (emailExists) {
                    // Link Google account to existing user
                    emailExists.googleId = profile.id;
                    emailExists.provider = 'google';
                    emailExists.profilePicture = profile.photos[0]?.value;
                    emailExists.isVerified = true;
                    emailExists.lastLogin = new Date();
                    await emailExists.save();
                    return done(null, emailExists);
                }

                // Create new user
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    provider: 'google',
                    profilePicture: profile.photos[0]?.value,
                    isVerified: true,
                    isActive: true,
                    lastLogin: new Date()
                });

                done(null, user);
            } catch (error) {
                console.error('Google OAuth Error:', error);
                done(error, null);
            }
        }
    )
);

export default passport;
