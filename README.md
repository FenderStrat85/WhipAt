# WhipAt

## About the Project

WhipAt is an app designed to connect people who are passionate about cars and car racing. Users can arrange car meets, invite friends and expand their network of fellow car-enthusiasts.

## Contributors
- [Adriano Gonzalez Alberto](https://www.linkedin.com/in/adriano-gonzalez-alberto/)
- [Richard Barnes](https://www.linkedin.com/in/richard-barnes-cmgr/)
- [Tom Macfie](https://www.linkedin.com/in/tom-macfie/)

## Technologies

The technologies we used to build this app:

### Frontend

[React](https://reactjs.org/), [Google Maps API](https://developers.google.com/maps)

### Backend

[PostgreSQL](https://www.postgresql.org/), [Sequelize](https://sequelize.org/), [NodeJs](https://nodejs.org/en/), [Express](http://expressjs.com/)

### Others

[Express-sessions](https://www.npmjs.com/package/express-session), 

## Screenshots
<img width="376" alt="whipat-login" src="https://user-images.githubusercontent.com/70334875/138559191-bf771a33-9413-465f-92c7-c7e70d768d19.png">
<img width="373" alt="whipat-dashboard" src="https://user-images.githubusercontent.com/70334875/138559194-dd7a51e6-ded3-4b7d-a879-add0e7c242c4.png">
<img width="373" alt="whipat-create-meet" src="https://user-images.githubusercontent.com/70334875/138559276-88a7185f-38f7-4192-a720-1938ceaacbce.png">




## Getting Started

There's a few things you need to do to get started:

### Prerequsites

- npm

```
npm install npm@latest -g
```

- API Keys

  - Google Maps API key

- Database

You will need to create a Postgres database. You can set the name and password of this database in the servers environment variables as shown in the .env.example file

1. Clone this repo

2. `whipat/client % npm install`

3. `whipat/server % npm install`

4. Create `server/.env` using `server/.env.example` as a template

5. Create `client/.env` using `client/.env.example` as a template

### BackEnd

The following command will start up the backend server

```
whipat/server npx nodemon
```

### FrontEnd

```
transl8r/client % npm start
```
