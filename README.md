&nbsp;

Deploy a Realtime App in Seconds Using [Serverless Components](https://github.com/serverless/components). Just provide your frontend code (powered by the [webiste component](https://github.com/serverless-components/Website)), and your backend code (powered by the [socket component](https://github.com/serverless-components/Socket)).

&nbsp;

- [Quick Start](#quick-start)
  - [Install Serverless Components](#install-serverless-components)
  - [Create App Directory](#create-app-directory)
  - [Copy Template](#copy-this-template)
  - [Deploy](#deploy)


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
