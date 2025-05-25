// 非公開の内部モジュールとして使用されます
import { ref } from 'vue';

export function _internalUseAvatarUrl(userId) {
  const avatarUrl = ref('');

  const image = new Image();
  const fallback = '/default-avatar.jpg';

  image.onload = () => {
    avatarUrl.value = image.src;
  };

  image.onerror = () => {
    avatarUrl.value = fallback;
  };

  image.src = `${process.env.VUE_APP_API_HOST_URL}/api/user/avatar/${userId}`;

  return avatarUrl;
}