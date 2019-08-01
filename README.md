

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
$ npm install -g serverless
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
|- .env      # your AWS api keys

```

```
# .env
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

RealtimeApp:
  component: "@serverless/realtime-app"
  inputs:
    # backend config to be passed to the socket component
    backend:
      code:
        root: ./code # The root folder containing the backend code.
        src: dist # The folder within your 'src' directory containing your built artifacts
        hook: npm run build # A hook to build/test/do anything
      memory: 128
      timeout: 10
      env:
        TABLE_NAME: my-table

    # frontend config to be passed to the website component
    frontend:
      code:
        root: ./ # The root folder of your website project.  Defaults to current working directory
        src: ./src # The folder to be uploaded containing your built artifact
        hook: npm run build # A hook to build/test/do anything to your code before uploading
      env: # Environment variables to include in a 'env.js' file with your uploaded code.
        API_URL: https://api.com
    region: us-east-1
```

### 4. Deploy

```console
$ serverless

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
