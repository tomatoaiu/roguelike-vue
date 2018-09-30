<template lang="html">
  <div id="parentx">
    <div class="header">
      <h1>Rouguelike-Vue</h1>
    </div>

    <vs-tabs vs-position="left">
      <vs-tab v-for="(item, i) in items" :key="i" :vs-label="item.label">
        <div>
          <component :is="item.component"></component>
        </div>
      </vs-tab>
    </vs-tabs>
  </div>

</template>

<script>
import IndexPage from '../pages/index.vue'
import HalfPage from '../pages/half.vue'
import NDivisionPage from '../pages/n-division.vue'
import OneRoomPage from '../pages/one-room.vue'

export default {
  data:()=>({
    type: 'shadow',
    activeItem: 0,
    items: [
      { component: 'index-page', label: 'Home' },
      { component: 'one-room-page', label: 'One Room' },
      { component: 'half-page', label: 'Half' },
      { component: 'n-division-page', label: 'N Division' },
      { component: 'index-page', label: 'ト' },
      { component: 'index-page', label: '十' },
      { component: 'index-page', label: '□' },
      { component: 'index-page', label: 'Surrounding one road' },
      { component: 'index-page', label: 'No aisle' },
      { component: 'index-page', label: 'one road' }
    ]
  }),
  components: {
    'index-page': IndexPage,
    'half-page': HalfPage,
    'n-division-page': NDivisionPage,
    'one-room-page': OneRoomPage
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  border-bottom: 1px solid #ccc;
}

.header h1 {
  padding: 0.2rem 0.5rem;;
}
</style>
