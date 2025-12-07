<template>
  <div class="content">
    <h1>封神时间线</h1>
    <p>记录封神大劫的关键节点。</p>

    <div class="timeline">
      <div class="event">
        <h3>商纣七年</h3>
        <p>纣王女娲宫进香，题诗亵渎圣明，招致女娲娘娘降下招妖幡，三妖入宫。</p>
      </div>
      <div class="event">
        <h3>苏护反商</h3>
        <p>冀州侯苏护因不满纣王暴政及索女，题诗午门“冀州苏护，永不朝商”。妲己入宫。</p>
      </div>
      <div class="event">
        <h3>哪吒出世</h3>
        <p>陈塘关李靖之妻怀胎三年六个月，生下肉球，哪吒降世，太乙真人收徒。</p>
      </div>
      <div class="event">
        <h3>姜子牙下山</h3>
        <p>姜子牙在昆仑山学艺四十载，奉元始天尊之命下山封神，辅佐明主。</p>
      </div>
      <div class="event">
        <h3>文王访贤</h3>
        <p>姬昌渭水河边聘请姜子牙出山，拜为丞相，周室当兴。</p>
      </div>
      <div class="event">
        <h3>武王伐纣</h3>
        <p>孟津会盟，八百诸侯响应，牧野之战一触即发。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: 'Timeline' }
</script>

<style scoped>
.timeline {
  border-left: 2px solid #ddd;
  padding-left: 20px;
  margin-top: 20px;
}
.event {
  margin-bottom: 20px;
  position: relative;
}
.event::before {
  content: '';
  position: absolute;
  left: -26px;
  top: 5px;
  width: 10px;
  height: 10px;
  background: #3eaf7c;
  border-radius: 50%;
}
</style>
