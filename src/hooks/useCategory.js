import { useReducer, useEffect } from 'react';
import { database } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const ACTIONS = {
  SELECT_CATEGORY: 'select-category',
  UPDATE_CATEGORY: 'update-category',
  SET_CHILD_CATEGORIES: 'set-child-categories',
  SET_CHILD_LISTS: 'set-child-lists',
};

export const ROOT_CATEGORY = { title: '>>>', id: null, path: [] };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SELECT_CATEGORY:
      return {
        categoryId: payload.categoryId,
        category: payload.category,
        childCategories: [],
        lists: [],
      };
    case ACTIONS.UPDATE_CATEGORY:
      return {
        ...state,
        category: payload.category,
      };
    case ACTIONS.SET_CHILD_CATEGORIES:
      return {
        ...state,
        childCategories: payload.childCategories,
      };
    case ACTIONS.SET_CHILD_LISTS:
      return {
        ...state,
        lists: payload.lists,
      };
    default:
      return state;
  }
};

export function useCategory(categoryId = null, category = null) {
  const [state, dispatch] = useReducer(reducer, {
    categoryId,
    category,
    childCategories: [],
    lists: [],
  });

  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_CATEGORY, payload: { categoryId, category } });
  }, [categoryId, category]);

  useEffect(() => {
    if (categoryId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_CATEGORY,
        payload: { category: ROOT_CATEGORY },
      });
    }

    database.categories
      .doc(categoryId)
      .get()
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_CATEGORY,
          payload: { category: database.formatDoc(doc) },
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_CATEGORY,
          payload: { category: ROOT_CATEGORY },
        });
      });
  }, [categoryId]);

  useEffect(() => {
    return database.categories
      .where('parentId', '==', categoryId)
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_CATEGORIES,
          payload: { childCategories: snapshot.docs.map(database.formatDoc) },
        });
      });
  }, [categoryId, currentUser]);

  useEffect(() => {
    return database.lists
      .where('categoryId', '==', categoryId)
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_LISTS,
          payload: { lists: snapshot.docs.map(database.formatDoc) },
        });
      });
  }, [categoryId, currentUser]);

  return state;
}
