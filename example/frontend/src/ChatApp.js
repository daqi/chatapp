/*
 * Chat App
 */

import React, { Component } from 'react'
import moment from 'moment'
import logo from './images/logo.png'
import './ChatApp.css'

/*
 * Class – ChatApp
 */

class ChatApp extends Component {
  /*
   * Constructor
   */

  constructor(props) {
    super(props)

    this.wsClient = null
    this.messages = []

    this.state = {
      username:
        'user-' +
        Math.random()
          .toString(36)
          .substring(8),
      messages: []
    }

    // Bind functions
    this.postMessage = this.postMessage.bind(this)
    this.changeUsername = this.changeUsername.bind(this)
  }

  /*
   * Component Did Mount
   */

  componentDidMount() {
    const self = this

    // Establish WebSocket Connection
    this.wsClient = new WebSocket(window.env.urlWebsocketApi)

    // On Connection Established...
    this.wsClient.addEventListener('open', function(event) {
      self.websocketPing()
    })

    // On Event Received...
    this.wsClient.addEventListener('message', function(event) {
      const { data } = JSON.parse(event.data)
      if (data !== 'ping') {
        const jsonObj = self.parseWsData(data)
        jsonObj.timeCreated = moment
          .unix(jsonObj.timeCreated)
          .format('dddd, MMMM Do YYYY @ h:mm:ss a')
          .toLowerCase()
        self.messages.push(jsonObj)
        return self.setState({ messages: self.messages }, self.scrollToBottom)
      }
    })
  }

  /**
   * start ping=-pong
   */
  websocketPing() {
    this.timer = setInterval(() => {
      if (this.wsClient) {
        this.wsClient.send('ping')
      }
    }, 3000)
  }

  /*
   * Scroll To Bottom
   */

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  /*
   * Change Username
   */

  changeUsername(evt) {
    return this.setState({
      username: this.inputUsername.value
    })
  }

  parseWsData(str) {
    const jsonObj = {}
    str.split(';').forEach((item) => {
      const temp = item.split(':')
      jsonObj[temp[0]] = decodeURIComponent(temp[1])
    })
    return jsonObj
  }

  formatWsData(data) {
    const arr = []
    Object.keys(data).forEach((key) => {
      const isObject = typeof data[key] === 'object'
      if (isObject) {
        arr.push(`${key}:${JSON.stringify(data[key])}`)
      } else {
        arr.push(`${key}:${encodeURIComponent(data[key])}`)
      }
    })
    return arr.join(';')
  }

  /*
   * Post Message
   */

  postMessage(evt) {
    evt.preventDefault()

    // Ensure message contains something
    if (!this.inputMessage.value || this.inputMessage.value === '') return

    // Post message
    const data = {
      username: this.state.username,
      message: this.inputMessage.value,
      timeCreated: moment().unix()
    }
    // can only send text type data
    this.wsClient.send(this.formatWsData(data))

    // Clear message input
    this.inputMessage.value = ''
  }

  /*
   * Render
   */

  render() {
    return (
      <div className="ChatApp">
        {/*
         * Navigation
         */}

        <nav
          className="ChatApp-navigation"
          style={{
            backgroundColor: window.env.colorBackground,
            color: window.env.colorInputText
          }}
        >
          <div className="ChatApp-navigation-column-left">
            <img src={window.env.logoUrl || logo} className="ChatApp-logo" alt="logo" />
          </div>

          <div className="ChatApp-navigation-column-right">
            <input
              type="text"
              className="ChatApp-input-username"
              placeholder="enter a username..."
              value={this.state.username}
              onChange={this.changeUsername}
              ref={(el) => (this.inputUsername = el)}
              style={{
                color: window.env.colorInputText
              }}
            />
          </div>
        </nav>

        {/*
         * Messages Container
         */}

        <section className="ChatApp-messages-wrapper" ref={(el) => (this.messagesWrapper = el)}>
          <div className="ChatApp-messages">
            {this.state.messages.map((message, key) => (
              <div className="ChatApp-message-wrapper" key={key}>
                <div className="ChatApp-message-meta">
                  <div className="ChatApp-message-meta-username">{message.username}</div>
                  <div className="ChatApp-message-meta-time">{message.timeCreated}</div>
                </div>

                <div className="ChatApp-message-content">{message.message}</div>
              </div>
            ))}

            <div
              style={{ float: 'left', clear: 'both' }}
              ref={(el) => {
                this.messagesEnd = el
              }}
            ></div>
          </div>
        </section>

        {/*
         * Message Input Field
         */}

        <section
          className="ChatApp-input"
          style={{
            backgroundColor: window.env.colorBackground,
            color: window.env.colorInputText
          }}
        >
          <form className="ChatApp-input-form" onSubmit={this.postMessage}>
            <input
              type="text"
              style={{
                backgroundColor: window.env.colorBackground,
                color: window.env.colorInputText
              }}
              className="ChatApp-input-text"
              placeholder="enter a message..."
              ref={(el) => (this.inputMessage = el)}
            />
          </form>
        </section>
      </div>
    )
  }
}

export default ChatApp
