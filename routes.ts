/**
 * An array of routes that are public and do not require authentication.
 * @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * An array of routes that are for authentication.
 * @type {string[]}
 */
export const authRoutes = ["/"];

/**
 * Prefix for API authentication
 * @type {string}
 */
export const apiAuth = "/api/auth";

/**
 * Default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/home";

export const apiUploadImage = "/api/uploadthing";

export const foodieAi = "/api/foodieai";
