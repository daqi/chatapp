/*
 * Component – RealtimeApp
 */

const { Component } = require('@serverless/components')

/*
 * Get Config
 * - Merges configuration with defaults
 */

const getConfig = (inputs) => {
  const config = {
    name: inputs.name || 'realtimeApp',
    description: inputs.description || 'Realtime App',
    region: inputs.region || 'us-east-1',
    frontend: {
      code:
        typeof inputs.frontend === 'object' && inputs.frontend.code
          ? inputs.frontend.code
          : './frontend',
      build:
        typeof inputs.frontend === 'object' && inputs.frontend.build
          ? inputs.frontend.build
          : undefined
    },
    backend: {
      code:
        typeof inputs.backend === 'object' && inputs.backend.code
          ? inputs.backend.code
          : './backend',
      memory: 512,
      timeout: 10,
      env: {}
    }
  }

  config.backend.name = config.name
  config.backend.description = config.description
  config.backend.region = config.region
  config.frontend.name = config.name
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
    this.ui.status('Deploying')
    inputs = inputs || {}
    // Get config from inputs and defaults
    if (!inputs.name) {
      inputs.name = this.constructor.name
    }
    const config = getConfig(inputs)

    const website = await this.load('@serverless/website')
    const socket = await this.load('@serverless/socket')

    const socketOutputs = await socket(config.backend)

    if (typeof config.frontend.build === 'object') {
      config.frontend.build.env = {
        urlWebsocketApi: socketOutputs.url, // pass backend url to frontend
        ...(config.frontend.build.env || {})
      }
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
        env: socketOutputs.code.env
      }
    }

    this.ui.log()
    this.ui.output('frontend url', `${outputs.frontend.url}`)
    this.ui.output('backend url', ` ${outputs.backend.url}`)

    return outputs
  }

  /*
   * Remove
   */

  async remove() {
    // this remove function just calls remove on the child components
    // it doesn't even need any inputs at all since all is available in children state!
    this.ui.status('Removing')

    const website = await this.load('@serverless/website')
    const socket = await this.load('@serverless/socket')

    await Promise.all([website.remove(), socket.remove()])

    return {}
  }
}

module.exports = RealtimeApp
