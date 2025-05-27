
import { _internalUseAvatarUrl as _internalUseAvatarUrl } from './useAvatarUrl';

// モジュールレベルのキャッシュ
const avatarUrlCache = new Map();

/**
 * ユーザーID配列を元にアバターURLのマップ（userId => Ref<string>）を返す。
 * @returns {Object<string, Ref<string>>}
 */
export function useUserAvatars(userIds) {
  const avatarMap = {};
  userIds.forEach(userId => {
    if (!avatarUrlCache.has(userId)) {
      avatarUrlCache.set(userId, _internalUseAvatarUrl(userId));
    }
    avatarMap[userId] = avatarUrlCache.get(userId);
  });
  return avatarMap;
}