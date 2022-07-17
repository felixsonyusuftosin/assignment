
import app from "@src/app"
import http from "http"
import couch from "@src/database/couchdb"
import { createHttpTerminator } from "http-terminator"
import { createTerminus } from "@godaddy/terminus"


const NODE_ENV = process.env.NODE_ENV
const port = process.env.PORT
const host = process.env.HOST

const server = http.createServer(app)

function onSignal() {
  console.log("server is starting cleanup")
  // start cleanup of resource, like databases or file descriptors
}

const onHealthCheck = async () => {
  const dbs = await couch.listDatabases()
  if (!dbs) {
    throw new Error(" database is not initialized")
  }
  console.log(" database is ready and accepting connections ")
  return
}

createTerminus(server, {
  signal: "SIGINT",
  healthChecks: { "/healthcheck": onHealthCheck },
  onSignal,
})

if (NODE_ENV === "production") {
  const httpTerminator = createHttpTerminator({ server })
  setTimeout(() => {
    httpTerminator.terminate()
  }, 1000)
}

server.listen(port, (error, success) => {
  if (error) {
    console.error(`could not start the app ${err}`)
    return
  }
  console.log(`FTS server is running at  ${host}:${port}`)
})

