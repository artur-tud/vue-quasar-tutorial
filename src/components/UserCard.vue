<template>
  <div class="item">
    <q-avatar size="100px">
      <img :src="avatar" :alt="imageAltAttr()" />
    </q-avatar>
    <p class="text-overline">{{ firstName }} {{ lastName }}</p>
  </div>
</template>

<script>
export default {
    props: {
        firstName: String,
        lastName: String,
        avatar: String,
    },
    methods: {
        imageAltAttr() {
            return `${this.firstName} ${this.lastName}`;
        },
    },
};
</script>

<style>
.item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    padding: 10px;
}
</style>
