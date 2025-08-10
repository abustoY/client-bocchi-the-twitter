<template>
  <div>
    <TweetForm />

    <div class="tab-buttons">
      <button :class="{ active: currentTab === 'all' }" @click="selectTab('all')">全て</button>
      <button
        :class="{ active: currentTab === 'following' }"
        :disabled="!authStore.userId"
        @click="selectTab('following')"
      >フォロー中</button>
    </div>

    <TweetContainer v-if="currentTab === 'all'" />

    <TweetContainer
      v-else-if="authStore.userId && currentTab === 'following' && followingReady"
      :filter-user-ids="followingIds"
    />

  </div>
</template>
    
<script setup>
import TweetForm from './TweetForm.vue';
import TweetContainer from './TweetContainer.vue';
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue';

const currentTab = ref('all');
const authStore = useAuthStore();
const followingIds = ref([]);

const followingReady = ref(false);

const selectTab = async (tab) => {
  currentTab.value = tab;
  if (tab !== 'following') return;
  if (!authStore.userId) return; // 未認証なら何もしない（ボタンはdisabledだが二重防止）

  followingReady.value = false;
  try {
    const res = await fetch(`${process.env.VUE_APP_API_HOST_URL}/api/follow/following?userId=${authStore.userId}`, {
      credentials: 'include'
    });
    if (!res.ok) {
      console.error('フォロー中リスト取得失敗:', res.status);
      followingIds.value = [];
      return;
    }
    followingIds.value = await res.json();
  } finally {
    followingReady.value = true;
  }
};
</script>
    
<style scoped>
.tab-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 4px 0;
}

.tab-buttons button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: #ddd;
  cursor: pointer;
}

.tab-buttons button.active {
  background: #007acc;
  color: white;
}
</style>
    