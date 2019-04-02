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

the `my-realtime-app` directory should look something like this:


```
|- backend
  |- socket.js
|- frontend
  |- index.html
|- serverless.yml

```

### 2. Copy This Template

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

### 2. Run Components

```
$ components
```
