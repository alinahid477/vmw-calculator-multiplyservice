### NodeJS local developer environment
I do not have npm installed on my computer and do not want to.

There are easier way to get started quickly.

What I can do is:
- Docker is essentially a virtual environment (like VM. It is lighter than VM and can run on VM). So I can use docker to package/containerize an application as well as use as a developement environment too.
- the below command pulls a docker image from dockerhub that has
    - a linux alpine OS
    - with NodeJS insalled -- meaning I have npm command
    - gives me shell access
    - mounts my local directory (the application code folder) to the OS -- So that I can create file using VSCode(editor) running on my machine Or in the virutal dev environment running inside Docker and have access to the files from both places. 
    - binds the virtual dev environment's port () to my machine's local port -- So that I can use chrome browser to access the NodeJS application and see output.
- command is: 

```
docker run --rm -it --name node-docker \
-v $PWD:/home/app -w /home/app \
-e "PORT=5678" -p 8080:5678  \
-u node node:latest /bin/bash
```

- install nodemon: `npm install nodemon`

### Initialize NodeJS application

After running the command I am now in the docker container's linux environment.

The prompt should say something like this: `node@d2fcd06eb29f:/home/app $`

Now let's initiate NodeJS project using: `npm init` (in the docker container).

This will ask a series of question. Essentially all it is doing is create the package.json file.

#### Lets add some optional packages

There are 2 ways to add application dependencies library
- locally
- globally

In this case I will use locally, since I have not installed npm in my machine/computer/laptop and my developmenet envrionment is an ephimeral containerized virtual environment there's no point of installing dependencied globally. TBH, I do not need the depedencies to be available globally hence sharable by other application. This won't be any helpful when we will containerize this nodejs app. So why bother.

There are 2 ways to add dependencies (local to the application context) in a nodejs application
- run npn install commad in the application code directory --- this will auto populate the devDependencies and/or dependencies section in the package.json and install the dependency for our application 
OR/AND
- edit and populate (add/append/delete etc) the devDependencies and dependencies section in the package.json file and run npm install in the code directory. --- this will install/add dependencies libraries following what the way we specified in the package.json

They both do the same thing. In my case I prefer to add it in the package.json file.

** Check the dependencies section in the package.json file and search them in the https://www.npmjs.com/ by name to know more about what they do. Just for the sake of this readme here's a brief of some of the important dependencies:
- prittier: this auto formats my code the way I like it (via .prettierrc file). Very handy to keep the code files look consistent. 
- express: this makes a nodejs application run like a web server (by default nodejs runs as a local application, eg worker) and serve http request/respose. Gives the nodejs application routing ability.
- dotenv: for loading environment variables from .env file. Note: I am using require('dotenv') anywhere in my code because I have used this package in the "dev" script section like `nodemon -r dotenv/config` this tells nodemon to use dotenv in the config/index.js file. This is also because I cannot use a dotenv file in production kubernetes where I will be passing the custom environment variables via configMap kube object.


### Boilerplate:

I usually follow the below structure to my nodejs web server based application
- app: contains codes for running application. This contains further logic based segregation:
    - Routing
    - Controller
    - Since this is a rest application no need for view.
    - since nodejs is natively capable to handling dynamic json no need for model. But can be restrictive using models as well.

- middlewares: I already use my custom http response file to bring in consistency to the response of all nodejs based micronservices, which is essentially a middleware that can be passed through express.

- utilities: contains frequently used functionalities by different controllers etc. Since the app is so simple I decided to write the multiplication logic in the controller itself. But if it were complex enough (fair bit of code) and/or were to be re-used by multiple function points I would have created a utility class / method for it in this section. For now, the utilities only contains how I would like the logs from my application.

- config: contains the config. Handy way to segregate the logic of dev vs prod environment in case it needs to be. Slight amount additional of codes here saves a lot of weird if else scenario scattered through out application codebase. (I learnt it the hard way. This is specially true when application size exceeds a certain amount of number of lines of code and in micro-service implementation situations).

### Run the application

Once you have populated the package.json with necessary dependencies, created boiler plate and written codes implementing application logic (or some of it) it's time to
- install the dependency by running `npm install` --- this will create a node_modules directory where the dependencies will reside (add it to .gitignore) and also create package-lock.json file (add it to .gitignore) so that node or npm can keep track of what versions of the depedencies were installed and if thay need upgrading (as per your package.json) or deleting.

- starting application is live mode `npm run dev` --- since we have specified in our app/config/index.js file that the default environment is development and passing the dotenv which will read envrionment variables from .env file, the application will start as per variables in the app/config/environments/development.js file.

## That's it.
You should able see like below:

```
node@d2fcd06eb29f:/home/app$ npm run dev

> calc-multiplyservice@1.0.0 dev
> nodemon -r dotenv/config --watch src src/index.js

[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node -r dotenv/config src/index.js`
{
  host: '127.0.0.1',
  port: '3000',
  logLevel: 'debug',
  allowedOrigins: [ 'http://localhost', 'https://localhost' ]
}
info: Info message
warn: Warning message
info: Backend started and listening on port 3000

```