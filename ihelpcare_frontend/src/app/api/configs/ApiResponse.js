import { NextResponse } from 'next/server';

/**
 * ApiResponse function generates a Next.js server response with JSON content.
 *
 * @param {number} statusCode - The HTTP status code for the response.
 * @param {string} title - The title or brief description of the response.
 * @param {string} message - A detailed message or explanation associated with the response.
 * @param {any} myData - Additional data to include in the response payload.
 *
 * @returns {NextResponse} - The Next.js server response object.
 *
 * @example
 * const response = ApiResponse(200, 'SUCCESS', 'Resource retrieved successfully', myData);
 * return response;
 */
export default function ApiResponse(statusCode, title, message, myData) {
  return NextResponse.json({ title, message, data: myData }, { status: statusCode });
}
