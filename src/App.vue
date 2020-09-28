<template>
  <div id="app">
    <Header/>
    <Sidebar
      v-if="$store.state.showSidebar"
    />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { db } from './firebase'
import firebase from 'firebase'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.commit('setUser', user)
        db.collection('users').doc(user.uid).set({
          name: user.displayName,
          photoURL: user.photoURL,
          email: user.email
        })
      } else {
        console.log('user changed to', null)
        this.$store.commit('setUser', null)
      }
    });
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #eee;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding-bottom: 5rem;
}
</style>
