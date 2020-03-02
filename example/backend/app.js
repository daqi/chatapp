const mongoose = require('mongoose')

// if mongoose model not compiled, create it
if (!global.Connections) {
  mongoose.connect(process.env.mongoConnectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const connSchema = new mongoose.Schema({
    connectionId: String
  })
  global.Connections = mongoose.model('Connection', connSchema)
}

/**
 * Connect
 */

on('connect', async (data, socket) => {
  console.log('connect')

  const conn = new global.Connections({
    connectionId: socket.id
  })

  try {
    const result = await conn.save()
  } catch (error) {
    throw new Error(error)
  }

  // must return 'connected'
  return 'connected'
})

/**
 * Disconnect
 */

on('disconnect', async (data, socket) => {
  console.log('disconnect')

  const params = {
    connectionId: socket.id
  }

  try {
    const result = await global.Connections.deleteOne(params)
    console.log('disconnect', result)
  } catch (error) {
    throw new Error(error)
  }

  // must return 'closed'
  return 'closed'
})

/**
 * Message
 */
on('message', async (data, socket) => {
  if (data !== 'ping') {
    await socket.send(JSON.stringify({ status: 'sending data', data: data }), socket.id)
  }
})

/**
 * Default
 */

on('default', async (data, socket) => {
  console.log('default', socket, data)

  let connectionData
  try {
    connectionData = await global.Connections.find()
  } catch (error) {
    throw new Error(error)
  }

  connectionData.Items.map(async ({ connectionId }) => {
    console.log('sending to: ', connectionId)
    await socket.send(data, connectionId)
  })
})
