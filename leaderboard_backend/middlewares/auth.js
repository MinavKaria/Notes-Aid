import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided or invalid format'
      });
    }

    const token = authHeader.substring(7);

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();
      
      if (!payload.email || !payload.email.endsWith('@somaiya.edu')) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Please use your Somaiya email.'
        });
      }

      req.user = {
        email: payload.email,
        name: payload.name,
        googleId: payload.sub
      };

      next();
    } catch (googleError) {
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = decoded;
        next();
      } catch (jwtError) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      }
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

export const verifyToken = verifyGoogleToken;