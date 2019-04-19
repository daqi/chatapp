

[![Serverless Components](https://s3.amazonaws.com/assets.github.serverless/readme-serverless-realtime-application-1.png)](http://serverless.com)

&nbsp;

Deploy a Full-Stack Realtime App in seconds using [Serverless Components](https://github.com/serverless/components). Just provide your frontend code (powered by the [website component](https://github.com/serverless-components/Website)), and your backend code (powered by the [socket component](https://github.com/serverless-components/Socket)).

Great use-cases for this project are: **Chat Apps**, **Bots**, **Notification Systems**, **Charting Dashboards**, **Stock Tickers** & more.  As always, consider a serverless stack like this if you are looking to deliver software or features with extremely low overhead.

&nbsp;

1. [Install](#1-install)
2. [Create](#2-create)
3. [Configure](#3-configure)
4. [Deploy](#4-deploy)
5. [Example](#5-example)
6. [Pricing](#6-pricing)

&nbsp;


### 1. Install

```console
$ npm install -g @serverless/components
```

### 2. Create

```console
$ mkdir my-realtime-app && cd my-realtime-app
```

the directory should look something like this:


```
|- backend
  |- socket.js
|- frontend
  |- index.html
|- serverless.yml
|- .env      # your development AWS api keys
|- .env.prod # your production AWS api keys

```

the `.env` files are not required if you have the aws keys set globally and you want to use a single stage, but they should look like this.

```
AWS_ACCESS_KEY_ID=XXX
AWS_SECRET_ACCESS_KEY=XXX
```

the `socket.js` file should minimally look something like this:

```js
on('default', async (data, socket) => {
  socket.send(data)
})

```

For more info on working with the `socket.js` file, check out the [socket component docs](https://github.com/serverless-components/socket).

To see a full example of an application built with this, [check out this Chat Application](https://github.com/serverless-components/RealtimeApp/tree/master/example).

### 3. Configure

```yml
# serverless.yml

name: my-realtime-app
stage: dev

RealtimeApp:
  component: "@serverless/realtime-app"
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
        # path to the directory that contains your frontend code
        # if you're using a framework like React, that would be the root of your frontend project, otherwise it'd be where index.html lives.
        # default is './frontend'
        code: ./static
        
        # if your website needs to be built (e.g. using React)...
        # default is "undefined"
        build:
        
          # the path to the build directory. default is ./build
          dir: ./dist
          
          # the build command
          command: npm run build # this is the default anyway!
          
          # you can provide an env file path (relative to the code path above) to be generated for use by your frontend code. By default it's './src/env.js'
          envFile: ./frontend/src/env.js
          
          # the contents of this env file
          # the backend api url will be injected by default
          # under the "urlWebsocketApi" key
          env:
            SOME_API_URL: https://api.com
```

### 4. Deploy

```console
realtime-app (master)$ ️components

  RealtimeApp › outputs:
  frontend: 
    url:  'http://realtimeapp-lwmb8jd.s3-website-us-east-1.amazonaws.com'
    env:  undefined
  backend: 
    url:  'wss://rzrqzb6z4h.execute-api.us-east-1.amazonaws.com/dev/'
    env:  []


  14s › dev › RealtimeApp › done

realtime-app (master)$

```

### 5. Example

You can see [a full Chat Application that uses this Component in the example folder](https://github.com/serverless-components/realtime-app/tree/master/example).  It leverages AWS DynamoDB to maintain state of who is connected, so that messages can be sent out to the appropriate connection IDs.

You can also see how this Component can be used programmatically in the [Chat App Component's source code](https://github.com/serverless-components/chat-app/blob/master/serverless.js).

### 6. Pricing

**AWS API Gateway Websockets Pricing**
https://aws.amazon.com/api-gateway/pricing/#WebSocket_APIs

**AWS Lambda Pricing**
https://aws.amazon.com/lambda/pricing/

&nbsp;

### New to Components?

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
