<template>
  <aside>
    <div
      class="shade"
      @click="$store.commit('switchSidebar')"
    >
    </div>
    <div class="sidebar">
      <div
        class="login"
        v-if="$store.state.user==null"
      >
        <Button @click="logIn">
          Войти
        </Button>
      </div>

      <div
        v-else
        class="logout"
      >
        <img :src="$store.state.user.photoURL" alt="аватар пользователя">
        {{ $store.state.user.displayName }}
        <router-link class="logout_container" :to="{name: 'main'}">
          <Button @click="logOut">
            Выйти из системы
          </Button>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script>
import firebase from 'firebase'

import Button from '../components/Button'

export default {
  components: {
    Button
  },
  methods: {
    logIn() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    },
    logOut() {
      firebase.auth().signOut().then(function() {
        console.log('loggeg out');
      }).catch(function(error) {
        console.log(error);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
aside {
  z-index: 10;
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 300px;
    max-width: 80%;
    z-index: 10;
    background: white;
    display: flex;
    flex-direction: column;
    .logout {
      display: flex;
      flex-direction: column;
      place-items: center;
      img {
        width: 50px;
      }
    }
  }
  .shade {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
}
</style>