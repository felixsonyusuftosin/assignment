import nano from 'nano'

const host = process.env.COUCHDB_HOST
const protocol = process.env.COUCHDB_PROTOCOL
const user = process.env.COUCHDB_USER
const pass = process.env.COUCHDB_PASS
const port = process.env.COUCHDB_PORT
const connectionString = `${protocol}://${user}:${pass}@${host}:${port}`
const Nano = nano(connectionString)

export default Nano