/*
 * Component – RealtimeApp
 */

const { Component } = require('@serverless/core')

/*
 * Get Config
 * - Merges configuration with defaults
 */

const getConfig = (inputs) => {
  const config = {
    region: inputs.region || 'us-east-1',
    frontend: inputs.frontend,
    backend: inputs.backend
  }

  config.backend.region = config.region
  config.frontend.region = config.region

  return config
}

/*
 * Class – RealtimeApp
 */

class RealtimeApp extends Component {
  /*
   * Default
   */

  async default(inputs = {}) {
    this.context.status('Deploying')
    inputs = inputs || {}
    // Get config from inputs and defaults
    if (!inputs.name) {
      inputs.name = this.constructor.name
    }
    const config = getConfig(inputs)

    const website = await this.load('@serverless/website')
    const socket = await this.load('@serverless/backend-socket')

    const socketOutputs = await socket(config.backend)

    config.frontend.env = {
      urlWebsocketApi: socketOutputs.url, // pass backend url to frontend
      ...(config.frontend.env || {})
    }

    const websiteOutputs = await website(config.frontend)

    // this high level component doesn't need to save any state!

    const outputs = {
      frontend: {
        url: websiteOutputs.url,
        env: websiteOutputs.env
      },
      backend: {
        url: socketOutputs.url,
        env: socketOutputs.env
      }
    }

    return outputs
  }

  /*
   * Remove
   */

  async remove() {
    // this remove function just calls remove on the child components
    // it doesn't even need any inputs at all since all is available in children state!
    this.context.status('Removing')

    const website = await this.load('@serverless/website')
    const socket = await this.load('@serverless/backend-socket')

    await Promise.all([website.remove(), socket.remove()])

    return {}
  }
}

module.exports = RealtimeApp
