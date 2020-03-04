## chatapp

[Online Demo](https://lfe5nxq-qvopuqp-1300862921.cos-website.ap-guangzhou.myqcloud.com/)

Deploy a Full-Stack Realtime App in seconds using [Serverless Components](https://github.com/serverless/components). Just provide your frontend code (powered by the [website component](https://github.com/serverless-components/tencent-website)), and your backend code (powered by the [socket component](https://github.com/serverless-components/tencent-websocket)).

Great use-cases for this project are: **Chat Apps**, **Bots**, **Notification Systems**, **Charting Dashboards**, **Stock Tickers** & more. As always, consider a serverless stack like this if you are looking to deliver software or features with extremely low overhead.

&nbsp;

1. [Install](#1-install)
2. [Create](#2-create)
3. [Configure](#3-configure)
4. [Deploy](#4-deploy)
5. [Remove](#5-remove)
6. [Example](#6-example)

&nbsp;

Before starting, you should goto [Tencent Cloud Mongodb](https://console.cloud.tencent.com/mongodb) and buy a instance. Then you can get mongodb connection string.

### 1. Install

```console
$ npm install -g serverless
```

### 2. Create

```console
$ mkdir my-realtime-app && cd my-realtime-app
```

the directory should look something like this:

```
|- backend
  |- app.js
|- frontend
  |- index.html
|- serverless.yml
|- .env

```

```.env
# tencent auth
TENCENT_SECRET_ID=123
TENCENT_SECRET_KEY=123

# mongodb connect string
MONGO_CONNECTION=mongodb://xxx:xxx@localhost:27017/chatapp?authSource=admin


# global env
REGION=ap-guangzhou
VPC_ID=vpc-xxx
SUBNET_ID=subnet-xxx
```

the `backend/app.js` file should minimally look something like this:

```js
on('connect', async (data, socket) => {})

on('disconnect', async (data, socket) => {})
```

For more info on working with the `socket.js` file, check out the [socket component docs](https://github.com/serverless-components/tencent-websocket).

To see a full example of an application built with this, [check out this Chat Application](https://github.com/yugasun/chatapp/tree/master/example).

### 3. Configure

```yml
# serverless.yml
myChatApp:
  component: '@yugasun/serverless-chatapp'
  inputs:
    name: my-chat-app
    description: My Chat App
    region: ${env.REGION}

    # backend config to be passed to the socket component
    backend:
      region: ${env.REGION}
      functionName: chatapp
      code: ./backend
      functionConf:
        memorySize: 128
        timeout: 30
        vpcConfig:
          vpcId: ${env.VPC_ID}
          subnetId: ${env.SUBNET_ID}
        environment:
          variables:
            mongoConnectString: ${env.MONGO_CONNECTION}
      apigatewayConf:
        serviceTimeout: 30
        protocols:
          - https

    # frontend config to be passed to the website component
    frontend:
      protocol: https
      code:
        src: build
        root: frontend
        hook: npm run build
        envPath: ./src
```

### 4. Deploy

```console
$ serverless --debug

```

### 5. Remove

```console
$ serverless remove --debug

```

### 6. Example

You can see [a full Chat Application that uses this Component in the example folder](https://github.com/yugasun/chatapp/tree/master/example). It leverages Tencent Cloud Mongodb to maintain state of who is connected, so that messages can be sent out to the appropriate connection IDs.

You can also see how this Component can be used programmatically in the [Chat App Component's source code](https://github.com/yugasun/chatapp/blob/master/serverless.js).

### New to Components?

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
