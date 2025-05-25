

<template>
  <div class="user-info">
    <div class="avatar-image-wrapper">
      <img v-if="avatarUrl" :src="avatarUrl" alt="ユーザーアイコン" class="avatar-image" />
      <div v-else class="avatar-placeholder-initial">＋</div>
    </div>
    <p class="username">ユーザー名：{{ userName }}</p>
    <div class="profile-actions" v-if="isMyProfile">
      <button class="profile-button" @click="$emit('following')">フォロー：{{ followingCount }}人</button>
      <button class="profile-button" @click="$emit('followers')">フォロワー：{{ followerCount }}人</button>
      <button class="logout-button" @click="$emit('logout')">ログアウト</button>
    </div>
    <button v-else class="follow-button" @click="$emit('toggleFollow')">
      {{ isFollowing ? 'フォロー解除' : 'フォロー' }}
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  avatarUrl: String,
  userName: String,
  isMyProfile: Boolean,
  isFollowing: Boolean,
  followerCount: Number,
  followingCount: Number,
});
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.avatar-image-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #eee;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-placeholder-initial {
  font-size: 32px;
  color: #888;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.username {
  font-size: 1.2em;
  font-weight: bold;
}

.profile-actions {
  display: flex;
  gap: 8px;
}

.profile-button,
.logout-button,
.follow-button {
  background-color: #007acc;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.profile-button:hover,
.follow-button:hover {
  background-color: #005f99;
}

.logout-button {
  background-color: #d9534f;
}

.logout-button:hover {
  background-color: #c9302c;
}
</style>