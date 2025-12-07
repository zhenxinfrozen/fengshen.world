import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Wiki from '../pages/wiki/Wiki.vue'
import Worldview from '../pages/wiki/Worldview.vue'
import Timeline from '../pages/wiki/Timeline.vue'
import Stories from '../pages/stories/Stories.vue'
import Tianming from '../pages/stories/Tianming.vue'
import Muye from '../pages/stories/Muye.vue'
import Characters from '../pages/characters/Characters.vue'
import JiangZiya from '../pages/characters/JiangZiya.vue'
import Daji from '../pages/characters/Daji.vue'
import Artifacts from '../pages/artifacts/Artifacts.vue'
import Guestbook from '../pages/Guestbook.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/wiki', name: 'Wiki', component: Wiki },
  { path: '/wiki/worldview', component: Worldview },
  { path: '/wiki/timeline', component: Timeline },
  { path: '/stories', name: 'Stories', component: Stories },
  { path: '/stories/tianming', component: Tianming },
  { path: '/stories/muye', component: Muye },
  { path: '/characters', name: 'Characters', component: Characters },
  { path: '/characters/jiangziya', component: JiangZiya },
  { path: '/characters/daji', component: Daji },
  { path: '/artifacts', name: 'Artifacts', component: Artifacts },
  { path: '/guestbook', name: 'Guestbook', component: Guestbook }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If navigating to a hash, smooth scroll to it
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    // savedPosition for back/forward
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

export default router
