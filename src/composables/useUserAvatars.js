
import { _internalUseAvatarUrl as _internalUseAvatarUrl } from './useAvatarUrl';

/**
 * ユーザーID配列を元にアバターURLのマップ（userId => Ref<string>）を返す。
 * @returns {Object<string, Ref<string>>}
 */
export function useUserAvatars(userIds) {
  const avatarMap = {};
  userIds.forEach(userId => {
    avatarMap[userId] = _internalUseAvatarUrl(userId);
  });
  return avatarMap;
}