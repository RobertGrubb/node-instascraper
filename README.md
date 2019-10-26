# InstaScraper
-----------------------

`npm i node-instascraper`

You must provide the following methods with your userid and session cookies for instagram:

`getStoriesFeed`
`getStories`
`getMediaComments`
`getUserById`

On these routes, in addition to the parameter that is required for the route, you must also pass a valid userid and cookie session string with the request.

The following you can use without credentials:

`getUserByUsername`
`getMediaByCode`

Check out the example folder for more information on some of the routes. 
