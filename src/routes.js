import Default from './layouts/default.vue'
import IndexPage from './pages/index.vue'

export const routes = [
  { 
    path: '/',
    component: Default,
    children: [
      {
        path: '/one',
        component: IndexPage,
        name: 'one'
      }
    ]
  }
]
