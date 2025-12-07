<template>
  <div class="content">
    <h1>主要封神人物</h1>
    <p>封神榜上三百六十五位正神，以及众多肉身成圣的英雄。</p>

    <div class="char-grid">
      <router-link to="/characters/jiangziya" class="char-card">
        <h3>姜子牙</h3>
        <p>封神执行者，西周丞相，执掌打神鞭。</p>
      </router-link>
      <router-link to="/characters/daji" class="char-card">
        <h3>苏妲己</h3>
        <p>千年狐狸精，轩辕坟三妖之首，魅惑纣王。</p>
      </router-link>
      <div class="char-card placeholder">
        <h3>商纣王 (帝辛)</h3>
        <p>商朝末代君主，荒淫无道，最终自焚于鹿台。</p>
      </div>
      <div class="char-card placeholder">
        <h3>姬昌 (周文王)</h3>
        <p>西伯侯，演比亚卦，奠定周朝基业。</p>
      </div>
      <div class="char-card placeholder">
        <h3>哪吒</h3>
        <p>三坛海会大神，脚踏风火轮，手持火尖枪。</p>
      </div>
      <div class="char-card placeholder">
        <h3>杨戬 (二郎神)</h3>
        <p>玉鼎真人弟子，修八九玄功，有七十二变。</p>
      </div>
      <div class="char-card placeholder">
        <h3>申公豹</h3>
        <p>姜子牙师弟，反出阐教，一句“道友请留步”送无数仙人上榜。</p>
      </div>
      <div class="char-card placeholder">
        <h3>闻仲 (闻太师)</h3>
        <p>商朝托孤重臣，截教金灵圣母弟子，额生三眼。</p>
      </div>
      <div class="char-card placeholder">
        <h3>黄飞虎</h3>
        <p>镇国武成王，因妻妹被害反出朝歌，投奔西岐。</p>
      </div>
      <div class="char-card placeholder">
        <h3>赵公明</h3>
        <p>截教外门大弟子，财神爷，持有定海珠。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.char-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.char-card {
  display: block;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}
.char-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.char-card.placeholder {
  background: #f9f9f9;
  color: #999;
  cursor: default;
}
.char-card.placeholder:hover {
  transform: none;
  box-shadow: none;
}
</style>

<script>
export default { name: 'Characters' }
</script>
