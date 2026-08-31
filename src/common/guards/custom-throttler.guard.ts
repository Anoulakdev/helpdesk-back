import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const clientIp =
      (req.ips && req.ips.length > 0 ? req.ips[0] : null) ||
      req.ip ||
      (req.headers?.['x-forwarded-for']
        ? req.headers['x-forwarded-for'].toString().split(',')[0].trim()
        : null) ||
      req.connection?.remoteAddress ||
      '127.0.0.1';

    // 1. If user object is already attached to request
    if (req.user?.id) {
      return `user:${req.user.id}`;
    }

    // 2. If Authorization header contains Bearer token, decode it to extract userId/sub
    const authHeader = req.headers?.authorization;
    if (
      authHeader &&
      typeof authHeader === 'string' &&
      authHeader.startsWith('Bearer ')
    ) {
      const token = authHeader.substring(7).trim();
      if (token) {
        try {
          const decoded = jwt.decode(token) as {
            sub?: number | string;
            id?: number | string;
            userId?: number | string;
          } | null;

          const userId = decoded?.sub ?? decoded?.id ?? decoded?.userId;
          if (userId) {
            return `user:${userId}`;
          }
        } catch {
          // If token decoding fails, proceed to next fallback
        }
      }
    }

    // 3. For login requests: track by IP + Username to prevent users on shared office network from blocking each other
    if (req.body?.username && typeof req.body.username === 'string') {
      const username = req.body.username.trim().toLowerCase();
      return `login:${clientIp}:${username}`;
    }

    // 4. Fallback to client IP for unauthenticated requests
    return `ip:${clientIp}`;
  }
}
