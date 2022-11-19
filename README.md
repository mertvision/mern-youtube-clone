## Youtube clone with MERN Stack (React.js, Node.js, Express.js, MongoDB)

1. [Start]()
2. [Project Informations]()
3. [Snapshots]()

## Start

**1. Install Dependencies**

The project contains two basic folders: `client` and `server`. Client is the front end of the application and is written in React.js. Server is the back end of the application and is written in Node.js. To run this project, download it to your computer and open it with a code editor:

![client server](https://user-images.githubusercontent.com/101933251/202870670-44fd96a2-6961-4abe-be8a-a8d84066e01b.JPG)

For both main files in the project folder, you have to go to the terminal and install the NPM dependencies. To do this:

+ `cd client` and then `npm install`

![client](https://user-images.githubusercontent.com/101933251/201527159-3edd9120-8b31-48c5-b0e8-a153c6f0ace0.JPG)

+ `cd server` and then `npm install`

![server](https://user-images.githubusercontent.com/101933251/201527180-7a0260f4-d413-47ae-abbf-28671ea77916.JPG)

**2. Config .env**

Open the `.env` file in the env folder and firstly give it into `MONGO_URL` information. MONGO_URL gets database connect link. Like that:

`MONGO_URL = mydatabaseconnectlinkexample@mongodb`

You should enter other information in the `.env` file for token and password reset operations. You can find this information at the end of this document under the name "env file". But it's not must for now.

**3. Run**

Now, you already installed the NPM dependencies. Now you can run the client and server. 

**Run Client**: Client will run at `localhost:3000`. To run the client, use the commands:

   + `cd client` and then `npm run start`

![client](https://user-images.githubusercontent.com/101933251/201528501-28771b7e-18f0-4d71-bd7e-d658ceb6e47f.jpg)

![react ui](https://user-images.githubusercontent.com/101933251/201528116-ec735d1d-915c-4fa3-9ae7-1c4a6f3afac0.JPG)

**Run Server**: Server will run at `localhost:5000`. To run the server, use the commands:

   + `cd server` and then `npm run start`

![server](https://user-images.githubusercontent.com/101933251/202870980-aa0960ec-6921-4729-a5af-eea189b612d9.jpg)

## Project Informations

The project has two main folders named client and server. Client is React.js. Server is Node.js and Express.js. Server side has got Express server. Express server is loaded in `server` variable:

**Client**

React.js is used here. It has folders named Pages, components and redux. The Components folder holds the components in this application like Topbar. Pages, on the other hand, hold pages such as Home page, video page. Components are rendered in certain parts of the pages. React Router DOM is used for page redirection. Redux Toolkit is used for state management. In components and pages, requests are made to the api addresses written on the server side. If the request results are positive, the incoming results are printed on the screen.

**Server**

Node.js, Express.js and MongoDB is used here. Database schema models were made in the models folder. API endpoints are written in the routes folder. Controller functions for routes are written in the controllers folder. Middlewares for routes are written in the Middlewares folder. In addition to these, there are additional folders such as helpers.

**Database Models**

User, Video, Comment

**Authentication - Authorization**

This project uses JSON Web Token for authentication and authorization. You will receive a token when you log in. That token is sent to the user's browser and stored as a cookie. When you want to reach certain routes, the middleware takes the token from the cookie and decrypts it. If the token is valid, it allows you to use the controller valid for that route.

Note: Your information resolved in the token will be kept in the `req.user` object.

**Routes**

    + `localhost:5000/api/auth/signup`: register (http post method)
    + `/api/auth/signin`: login  (http post method)

    + `localhost:5000/api/users/find/:id`: get a user (http get method)
    + `localhost:5000/api/users/:id`: update an user (http put method)
    + `localhost:5000/api/users/:id`: delete an user (http delete method)
    + `localhost:5000/api/users/sub/:id`: subscribe an user (http put method)
    + `localhost:5000/api/users/unsub/:id`: unsubscribe an user (http put method)
    + `localhost:5000/api/users/like/:videoId`: like a video (http put method)
    + `localhost:5000/api/users/dislike/:videoId`: dislike a video (http put method)
    + `localhost:5000/api/users/uploadProfileImage`: upload profile image (http post method)

    + `localhost:5000/api/videos/find/:id`: get a video (http get method)
    + `localhost:5000/api/videos`: add a video (http post method)
    + `localhost:5000/api/videos/:id`: update a video (http put method)
    + `localhost:5000/api/videos/:id`: delete a video (http delete method)
    + `localhost:5000/api/videos/view/:id`: add view to a video (http put method)
    + `localhost:5000/api/videos/find/byuser/:id`: get a video by user (http get method)
    + `localhost:5000/api/videos/random`: get random videos (http get method)
    + `localhost:5000/api/videos/smallrandom`: get small random videos (http get method)
    + `localhost:5000/api/videos/trend`: get trend videos (http get method)
    + `localhost:5000/api/videos/sub`: get sub videos (http get method)
    + `localhost:5000/api/videos/tags?tags=js`: get tag videos (http get method)
    + `localhost:5000/api/videos/search?q=breaking+bad`: get query videos (http get method)
 
    + `localhost:5000/api/comments/videoId`: get comment by video id (http get method)
    + `localhost:5000/api/comments/`: add comment by video id (http post method)
    + `localhost:5000/api/comments/:id`: delete comment by video id (http delete method)
    

**.env file**

![env jpg](https://user-images.githubusercontent.com/101933251/202870628-da034e3d-611d-4830-82fe-f7dc79755719.JPG)

## Snapshots

+ **Sign Up Page**:

![sign up](https://user-images.githubusercontent.com/101933251/202870586-d8b28a75-f772-4dc1-9891-9f94bda5f575.JPG)

+ **Sign In Page**

![sign in](https://user-images.githubusercontent.com/101933251/202870579-29f81323-3f9c-4147-8efc-9590b98d54c0.JPG)

+ **Home Page**:

![home](https://user-images.githubusercontent.com/101933251/202870552-727f119b-4fe0-493b-85f6-7a5cdb65fad7.JPG)

+ **Home Page as Logged**:

![home auth](https://user-images.githubusercontent.com/101933251/202870572-b1679ac9-09d0-4007-89f2-ed888141783f.JPG)

+ **Video Upload Page**: 

![upload file](https://user-images.githubusercontent.com/101933251/202870603-8d866501-6eb8-4882-96b3-3d119126863a.JPG)

+ **Video Page**:

![video](https://user-images.githubusercontent.com/101933251/202870622-6f169452-2ebd-4ad2-9cb9-1a83a278c492.JPG)

+ **Channel Page**:

![channel page](https://user-images.githubusercontent.com/101933251/202870636-20fad076-a93f-4d3b-b104-8d8927211f76.JPG)

+ **Channel Page as Logged**: 

![auth channel page](https://user-images.githubusercontent.com/101933251/202870651-85b75236-ae89-417c-b5bf-865ca5a6bc82.JPG)
