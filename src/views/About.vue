<script setup>
import UserCard from './../components/UserCard.vue'
</script>

<template>
  <main>
    <h1>Our team</h1>
    <UserCard
        v-for="item in items"
        v-bind:key="item.id"
        v-bind:firstName="item.first_name"
        v-bind:lastName="item.last_name"
        v-bind:avatar="item.avatar"
      />
      <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data () {
      return {
        loading: false,
        error: null,
        items: [],
      };
  },
  mounted() {
    axios
      .get('https://reqres.in/api/users/')
      .then(response => this.items = response.data.data)
      .catch(error => this.error = error)
      .finally(() => this.loading = false);
  },
};
</script>