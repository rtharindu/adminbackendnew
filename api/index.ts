import { Request, Response } from 'express';
import app from '../src/app';

export default async function handler(req: Request, res: Response) {
  try {
    // Set up module resolution for path aliases
    const Module = require('module');
    const originalRequire = Module.prototype.require;
    
    Module.prototype.require = function(id: string) {
      if (id.startsWith('@/')) {
        const relativePath = id.replace('@/', '../src/');
        return originalRequire.call(this, relativePath);
      }
      return originalRequire.call(this, id);
    };

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
