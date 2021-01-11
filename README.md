# repo-sync-api

An API to allow synchronization of repositories on a server.

`pm2` is installed locally and you can call the CLI using `npm run pm2 <command>`, `<command>` being the command you'd like to pass to `pm2`. This allows the usage of `pm2` even if the user cannot install `pm2` globally.

_Note:_ if you must pass options/flags to `pm2` you have to run the script as follow: `npm run pm2 -- <command>` in order for npm to parse your options properly. 