# RealtimeApp
A serverless component that provisions a real-time app.

## Usage

### Declarative

```yml

name: my-realtime-app
stage: dev

RealtimeApp@0.1.2::my-realtime-app:
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

### Programatic

```
npm i --save @serverless/realtime-app
```

```js

const app = await this.load('@serverless/realtime-app')


  const inputs = {
    name: 'realtimeApp',
    description: 'Realtime App',
    region: 'us-east-1',
    frontend: {
      path: './frontend',
      assets: './frontend',
      envFile: './frontend/src/env.js',
      env: {},
      buildCmd: null,
      localCmd: null
    },
    backend: {
      code: './backend',
      memory: 512,
      timeout: 10,
      env: {}
    }
  }
  

await app(inputs)

```
