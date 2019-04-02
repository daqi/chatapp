&nbsp;

Deploy a Realtime App in Seconds Using [Serverless Components](https://github.com/serverless/components). Just provide your frontend code (powered by the [webiste component](https://github.com/serverless-components/Website)), and your backend code (powered by the [socket component](https://github.com/serverless-components/Socket)).

&nbsp;

### 1. Install Serverless Components

```
$ npm install -g @serverless/components
```

### 2. Create App Directory 

```
$ mkdir my-realtime-app
$ cd my-realtime-app
$ touch serverless.yml
```

### 2. Copy This Template

```yml

name: my-realtime-app
stage: dev

RealtimeApp:
  component: @serverless/realtime-app
  inputs:
    name: my-app
    description: My Realtime App
    regoin: us-east-1
  
    # configure your backend
    backend:
      code: ./backend
      memory: 512
      timeout: 10
      env:
        TABLE_NAME: users
        
    # configure your frontend
    frontend:
      path: ./frontend
      assets: ./frontend
      envFile: ./frontend/src/env.js
      env:
        API_URL: https://api.com
      buildCmd: null
```

### 2. Run Components

```
$ components
```
