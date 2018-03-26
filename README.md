Adult Swim Chat Logger
===
Access adult swim live stream chat and log to stdout.

## Quickstart
```bash
# build
docker build -t ubergarm/adultswimchatlogger .
# develop
docker run --rm -it -v "$PWD":/app --entrypoint=/bin/sh ubergarm/adultswimchatlogger
# run
docker run --rm -it ubergarm/adultswimchatlogger
```

## References
* [node docker base image](https://hub.docker.com/_/node/)
* [firebase js sdk](https://github.com/firebase/firebase-js-sdk)
* [firebase docs](https://firebase.google.com/docs/web/setup)
