<template>
  <div id="app">
    <header class="topbar full">
      <div class="topbar-left">
        <router-link to="/" class="logo-link">
          <img class="topbar-logo" src="@/assets/img/ui/fengshen-logo.png" alt="logo" />
        </router-link>
        <span class="topbar-title">fengshen.world</span>
      </div>
      
      <div class="topbar-center">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input placeholder="Search..." />
          <span class="search-shortcut">CTRL + K</span>
        </div>
      </div>

      <div class="topbar-right">
        <button class="icon-btn" title="Edit Page">📝</button>
        <button class="icon-btn" title="User Profile">👤</button>
      </div>
    </header>

    <div class="app-shell">
      <aside class="left-nav">
        <!-- top quick buttons like Wiki.js -->
        <div class="nav-top-buttons">
          <router-link to="/" class="big-btn home" title="Home">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          </router-link>
          <router-link to="/wiki" class="big-btn browse" title="Browse">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
            <span>Browse</span>
          </router-link>
        </div>
        
        <ul class="menu">
          <li v-for="group in menu" :key="group.id">
            <button class="group-title" @click="toggleGroup(group.id)">
              <span>{{ group.title }}</span>
              <svg class="chev" :class="{ 'rotate': openGroups[group.id] }" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>
            <ul class="group-items" v-show="openGroups[group.id]">
              <li v-for="child in group.children" :key="child.path">
                <router-link :to="child.path">
                  <svg class="item-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                  {{ child.title }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        
        <div class="menu-extra">
          <router-link to="/guestbook" class="direct-link">
            <span>💬 留言板</span>
          </router-link>
        </div>
      </aside>

      <div class="main-area">
        <!-- Page Header (Wiki.js style) -->
        <div class="page-header">
          <div class="page-header-inner">
            <div class="header-breadcrumbs">
              <router-link to="/" class="home-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              </router-link>
              <span class="sep">/</span>
              <span v-if="currentGroupTitle">{{ currentGroupTitle }}</span>
              <span v-if="currentGroupTitle" class="sep">/</span>
              <span class="current">{{ currentPageTitle }}</span>
            </div>
            <h1 class="header-title">{{ currentPageTitle }}</h1>
            <div class="header-subtitle">{{ currentPageSubtitle }}</div>
          </div>
        </div>

        <div class="page-body">
          <main class="content">
            <router-view />
          </main>

          <aside class="right-aside">
            <div class="aside-section toc-section">
              <div class="section-title">PAGE CONTENTS</div>
              <ul class="toc-list">
                <li v-for="(item, index) in tocItems" :key="index">
                  <a :href="'#' + item.id" :class="{ active: activeTocId === item.id }" @click.prevent="scrollTo(item.id)">
                    {{ item.text }}
                  </a>
                </li>
                <li v-if="tocItems.length === 0" class="empty-toc">No headings found</li>
              </ul>
            </div>

            <div class="aside-section">
              <div class="section-title">TAGS</div>
              <div class="tags-cloud">
                <span class="tag">guide</span>
                <span class="tag">setup</span>
                <span class="tag">wiki</span>
              </div>
            </div>

            <div class="aside-section">
              <div class="section-title">LAST EDITED BY</div>
              <div class="user-info">
                <div class="avatar">A</div>
                <div class="details">
                  <div class="name">Administrator</div>
                  <div class="time">2 days ago</div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <footer class="site-footer">
          <small>fengshen.world — Wiki 汇总 &amp; 文档集合</small>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import menu from './data/menu.js'

export default {
  name: 'App',
  setup() {
    const menuOpen = ref(false)
    const openGroups = ref({})
    const route = useRoute()

    // initialize open groups based on current location
    onMounted(() => {
      const path = window.location.pathname + (window.location.hash || '')
      menu.forEach(g => {
        const match = g.children.some(c => c.path && path.startsWith(new URL(c.path, window.location.origin).pathname))
        openGroups.value[g.id] = match
      })
      // if nothing matched, open first group by default
      const anyOpen = Object.values(openGroups.value).some(Boolean)
      if (!anyOpen && menu.length) openGroups.value[menu[0].id] = true
    })

    const toggle = () => (menuOpen.value = !menuOpen.value)
    const toggleGroup = (id) => {
      openGroups.value[id] = !openGroups.value[id]
    }

    // Breadcrumb & Title logic
    const currentGroupTitle = computed(() => {
      const path = route.path
      const group = menu.find(g => g.children.some(c => c.path === path))
      return group ? group.title : ''
    })

    const currentPageTitle = computed(() => {
      const path = route.path
      if (path === '/') return 'Home'
      for (const g of menu) {
        const child = g.children.find(c => c.path === path)
        if (child) return child.title
      }
      return 'Unknown Page'
    })

    const currentPageSubtitle = computed(() => {
      // Mock subtitle for now
      return 'Common issues and solutions'
    })

    // TOC Logic
    const tocItems = ref([])
    const activeTocId = ref('')

    const generateTOC = () => {
      // Wait for DOM update
      setTimeout(() => {
        const headings = document.querySelectorAll('.content h1, .content h2, .content h3')
        const items = []
        headings.forEach((h, index) => {
          if (!h.id) h.id = 'heading-' + index
          items.push({
            id: h.id,
            text: h.innerText,
            level: h.tagName.toLowerCase()
          })
        })
        tocItems.value = items
      }, 300)
    }

    const scrollTo = (id) => {
      const el = document.getElementById(id)
      if (el) {
        window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' })
        activeTocId.value = id
      }
    }

    // Watch route change to regenerate TOC
    watch(() => route.path, () => {
      generateTOC()
    })
    onMounted(() => {
      generateTOC()
    })

    return { 
      menuOpen, toggle, openGroups, toggleGroup, menu,
      currentGroupTitle, currentPageTitle, currentPageSubtitle,
      tocItems, activeTocId, scrollTo
    }
  }
}
</script>

<style scoped>
/* Page Header (Wiki.js style) */
.page-header {
  background: #f2f5f8;
  padding: 32px 0;
  border-bottom: 1px solid #e0e5ee;
  margin-bottom: 0;
}
.page-header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  box-sizing: border-box;
}
.header-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #546e7a;
  margin-bottom: 16px;
}
.header-breadcrumbs .home-icon { color: #546e7a; display: flex; }
.header-breadcrumbs .sep { color: #b0bec5; font-size: 0.8rem; }
.header-breadcrumbs .current { font-weight: 600; color: #263238; }

.header-title {
  font-size: 2.2rem;
  font-weight: 300; /* Wiki.js uses lighter weight for big titles */
  color: #263238;
  margin: 0 0 8px 0;
  line-height: 1.2;
}
.header-subtitle {
  font-size: 1rem;
  color: #78909c;
  font-weight: 400;
}

/* Layout shell */
.app-shell { display: flex; min-height: 100vh; padding-top: 64px; }

/* Left navigation (wiki.js-like blue) */
.left-nav { width: 250px; background: #1976d2; color: #fff; padding: 0; box-sizing: border-box; position: fixed; top: 64px; bottom: 0; left: 0; overflow-y: auto; z-index: 900; display: flex; flex-direction: column; }
.menu-extra { padding: 10px 10px; border-top: 1px solid rgba(255,255,255,0.1); margin-top: auto; }
.direct-link { color: #eaf2ff; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 6px; }
.direct-link:hover { background: rgba(255,255,255,0.1); }
.nav-top-buttons { display:flex; gap:10px; padding:16px; background-color: #1565c0; }
.big-btn { display:inline-flex; align-items:center; justify-content: center; gap:8px; background: rgba(255,255,255,0.1); border-radius:4px; padding:8px 12px; color: #fff; text-decoration:none; transition: background 0.2s; flex: 1; }
.big-btn:hover { background: rgba(255,255,255,0.2); }
.big-btn svg { opacity:0.9; }

.left-nav .menu { list-style:none; padding:0; margin:0; }
.left-nav .menu li { margin:0; }
.group-title { display:flex; align-items:center; justify-content:space-between; width:100%; padding: 14px 20px; font-size: 0.95rem; color: rgba(255,255,255,0.9); font-weight: 500; background: transparent; border: none; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s; text-align: left; }
.group-title:hover { background: rgba(0,0,0,0.05); color: #fff; }
.group-title .chev { opacity:0.6; transition: transform 0.2s ease; min-width: 18px; } /* Fixed width to prevent jump */
.group-title .chev.rotate { transform: rotate(90deg); }

.group-items { list-style:none; padding:0; margin:0; background: #1565c0; box-shadow: inset 0 4px 8px rgba(0,0,0,0.1); }
.group-items li { margin:0; }
.group-items a { padding: 10px 20px 10px 44px; font-size: 0.9rem; color: rgba(255,255,255,0.75); display: flex; align-items: center; gap: 10px; text-decoration: none; transition: all 0.2s; border-left: 4px solid transparent; }
.group-items a:hover { background: rgba(255,255,255,0.05); color: #fff; }
.group-items a.router-link-active { background: rgba(255,255,255,0.1); color: #fff; font-weight: 500; border-left-color: #42b983; }
.item-icon { opacity: 0.7; }

/* Main area */
.main-area { flex:1; display:flex; flex-direction:column; margin-left: 250px; min-width: 0; }
.topbar { height:64px; background:#0a0a0a; color:#fff; display:flex; align-items:center; justify-content:space-between; padding:0 20px; position:fixed; top:0; left:0; right:0; z-index:1000 }
.left-spacer { height: 30px }
.topbar .search input { background: #111; border: 1px solid #222; color:#fff; padding:8px 10px; border-radius:20px; width:420px }
.topbar-left { display:flex; align-items:center; gap:12px }
.topbar-logo { width:34px; height:34px; object-fit:cover; border-radius:6px; box-shadow: 0 1px 0 rgba(255,255,255,0.03) }
.topbar-title { font-weight:700; color:#fff; font-size:1.05rem }

.page-body { display:flex; gap:24px; padding:24px 40px; max-width: 1400px; margin: 0 auto; width: 100%; box-sizing: border-box; }
.content { flex:1; background:#fff; padding:0; border-radius:0; box-shadow: none; min-width: 0; /* Prevent flex overflow */ }
.right-aside { width: 280px; position: sticky; top: 80px; align-self: flex-start; display: flex; flex-direction: column; gap: 20px; }
.aside-section { background: #fff; border: 1px solid #e0e5ee; border-radius: 4px; overflow: hidden; }
.section-title { background: #f9fafc; padding: 10px 16px; font-size: 0.75rem; font-weight: 700; color: #90a4ae; letter-spacing: 0.5px; border-bottom: 1px solid #e0e5ee; text-transform: uppercase; }

/* TOC List */
.toc-list { list-style: none; padding: 0; margin: 0; }
.toc-list li { border-bottom: 1px solid #f5f7fa; }
.toc-list li:last-child { border-bottom: none; }
.toc-list a { display: block; padding: 10px 16px; font-size: 0.9rem; color: #546e7a; text-decoration: none; border-left: 3px solid transparent; transition: all 0.2s; }
.toc-list a:hover { background: #f5f7fa; color: #1976d2; }
.toc-list a.active { border-left-color: #1976d2; background: #f0f7ff; color: #1976d2; font-weight: 500; }
.empty-toc { padding: 16px; color: #b0bec5; font-size: 0.9rem; font-style: italic; text-align: center; }

/* Tags */
.tags-cloud { padding: 16px; display: flex; flex-wrap: wrap; gap: 8px; }
.tag { background: #eef2f5; color: #546e7a; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; display: flex; align-items: center; gap: 4px; }
.tag::before { content: '🏷️'; font-size: 0.7rem; opacity: 0.7; }

/* User Info */
.user-info { padding: 16px; display: flex; align-items: center; gap: 12px; }
.avatar { width: 36px; height: 36px; background: #1976d2; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1rem; }
.details .name { font-size: 0.9rem; font-weight: 600; color: #263238; }
.details .time { font-size: 0.8rem; color: #90a4ae; }

.site-footer { text-align:center; padding:18px 8px; color:#777; border-top:1px solid #f0f0f0; margin-top:20px }

/* responsive */
@media (max-width: 900px) {
  .left-nav { display:none }
  .page-body { padding:12px }
  .right-aside { display:none }
}
</style>
