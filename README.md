

[![Serverless Components](https://s3.amazonaws.com/assets.github.serverless/readme-serverless-realtime-application-1.png)](http://serverless.com)

&nbsp;

Deploy a Realtime App in seconds using [Serverless Components](https://github.com/serverless/components). Just provide your frontend code (powered by the [webiste component](https://github.com/serverless-components/Website)), and your backend code (powered by the [socket component](https://github.com/serverless-components/Socket)).

&nbsp;

1. [Install Serverless Components](#1-install-serverless-components)
2. [Create App Directory](#2-create-app-directory)
3. [Copy Template](#3-copy-this-template)
4. [Deploy](#4-deploy)

&nbsp;


### 1. Install Serverless Components

```
$ npm install -g @serverless/components
```

### 2. Create App Directory 

```
$ mkdir my-realtime-app
$ cd my-realtime-app
```

the directory should look something like this:


```
|- backend
  |- socket.js
|- frontend
  |- index.html
|- serverless.yml

```

the `socket.js` file should minimally look something like this:

```js
on('default', async (data, socket) => {
  socket.send(data)
})

```

For more info on working with the `socket.js` file, checkout the [Socket Component docs](https://github.com/serverless-components/socket).

### 3. Copy This Template

```yml
# serverless.yml

name: my-realtime-app
stage: dev

RealtimeApp:
  component: @serverless/realtime-app
  inputs:
    name: my-realtime-app
    description: My Realtime App
    region: us-east-1

    # backend config to be passed to the socket component
    backend:
      # path to the backend code that contains the socket.js file
      code: ./backend

      memory: 512
      timeout: 10
      env:
        TABLE_NAME: users

    # frontend config to be passed to the website component
    frontend:

      # path to the frontend directory the contains the index.html file
      path: ./frontend

      # if you're using React, this is the the path to the dist directory
      assets: ./frontend

      # you can provide a frontend env file path to be generated for use by your frontend code
      envFile: ./frontend/src/env.js

      # the contents of this env file
      env:
        API_URL: https://api.com

      # if you're using React, you can provide the build command that would build code from the path dir to the assets dir
      buildCmd: null
```

### 4. Deploy

```
$ components
```

### New to Components?

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
