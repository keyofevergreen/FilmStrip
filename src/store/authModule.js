export const authModule = {
  state: () => ({
    authModalVisible: false,
    authAccount: localStorage.authUser ? JSON.parse(localStorage.authUser) : null,
  }),
  mutations: {
    setAuthModalVisible(state, bool) {
      state.authModalVisible = bool;
    },
    setAuthAccount(state, account) {
      state.authAccount = account;
      localStorage.setItem('authUser', JSON.stringify(account));
    },
    clearAuthAccount(state) {
      state.authAccount = null;
    },
    updateTicketsHistory(state, updatedAccount) {
      state.authAccount = updatedAccount;
      localStorage.setItem('authUser', JSON.stringify(updatedAccount));
    }
  },
}