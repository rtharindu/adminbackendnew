import { VercelRequest, VercelResponse } from '@vercel/node';
import app from './app';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Forward the request to the Express app
    app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: 'Something went wrong'
    });
  }
}
