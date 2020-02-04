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

## Assumptions
- All talks will have a title, followed by a time.
- All talk times will be in the format `NNmin` or the word `lightning`.
- Talk times will be between 5-60 minutes.
- Each talk will appear on a new line.

## How the schedule is generated
First, we parse the text file and convert that into a 'talks' array, with properties for talk title and talk duration. Then we instantiate a new `Track` and pass that and our talks into a `createSchedule` function, which recursively adds talks to the Track class, until no talks remain.

The Track class first fills all morning sessions, and continues to do so until the time remaining is greater than the shortest duration of remaining talks.  If the morning session is full, the Track class will fill the afternoon session based on the same principle, and if both are full, instantiate a new Track, until all talks have been added, at which point the scheduled talks are returned.

The Track class also appends a "networking event" which really is just a talk with no duration.

The scheduled talks are then passed into a `outputSchedule` method, which adds a bit of formatting, and also adds a lunch section between the sessions.
