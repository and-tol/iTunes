# itunes

Empty project.

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To run in hot module reloading mode:

```sh
npm start
```

To create a production build:

```sh
npm run build-prod
```

## Running

```sh
node dist/bundle.js
```

## Credits

Made with [createapp.dev](https://createapp.dev/)

## .eslintrc
## Parser:
## 1)
"parser": "@typescript-eslint/parser",
"parserOptions": {
    "sourceType": "module"
    "ecmaVersion": 11,
},
## 2
"parserOptions": {
    "sourceType": "module",
    "parser": "babel-eslint",
    "ecmaVersion": 2018
  },