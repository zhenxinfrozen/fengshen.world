<template>
  <div class="content">
    <h1>留言板</h1>
    <p>欢迎留下您的足迹！</p>

    <!-- 留言表单 -->
    <div class="guestbook-form">
      <h3>我要留言</h3>
      <div class="form-group">
        <label>昵称：</label>
        <input v-model="newItem.name" type="text" placeholder="请输入您的昵称" />
      </div>
      <div class="form-group">
        <label>内容：</label>
        <textarea v-model="newItem.content" placeholder="说点什么吧..."></textarea>
      </div>
      <button @click="submitMessage" :disabled="isSubmitting">提交留言</button>
    </div>

    <hr />

    <!-- 留言列表 -->
    <div class="guestbook-list">
      <h3>最新留言</h3>
      <div v-if="messages.length === 0" class="empty">暂无留言，快来抢沙发吧！</div>
      <div v-else class="message-card" v-for="(msg, index) in messages" :key="index">
        <div class="msg-header">
          <span class="msg-name">{{ msg.name }}</span>
          <span class="msg-time">{{ msg.time }}</span>
        </div>
        <div class="msg-content">{{ msg.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Guestbook',
  setup() {
    const isSubmitting = ref(false)
    const newItem = ref({ name: '', content: '' })
    const messages = ref([])

    // 获取留言列表
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/guestbook')
        if (res.ok) {
          messages.value = await res.json()
        }
      } catch (err) {
        console.error('获取留言失败:', err)
      }
    }

    onMounted(() => {
      fetchMessages()
    })

    const submitMessage = async () => {
      if (!newItem.value.name || !newItem.value.content) {
        alert('请填写昵称和内容')
        return
      }
      isSubmitting.value = true
      
      try {
        const res = await fetch('/api/guestbook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem.value)
        })

        if (res.ok) {
          await fetchMessages() // 重新获取列表
          newItem.value = { name: '', content: '' } // 清空表单
          alert('留言成功！')
        } else {
          alert('留言失败，请重试')
        }
      } catch (err) {
        console.error(err)
        alert('网络错误')
      } finally {
        isSubmitting.value = false
      }
    }

    return { newItem, messages, submitMessage, isSubmitting }
  }
}
</script>

<style scoped>
.guestbook-form {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.form-group input, .form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.form-group textarea {
  height: 80px;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
}
.message-card {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}
.msg-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 0.9em;
  color: #666;
}
.msg-name {
  font-weight: bold;
  color: #333;
}
</style>