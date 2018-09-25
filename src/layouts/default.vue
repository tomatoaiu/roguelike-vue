<template lang="html">
  <div id="parentx">
    <div class="header">
      <h1>Rouguelike-Vue</h1>
    </div>
    <router-view name="one" ></router-view>

    <!-- <router-view name="one"></router-view> -->

    <!-- <vs-tabs vs-position="left">
      <vs-tab v-for="(item, i) in items" :key="i" :vs-label="item.label">
        <div>
          <component :is="item.component"></component>
        </div>
      </vs-tab>
    </vs-tabs> -->
    
  </div>
</template>

<script>
import IndexPage from '../pages/index.vue'

export default {
  data:()=>({
    type: 'shadow',
    activeItem: 0,
    items: [
      { component: 'index-page', label: 'One' },
      { component: 'index-page', label: 'Half' },
      { component: 'index-page', label: 'N Division' },
      { component: 'index-page', label: 'ト' },
      { component: 'index-page', label: '十' },
      { component: 'index-page', label: '□' },
      { component: 'index-page', label: 'Surrounding one road' },
      { component: 'index-page', label: 'No aisle' },
      { component: 'index-page', label: 'one road' }
    ]
  }),
  components: {
    'index-page': IndexPage
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
