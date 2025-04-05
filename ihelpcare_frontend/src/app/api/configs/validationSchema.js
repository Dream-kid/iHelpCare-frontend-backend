import { z } from 'zod';

export const googleCaptcha = z.object({
  token: z.string().min(1, 'Token is required').max(65535),
});
