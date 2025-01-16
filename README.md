## Description

URL Shortener is a simple application that allows users to shorten long URLs into more manageable links. This project is built using Nest.js and Redis, providing a lightweight solution for URL shortening.

## API endpoints

| Method   |      Url       |     Headers |                           Description |
| :------- | :------------: | ----------: | ------------------------------------: |
| **GET**  | **/:shortUrl** |             |   redicrect to original url |
| **POST** |     **/**      |             |   generate a short url |
| **POST** |     **/**      | [x-api-key] |   generate a short url for api key user |

## Project setup

```bash
$ git clone https://github.com/ebrutpc/url-shorten.git
$ cd url-shorten
$ npm install
```

## Create a .env file

```bash
# .env.sample
PORT=3000
#REDIS CONNECTION
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Compile and run the project

```bash
# development
$ npm run start
```

## Run tests

```bash
# unit tests
$ npm run test --watch
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
