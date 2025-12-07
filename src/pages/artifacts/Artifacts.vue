<template>
  <div class="content">
    <h1>法宝图鉴</h1>
    <p>封神世界中，法宝的威力往往能决定战斗的胜负。</p>

    <div class="artifact-grid">
      <div class="artifact-card">
        <h3>封神榜</h3>
        <p><strong>持有者：</strong> 元始天尊 -> 姜子牙</p>
        <p><strong>描述：</strong> 天书，用于册封三百六十五位正神。凡上榜者，死后魂魄入榜，受天庭驱策。</p>
      </div>
      <div class="artifact-card">
        <h3>打神鞭</h3>
        <p><strong>持有者：</strong> 姜子牙</p>
        <p><strong>描述：</strong> 极品先天灵宝，长三尺六寸五分，有二十一节。专打封神榜上有名之人。</p>
      </div>
      <div class="artifact-card">
        <h3>番天印</h3>
        <p><strong>持有者：</strong> 广成子 -> 殷郊</p>
        <p><strong>描述：</strong> 乃半截不周山炼化而成，专拍脑门，威力无穷，大罗金仙亦难抵挡。</p>
      </div>
      <div class="artifact-card">
        <h3>混天绫 & 乾坤圈</h3>
        <p><strong>持有者：</strong> 哪吒</p>
        <p><strong>描述：</strong> 太乙真人镇洞之宝。红绫护身捆敌，金圈至金至刚，无坚不摧。</p>
      </div>
      <div class="artifact-card">
        <h3>风火轮</h3>
        <p><strong>持有者：</strong> 哪吒</p>
        <p><strong>描述：</strong> 轮中喷火，踏之可日行万里，空战利器。</p>
      </div>
      <div class="artifact-card">
        <h3>定海珠</h3>
        <p><strong>持有者：</strong> 赵公明 -> 燃灯道人</p>
        <p><strong>描述：</strong> 先天灵宝，共二十四颗，攒成一串。散发五色毫光，眩敌灵识，威力巨大。</p>
      </div>
      <div class="artifact-card">
        <h3>金蛟剪</h3>
        <p><strong>持有者：</strong> 三霄娘娘</p>
        <p><strong>描述：</strong> 两条太古阴阳蛟龙化成，头交头如剪，尾交尾如股，一剪两段。</p>
      </div>
      <div class="artifact-card">
        <h3>混元金斗</h3>
        <p><strong>持有者：</strong> 三霄娘娘</p>
        <p><strong>描述：</strong> 极品先天灵宝，内按三才，包藏天地之妙。九曲黄河阵之核心，专削仙人顶上三花。</p>
      </div>
      <div class="artifact-card">
        <h3>诛仙四剑</h3>
        <p><strong>持有者：</strong> 通天教主</p>
        <p><strong>描述：</strong> 诛仙、戮仙、陷仙、绝仙四剑。非铜非铁亦非钢，曾在须弥山下藏。天道第一杀伐至宝。</p>
      </div>
      <div class="artifact-card">
        <h3>山河社稷图</h3>
        <p><strong>持有者：</strong> 女娲娘娘 -> 杨戬(暂用)</p>
        <p><strong>描述：</strong> 内有天地，滋养万物。化生万物，收服梅山七怪之袁洪。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: 'Artifacts' }
</script>

<style scoped>
.artifact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.artifact-card {
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.artifact-card h3 {
  margin-top: 0;
  color: #2c3e50;
}
</style>
