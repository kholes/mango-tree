const express = require('express')
const api = require('firebase')
const cron = require('node-cron')
const cors = require('cors')
const app = express()

app.use(cors())

var config = {
  apiKey: "AIzaSyD9E-06ZS6f2nzWMmaZ6vDORSstZQ4KBDs",
  authDomain: "mangotree-8993e.firebaseapp.com",
  databaseURL: "https://mangotree-8993e.firebaseio.com",
  projectId: "mangotree-8993e",
  storageBucket: "",
  messagingSenderId: "460449869513"
}

const firebaseApp = api.initializeApp(config)
const db = firebaseApp.database()

class FruitTree {
  constructor(name,age,height,fruit,healthy) {
    this._name = name
    this._age = age
    this._height = height
    this._fruits = []
    this._maxHeight = null
    this._healthyStatus = healthy
    this._maxAge = null
    this._harvested = 0
    this._fruitName = null
    this._qty = 0
  }

  getAge() {
    return this._age
  }
  getHeight() {
    return this._height
  }
  getFruits() {
    return this.Fruits
  }
  getHealtyStatus() {
    return this._healthyStatus
  }

  grow() {
    this._age += 1
    if(this._height <= this._maxHeight) {
      let grow = Math.random() * (50)
      this._height += grow
    }
    if(this._age == this._maxAge) {
      this._healthyStatus = false
    }
  }
  produce() {
    let qty = Math.floor(Math.random()*(9-1)+1)
    for (var i = 0; i < qty; i++) {
      if(this._name === 'MangoTree'){
        this._fruitName = new Mango()
      }
      else if(this._name === 'AppleTree'){
        this._fruitName = new Apple()
      }
      else if(this._name === 'PearTree'){
        this._fruitName = new Pear()
      }
      this._fruits.push(this._fruitName)
    }
  }
  harvest() {
      let good = 0
      let bad = 0
      let qty = this._fruits.length
      this._harvested = this._qty + qty
      for(let i=0; i<qty; i++) {
        if(this._fruits[i]._quality == 'good') {
          bad++
        } else {
          good++
        }
      }
      this._harvested += ` (${good} good, ${bad} bad)`
    }
}

class Fruit {
  constructor(){
    this._quality = this.fruitQuality();
  }

  fruitQuality(){
    let rand = Math.floor(Math.random()* 2)
    if(rand == 0){
      return 'good'
    }
    else if(rand == 1){
      return 'bad'
    }
  }

  get name(){
    return this._name
  }
}
class MangoTree extends FruitTree {
  constructor(name,age,height,fruit,healthy) {
    super(name,age,height,fruit,healthy)
    this._maxHeight = 300
    this._maxAge = 20
  }
}
class AppleTree extends FruitTree{
  constructor(name,age,height,fruit,healthy){
    super(name,age,height,fruit,healthy)
    this._maxHeight = 300
    this._maxAge = 10
  }
}

class PearTree extends FruitTree{
  constructor(name,age,height,fruit,healthy){
    super(name,age,height,fruit,healthy)
    this._maxHeight = 300
    this._maxAge = 11
  }
}

class Mango extends Fruit{
  constructor(){
    super()
    this._name = `Mango Fruit`
  }
}

class Apple extends Fruit{
  constructor(){
    super()
    this._name = `Apple Fruit`
  }
}

class Pear extends Fruit{
  constructor(){
    super()
    this._name = `Pear Fruit`
  }
}
class TreeGroove{
  constructor(){
    this.arrTree =[]
  }
  inputTree(name,age,height,fruit,healthy){
    if (name === 'MangoTree'){
      let tree = new MangoTree(name, age, height, fruit, healthy)
      this.arrTree.push(tree)
    }
    else if(name === 'AppleTree'){
      let tree = new AppleTree(name, age, height, fruit, healthy)
      this.arrTree.push(tree)
    }
    else if(name === 'PearTree'){
      let tree = new PearTree(name, age, height, fruit, healthy)
      this.arrTree.push(tree)
    }
  }

  show_ages(){
    for (var i = 0; i < this.arrTree.length; i++) {
      console.log(`\nthis ${this.arrTree[i]._name} age = ${this.arrTree[i]._age} year(s)`)
    }
  }
  show_trees(){
    for(var i = 0; i < this.arrTree.length; i++){
      console.log(`\nTree Name : ${this.arrTree[i]._name}`);
    }
  }
  mature_trees(){
    for (var i = 0; i < this.arrTree.length; i++) {
      if((this.arrTree[i]._healthyStatus != false) && (Number(this.arrTree[i]._harvested[0]) > 0)){
        console.log(`${this.arrTree[i]._name} has Fruit(s)`);
      }
      else{
        console.log(`${this.arrTree[i]._name} doesn't has Fruit(s)`)
      }
    }
  }
  dead_trees(){
    for (var i = 0; i < this.arrTree.length; i++) {
      if(this.arrTree[i]._healthyStatus == false){
        console.log(`${this.arrTree[i]._name} dead`);
      }
      else
      console.log(`${this.arrTree[i]._name} still alive`);
    }
  }

  nextYear(){
    for (var i = 0; i < this.arrTree.length; i++) {
      this.arrTree[i].grow()
      this.arrTree[i].produce()
      this.arrTree[i].harvest()
    }
  }
}

let treeMango = new MangoTree('MangoTree', 1, 2, 8, true)
let treeApple = new AppleTree('AppleTree', 5, 1.5, 10, true)
let treePear  = new PearTree('PearTree', 3, 1.5, 10, true)


app.get('/start',(req,res) => {
  res.send('masuk routing grow')
  treeMango._name = 'MangoTree'
  treeMango._age  = 1
  treeMango._height = 2
  treeMango._qty = 8
  treeMango._healthyStatus = true
  let counter     = cron.schedule('* * * * * *',(syuur) => {
    treeMango.grow()
    treeMango.produce()
    treeMango.harvest()
    db.ref('manggo').set({
      treeRIP:'',
      height: treeMango._height,
      age: treeMango._age,
      harvested: treeMango._harvested
    })

    if (treeMango._healthyStatus == false) {
      db.ref('manggo').set({
        treeRIP: 'Tree is dead.. :('
      })
      counter.stop()
    }
  })
})

app.listen(3000, ()=>{
  console.log('Ready on PORT 3000')
})
module.exports = { app, treeMango }
