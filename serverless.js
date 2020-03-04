const { Component } = require('@serverless/core')

const getConfig = (inputs) => {
  const config = {
    region: inputs.region || 'ap-guangzhou',
    frontend: inputs.frontend,
    backend: inputs.backend
  }

  config.backend.region = config.region
  config.frontend.region = config.region

  return config
}

class ChatApp extends Component {
  async default(inputs = {}) {
    this.context.status('Deploying')
    inputs = inputs || {}
    // Get config from inputs and defaults
    if (!inputs.name) {
      inputs.name = this.constructor.name
    }
    const config = getConfig(inputs)

    const website = await this.load('@serverless/tencent-website')
    const socket = await this.load('@serverless/tencent-websocket')

    const socketOutputs = await socket({
      ...config.backend,
      fromClientRemark: 'serverless-chatapp'
    })

    config.frontend.env = {
      // pass backend url to frontend
      urlWebsocketApi: socketOutputs.url,
      ...(config.frontend.env || {})
    }

    const websiteOutputs = await website({
      ...config.frontend,
      fromClientRemark: 'serverless-chatapp'
    })

    const outputs = {
      frontend: {
        url: websiteOutputs.url,
        env: websiteOutputs.env
      },
      backend: {
        url: socketOutputs.url
      }
    }

    return outputs
  }

  async remove() {
    this.context.status('Removing')

    const website = await this.load('@serverless/tencent-website')
    const socket = await this.load('@serverless/tencent-websocket')

    await Promise.all([website.remove(), socket.remove()])

    return {}
  }
}

module.exports = ChatApp
