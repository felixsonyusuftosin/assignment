import NodeCouchDb from 'node-couchdb'
import MemcacheNode from 'node-couchdb-plugin-memcached'
 
const host = process.env.COUCHDB_HOST
const protocol = process.env.COUCHDB_PROTOCOL
const user = process.env.COUCHDB_USER
const pass = process.env.COUCHDB_PASS
const port = process.env.COUCHDB_PORT

// node-couchdb instance with Memcached
const couch = new NodeCouchDb({
    cache: new MemcacheNode,
    host,
    protocol,
    port,
    auth: {
      user,
      pass
    }
})
 
export default couch