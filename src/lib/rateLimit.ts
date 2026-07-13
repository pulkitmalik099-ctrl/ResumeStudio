import { NextResponse } from 'next/server';

// Simple in-memory rate limiter
// In production, use Redis or a dedicated service
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000 // 1 minute
) {
  const now = Date.now();
  const userLimit = requestCounts.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    requestCounts.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, remaining: limit - 1 };
  }

  if (userLimit.count >= limit) {
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.ceil((userLimit.resetTime - now) / 1000),
    };
  }

  userLimit.count++;
  return { success: true, remaining: limit - userLimit.count };
}

export function createRateLimitResponse(
  retryAfter: number,
  message: string = 'Too many requests. Please try again later.'
) {
  return NextResponse.json(
    { message },
    {
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString(),
      },
    }
  );
}
