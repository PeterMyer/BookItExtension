import axios from 'axios';

//ACTION TYPES
const GET_USER_ARTICLES = 'GET_USER_ARTICLES';

//ACTION CREATORS
//Get all articles for a single user
const _getUserArticles = (articles) => {
  return {
    type: GET_USER_ARTICLES,
    articles,
  };
};

//THUNKS

// CREATE A SINGLE Extension ARTICLE
export const createNewExtensionArticle = (url, name, note, userId, tags, token) => {
  return axios.post(`https://bookit-web-app.herokuapp.com/api/articles`, {
    article: { url: url, name: name, note: note, tags: tags },
    userId
  },
  {
    headers: {
        authorization: token
    }
});
};

//get all user tags
export const getExtensionUserArticles = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://bookit-web-app.herokuapp.com/api/userArticles/${id}`
      );
      dispatch(_getUserArticles(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
//Initial State
const initialState = [];

//Reducer
export default function userArticleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ARTICLES:
      return action.articles;
    default:
      return state;
  }
}
