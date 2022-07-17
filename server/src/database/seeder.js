import couch from "@src/database/couchdb"
import tables from "@src/database/databaseTable.json"

const NODE_ENV = process.env.NODE_ENV

const createTables = async () => {
  const createdTables = Object.keys(tables).map(async (table) => {
    try {
      await couch.createDatabase(table)
      console.log(`created table ${table} `)
      return true
    } catch (error) {
      console.log(`error creating table ${table}: ${error}`)
      return false
    }
  })

  const allResolved = await Promise.all(createdTables)
  if (false in allResolved) {
    console.log(
      "reversing the command to create all tables and rolling back ..."
    )
    await dropAllTables()
    console.log("could not create all DBs")
    return false
  }
  console.log(`\ncreated all tables successfully`)
  return
}

const dropAllTables = async () => {
  if (NODE_ENV === "production") {
    console.log(
      "!!!WARNING \nyou can not automatically drop all production tables , if you want to do this head on the admin portal and manually delete the tables\n "
    )
    return
  }

  const droppedTables = Object.keys(tables).map(async (table) => {
    try {
      await couch.dropDatabase(table)
      console.log(`dropped table ${table} `)
      return true
    } catch (error) {
      console.log(`error dropping table ${table}`)
      return false
    }
  })

  const allResolved = await Promise.all(droppedTables)
  if (false in allResolved) {
    throw new Error("could not drop all DBs")
  }
  console.log(`\ndropped all tables successfully......`)
  return
}

const dropOneTable = async (table) => {
  if (NODE_ENV === "production") {
    console.log(
      "!!!WARNING \nyou can not automatically drop any production tables , if you want to do this head on the admin portal and manually delete the tables\n "
    )
    return
  }
  try {
    await couch.dropDatabase(table)
    console.log(`dropped table ${table} successfully`)
    return
  } catch (error) {
    console.log(`error dropping table ${table}`)
  }
}


module.exports = {
  createTables,
  dropAllTables,
  dropOneTable
}