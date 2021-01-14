An API to allow synchronization of repositories on a server.

# How to start it?

It can be started via `npm start`. This will use `pm2` in the background to kill the current app, start it again and save the process list for resurection.

You can also use `npm run restart` to trigger a restart of the process in `pm2`.

# Live reloading

This API will handle live reloading for you. Let's say you have a repository which should start a process (Express server, cron job, etc.). Instead of having to watch for file changes in this repository (and potentially restarting the process too early) you can simply create a start script which should handle clean start (i.e. stop old process before starting) and the API will run this start script for every synchronization request (on the target branch).

**Note:** this only work for JS projects for now as it is checking for a `start` script in `package.json`.
