<template>
  <div class="content">
    <h1>封神·世界 (fengshen.world)</h1>
    <p>这是一个使用 Vue 3 和 Vite 搭建的前端项目仓库，已配置用于 Cloudflare Pages 自动构建与部署。</p>

    <h2>项目演示（UI 预览）</h2>
    <div class="preview-images">
      <img :src="img1" alt="fengshen UI 1" />
      <img :src="img2" alt="fengshen UI 2" />
    </div>

    <h2>主要特性</h2>
    <ul>
      <li>使用 Vue 3 + Vite，快速的本地开发体验</li>
      <li>支持 Cloudflare Pages 自动构建与部署</li>
    </ul>

    <h2>快速开始</h2>
    <ol>
      <li>
        <p>克隆仓库并进入目录：</p>
        <pre><code>git clone &lt;your-repo-url&gt;
cd fengshen</code></pre>
      </li>
      <li>
        <p>安装依赖：</p>
        <pre><code>npm install</code></pre>
      </li>
      <li>
        <p>本地开发：</p>
        <pre><code>npm run dev
# 打开浏览器访问 Vite 提示的地址（通常是 http://localhost:5173）</code></pre>
      </li>
      <li>
        <p>生产构建：</p>
        <pre><code>npm run build</code></pre>
      </li>
    </ol>

    <h2>Cloudflare Pages 部署（已配置）</h2>
    <ul>
      <li>在 Pages 项目设置中设置：
        <ul>
          <li>构建命令（Build command）： <code>npm run build</code></li>
          <li>输出目录（Publish directory）： <code>dist</code></li>
          <li>确保仓库包含 <code>package.json</code> 和 lockfile（推荐）</li>
        </ul>
      </li>
      <li>如果使用 Vue Router 的 history 模式，请开启 Pages 的「SPA 回退 / rewrite to index.html」。</li>
      <li>如需在构建时使用环境变量，请在 Pages 的环境变量设置中添加相应的键值对。</li>
    </ul>

    <h2>项目结构（简要）</h2>
    <pre><code>.
├─ index.html           # Vite 入口模版
├─ package.json
├─ vite.config.js
├─ src/
│  ├─ main.js           # Vue 入口
│  ├─ App.vue           # 主组件
│  ├─ styles.css
│  └─ assets/
│     └─ img/
│        ├─ ui/            # UI 界面相关图片
│        ├─ characters/    # 角色图片
│        ├─ artifacts/     # 法宝图片
│        ├─ stories/       # 故事插图
│        └─ others/        # 其他图片</code></pre>

    <h2>贡献指南</h2>
    <ul>
      <li>欢迎提交 Issues 或 Pull Requests。请在 PR 中清晰描述你的变更目的与影响。</li>
      <li>提交前请确保本地构建通过：<code>npm run build</code>。</li>
    </ul>

    <h2>许可证</h2>
    <p>此仓库默认未指定具体开源许可证。若你希望公开共享，请添加如 MIT、Apache-2.0 等许可证文件（<code>LICENSE</code>）。</p>

    <h2>作者</h2>
    <p>fengshen.world by rzx.me</p>

    <h2>图片优化建议</h2>
    <ul>
      <li>压缩图片：使用工具（例如 <code>imagemin</code>、<code>sharp</code> 或在线服务）把 PNG/JPG 减小体积。</li>
      <li>生成 WebP：WebP 在体积上通常优于 PNG/JPEG，可同时保留一份原始格式作为回退。示例（使用 sharp）：</li>
    </ul>
    <pre><code>// node 脚本示例：convert.js
import sharp from 'sharp'
await sharp('src/assets/img/ui/fengshen-UI-02.png')
	.resize(1200)
	.webp({ quality: 80 })
	.toFile('src/assets/img/ui/fengshen-UI-02.webp')</code></pre>
    <ul>
      <li>自动化（npm script）：在 <code>package.json</code> 中添加脚本，或在 CI 中运行图片压缩步骤。</li>
    </ul>
  </div>
</template>

<script>
import img1 from '@/assets/img/ui/fengshen-UI-screenshot-demo01.png'
import img2 from '@/assets/img/ui/fengshen-UI-screenshot-demo02.png'

export default {
  name: 'Home',
  data() {
    return { img1, img2 }
  }
}
</script>

<style scoped>
.preview-images {
  display: flex;           /* 开启弹性布局，让子元素排成一行 */
  gap: 20px;               /* 图片之间的间距 */
  justify-content: center; /* 居中显示 */
  margin-bottom: 20px;
}

.preview-images img {
  max-width: 45%;          /* 限制图片宽度，留出空间给间距 */
  border-radius: 6px;
  height: auto;            /* 高度自动，保持比例 */
  display: block;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* 加一点点阴影更好看 */
}
pre {
  background: #f4f4f4;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
}
code {
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
}
</style>
