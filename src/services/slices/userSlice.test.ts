import {
  userReducer,
  getUserProfile,
  initialState,
  userLogin,
  logout,
  userRegister,
  updateUserProfile,
  getUserOrders,
  checkUserAuth,
  authChecked
} from './userSlice';

const mockUser = {
  name: 'Жак-ив Кусто',
  email: 'user@yandex.ru'
};

const mockOrders = [
  { id: 1, name: 'Order 1', ingredients: [] },
  { id: 2, name: 'Order 2', ingredients: [] }
];

describe('userSlice', () => {
  it('обработка начального состояния', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('вход пользователя', () => {
    it('обработка состояния pending', () => {
      const action = { type: userLogin.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true });
    });

    it('обработка состояния fulfilled', () => {
      const action = {
        type: userLogin.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isAuth: true,
        user: mockUser,
        loading: false,
        error: null
      });
    });

    it('обработка состояния rejected', () => {
      const action = {
        type: userLogin.rejected.type,
        error: { message: 'Error' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isAuth: false,
        loading: false,
        error: 'Error'
      });
    });
  });

  describe('регистрация пользователя', () => {
    it('обработка состояния fulfilled', () => {
      const action = {
        type: userRegister.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isAuth: true,
        user: mockUser,
        loading: false,
        error: null
      });
    });

    it('обработка состояния  rejected', () => {
      const action = {
        type: userRegister.rejected.type,
        error: { message: 'Error' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isAuthChecked: false,
        user: null,
        loading: false,
        error: 'Error'
      });
    });
  });

  describe('выход пользователя', () => {
    it('обработка состояния  pending', () => {
      const action = { type: logout.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true });
    });

    it('обработка состояния  fulfilled', () => {
      const action = { type: logout.fulfilled.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isAuth: false,
        user: { name: '', email: '' },
        loading: false
      });
    });

    it('обработка состояния rejected', () => {
      const action = {
        type: logout.rejected.type,
        error: { message: 'Error' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: 'Error'
      });
    });
  });

  describe('получение заказов пользователя', () => {
    it('обработка состояния  pending', () => {
      const action = { type: getUserOrders.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true });
    });

    it('обработка состояния  fulfilled', () => {
      const action = {
        type: getUserOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orders: mockOrders,
        loading: false
      });
    });

    it('обработка состояния  rejected', () => {
      const action = {
        type: getUserOrders.rejected.type,
        error: { message: 'Error' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: 'Error'
      });
    });
  });

  describe('получение профиля пользователя', () => {
    it('обработка состояния pending', () => {
      const action = { type: getUserProfile.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true });
    });

    it('обработка состояния  fulfilled', () => {
      const action = {
        type: getUserProfile.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isAuth: true,
        user: mockUser,
        loading: false
      });
    });

    it('обработка состояния rejected', () => {
      const action = {
        type: getUserProfile.rejected.type,
        error: { message: 'Error' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: 'Error'
      });
    });
  });

  describe('обновление профиля пользователя', () => {
    it('обработка состояния  pending', () => {
      const action = { type: updateUserProfile.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true });
    });

    it('обработка состояния  fulfilled', () => {
      const action = {
        type: updateUserProfile.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        user: mockUser,
        loading: false
      });
    });

    it('обработка состояния  rejected', () => {
      const action = {
        type: updateUserProfile.rejected.type,
        error: { message: 'Error' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: 'Error'
      });
    });
  });

  describe('проверка авторизации пользователя', () => {
    it('обработка состояния pending', () => {
      const action = { type: checkUserAuth.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true });
    });

    it('обработка состояния  fulfilled', () => {
      const action = { type: checkUserAuth.fulfilled.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isAuthChecked: true,
        loading: false
      });
    });

    it('обработка состояния rejected', () => {
      const action = {
        type: checkUserAuth.rejected.type,
        error: { message: 'Error' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: 'Error'
      });
    });
  });

  describe('авторизация проверена', () => {
    it('обработка authChecked', () => {
      const action = authChecked();
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isAuthChecked: true,
        loading: false
      });
    });
  });
});
