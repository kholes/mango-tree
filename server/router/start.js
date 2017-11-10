const express = require('express')
const router  = express.Router()
const app     = require('../app.js');
const mango  = app.treeMango;

router.get('/',(req,res) => {
  let MangoTree = new MangoTree('MangoTree', 1, 2, 8, true)
  let counter     = cron.schedule('*/2 * * * * *',(syurr) => {
    treeMango.grow()
    treeMango.produce()
    treeMango.harvest()
    db.ref('manggo').set({
      dead:'',
      height: treeMango._height,
      age: treeMango._age,
      harvested: treeMango._harvested
    })
    if (treeMango._healthyStatus == false) {
      db.ref('mango').set({
        dead: 'Tree is ded....'
      })
      counter.stop()
    }
  })
})


module.exports = router
