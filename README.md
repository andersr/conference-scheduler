# Conference Track Scheduler
Generate a conference schedule from a list of talks in a text file.

## Installing
- Clone and cd into repo.
- Run `yarn install`.

## Running the app
- In the source directory, add a text file named `talks.txt`.
- Talks in the text file should be formatted as follows: `"<talk title> <talk duration in minutes>"` eg `"My talk title 30min"`.
- If the talk is a lightning talk, the talk duration can be replaced with `"lightning"`.
- Each talk should appear on a new line.
- To generate a schedule, run `yarn start`.
- The schedule will be output in the console.
