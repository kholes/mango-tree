<template>
  <div class="hello">
    <div class="container">
      <img src="../assets/Mango_Tree.png" v-bind:height="100+height">
      <h1>Age : {{age}}</h1>
      <h1>Harvested : {{harvested}}</h1>
      <h1>Come on Plant</h1>
      <button type="button" name="button" @click="startGrow" class="btn btn-primary">Start Growing</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Tree',
  data () {
    return {
      dead: '',
      height: '',
      age: '',
      harvested: '',
      grow: this.height
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    ...mapActions(['start']),
    getData () {
      this.$db.on('value', (manggo) => {
        this.height = parseInt(manggo.val().height) + 100
        this.age = manggo.val().age
        this.harvested = manggo.val().harvested
      })
    },
    startGrow () {
      this.$db.set({ dead: '', height: '', age: '' })
      this.start()
    }
  }
}
</script>
<style scoped>

</style>
