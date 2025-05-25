<template>
    <button @click="toggleFollow" :class="{ following: isFollowing }">
      {{ isFollowing ? 'フォロー中' : 'フォロー' }}
    </button>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const props = defineProps({
    currentUserId: String, // ログイン中ユーザー
    targetUserId: String   // 表示しているユーザー
  });
  
  const isFollowing = ref(false);
  
  const checkFollowingStatus = async () => {
    const res = await fetch(`/api/follow/following?userId=${props.currentUserId}`, { credentials: 'include' });
    const followingList = await res.json();
    isFollowing.value = followingList.includes(props.targetUserId);
  };
  
  const toggleFollow = async () => {
    const url = isFollowing.value ? '/api/follow/unfollow' : '/api/follow/follow';
    await fetch(url + `?userId=${props.targetUserId}&followerId=${props.currentUserId}`, {
      method: 'POST',
      credentials: 'include'
    });
    isFollowing.value = !isFollowing.value;
  };
  
  onMounted(() => {
    if (props.currentUserId !== props.targetUserId) {
      checkFollowingStatus();
    }
  });
  </script>
  
  <style scoped>
  button {
    padding: 6px 12px;
    border-radius: 4px;
    background-color: #007acc;
    color: white;
    border: none;
    cursor: pointer;
  }
  button.following {
    background-color: #aaa;
  }
  </style>