# Attendance checker for KING OF TIME

Inside headless browser, automatically sing in to KING OF TIME, and retrieve your attendance time(opening time and closing time).

If the attendance time is not registered, and the time is elapsed your normal opening time or closing time,

this program will notify your Slack by Slack Web Hook URL.

This is often useful when you are remote worker.

## Installation and Usage

### Docker

1. clone or folk this repository, and build your own docker image. like this, `docker build -t attendance-checker-for-king-of-time:latest .`

2. When you run the docker image, you need to prepare these environment variables.

- KING_OF_TIME_LOGIN_ID

  - your KING OF TIME login ID. (now, does not support KING OF TIME API yet...)
  - e.g. KING_OF_TIME_LOGIN_ID=xxxxxxxxxxxxxxx

- KING_OF_TIME_LOGIN_PASSWORD

  - your KING OF TIME login password.
  - e.g. KING_OF_TIME_LOGIN_PASSWORD=yyyyyyyyyyyyyy

- OPENING_HOUR

  - your opening hour(working start hour) (on JST)
  - e.g. OPENING_HOUR=9

- CLOSING_HOUR

  - your closing hour(working end hour) (on JST)
  - e.g. CLOSING_HOUR=18

- SLACK_INCOMING_WEB_HOOK_URL
  - incoming webhook URL on your slack workspace. **When run thin program, if you don't record attendance on KING OF TIME, this program will notify.**
  - e.g. SLACK_INCOMING_WEB_HOOK_URL=https://hooks.slack.com/services/xxxxxxxx/yyyyyyyy/AAAAAAAAAAAA

3. Just run the docker image.

e.g. `docker run --rm --env KING_OF_TIME_LOGIN_ID=xxxxxxxxxxxxxxx --env KING_OF_TIME_LOGIN_PASSWORD=yyyyyyyyyyyyyy --env OPENING_HOUR=9 --env CLOSING_HOUR=18 --env SLACK_INCOMING_WEB_HOOK_URL=https://hooks.slack.com/services/xxxxxxxx/yyyyyyyy/AAAAAAAAAAAA attendance-checker-for-king-of-time:latest`

### npm/yarn

install this package by npm or yarn.

and, install [ChromeDriver](https://chromedriver.chromium.org/downloads) which should be located in PATH.

I recommend you to use this program by Docker, because Chrome version and ChromeDriver version must be equal.

## Development

After checking out the repo, run `yarn install` to install dependencies. Then, run `yarn lint` to run the lint.

I recommend you to develop inside docker image. just like this, `docker run -it --rm -v ~/src/attendance-checker-for-king-of-time/:/app/ --env KING_OF_TIME_LOGIN_ID=xxxxxxxxxxxxxxx --env KING_OF_TIME_LOGIN_PASSWORD=yyyyyyyyyyyyyy --env OPENING_HOUR=9 --env CLOSING_HOUR=18 --env SLACK_INCOMING_WEB_HOOK_URL=https://hooks.slack.com/services/xxxxxxxx/yyyyyyyy/AAAAAAAAAAAA attendance-checker-for-king-of-time:latest tail -f /dev/null`

after start the container, develop inside the docker container.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/shoutatani/attendance-checker-for-king-of-time. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/shoutatani/attendance-checker-for-king-of-time/blob/master/CODE_OF_CONDUCT.md).

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the attendance-checker-for-king-of-time project's codebases, issue trackers is expected to follow the [code of conduct](https://github.com/shoutatani/attendance-checker-for-king-of-time/blob/master/CODE_OF_CONDUCT.md).
