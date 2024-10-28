/**
 * an array of routes that are public
 * these routes do not require authentication
 * @type {string[]}
 * 
 */


    
export const publicRoutes: string[] = [
    "/"
]
/**
 * an array of routes that are user authentication
 * these routes will redirect to the logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register"    
]


/**prefix for API authentication routes
 * Routes with this prefix will be handled by the auth API
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth"



/**the default login redirect route
 * 
 * @type {string}
 */
export const default_login_redirect = "/settings"
