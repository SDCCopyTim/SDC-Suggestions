# Suggestions Module
> Suggestions module for a campsite page on a camp spot rental website. Created for a Front-End Capstone project at Hack Reactor.

## Related Projects

  - https://github.com/teamName/nick-navbar
  - https://github.com/teamName/nick-reviews
  - https://github.com/Go-Tim/overview-2
  - https://github.com/Go-Tim/tim-suggestions

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### Database
1. Rename ```database/passwordExample.js``` into ```database/password.js```, and insert your local MySQL database password.
2. Set up a mysql database called 'timcamp', run $ ```npm run schema```
3. Run the seed file from the command line while in the root directory, run $ ```npm run seed```


## CRUD API using REST

| CRUD   | REST   | PATH     | DATA TO PASS                                                                                                                                                                                                                                                                                                                                                                                                          |
|--------|--------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CREATE | POST   | /one     | Name (STRING)<br />Property (STRING)<br />State (STRING)<br />Responses (Number)<br />Rating (Number)<br />Image (STRING)<br />Map (STRING)<br /> |
| READ   | GET    | /one/:id |                                                                                                                                                                                                                                                                                                                                                                                                                       |
| UPDATE | PUT    | /one/:id | ```<name of data column you want to change>: <new data>```                                                                                                                                                                                                                                                                                                                                                                  |
| DELETE | DELETE | /one/:id |                                                                                                                                                                                                                                                                                                                                                                                                                       |