# Jamlist

Feels a single-page web application where users can log how they are feeling and assocate emotions to each of their Entries.

This project is built on an Rails API backend with a Postgresql database and a JavaScript and html frontend. 

## Installation

Download or clone the files from [GitHub](https://github.com/jessegan/feels-js-project).

From the backend directory of the project, run the following command in console:
```bash
bundle install
```

To create the backend database, run the following commands in console:
```bash
rails db:create
rails db:migrate
```

To seed the database, run the following commands in console:
```bash
rails db:seed
```

## Usage

From the backend directory of the project, run the following command to run the Rails API locally:
```bash
rails s
```

This will start a local instance of the Rails API at http://localhost:3000

From the frontend directory of the project, run the following command to run the application locally:
```bash
http-server
```

This will start a local instance of the application at http://localhost:8080

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)