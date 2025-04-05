import ApiResponse from '@api/configs/ApiResponse';
import { googleCaptcha } from '@api/configs/validationSchema';
import axios from 'axios';

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = googleCaptcha.safeParse(body);

    if (!validation.success) {
      return ApiResponse(
        404,
        'ERROR',
        'Google reCAPTCHA v3 token is required',
        validation.error.errors
      );
    }

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${body.token}`;

    const response = await axios.post(url);

    if (response?.data?.success) {
      return ApiResponse(
        200,
        'SUCCESS',
        'Google reCAPTCHA v3 token is valid (Human 👨👩)',
        response?.data
      );
    }

    return ApiResponse(
      400,
      'ERROR',
      'Google reCAPTCHA v3 token is invalid (Robot 🤖)',
      response?.data
    );
  } catch (error) {
    return ApiResponse(500, 'ERROR', 'Getting Server Side Error', error);
  }
}
