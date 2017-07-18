export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const BACK_TAB = 'BACK_TAB';

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
