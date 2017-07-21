export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const BACK_TAB = 'BACK_TAB';
export const CHANGE_LOADING = 'CHANGE_LOADING';

export function setActiveTab(tabId) {
  return {
    type: SET_ACTIVE_TAB,
    tabId,
  };
}
export function backTab() {
  return {
    type: BACK_TAB,
  };
}
export function changeLoading(loading) {
  return {
    type: CHANGE_LOADING,
    loading,
  };
}
