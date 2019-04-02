&nbsp;

Deploy a Realtime App in Seconds Using [Serverless Components](https://github.com/serverless/components). Just provide your frontend code (powered by the [webiste component](https://github.com/serverless-components/Website)), and your backend code (powered by the [socket component](https://github.com/serverless-components/Socket)).

&nbsp;

- [Quick Start](#quick-start)
  - [Install Serverless Components](#1-install-serverless-components)
  - [Create App Directory](#2-create-app-directory)
  - [Copy Template](#3-copy-this-template)
  - [Deploy](#4-deploy)
- [Inputs](#inputs)
  - [Backend](#backend)
  - [Frontend](#frontend)


&nbsp;

## Quick Start

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

the directory should look something like this:


```
|- backend
  |- socket.js
|- frontend
  |- index.html
|- serverless.yml

```

### 3. Copy This Template

```yml

name: my-realtime-app
stage: dev

RealtimeApp:
  component: @serverless/realtime-app
  inputs:
    name: my-realtime-app
  
    # configure your backend
    backend:
      code: ./backend
      env:
        TABLE_NAME: users
        
    # configure your frontend
    frontend:
      path: ./frontend
```

### 4.Deploy

```
$ components
```

## Inputs

The Realtime App component takes the following inputs:

```yml

name: my-app
description: My Realtime App
regoin: us-east-1

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
