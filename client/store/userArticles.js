import axios from "axios";

//ACTION TYPES
const GET_USER_ARTICLES = "GET_USER_ARTICLES";

//ACTION CREATORS
//Get all articles for a single user
const _getUserArticles = (articles) => {
    return {
        type: GET_USER_ARTICLES,
        articles
    };
};

//THUNKS
//get all articles for a singlue user
export const getUserArticles = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/userArticles/${id}`);
            dispatch(_getUserArticles(response.data));
        } catch (error) {
            console.log(error);
        }
    };
};

// CREATE A SINGLE ARTICLE
export const createNewArticle = (article, userId, history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`/api/articles`, {
                article,
                userId
            });
            dispatch(_createUserArticle(data));
            history.push("/home");
        } catch (err) {
            console.log("CREATE A NEW ARTICLE ERR:", err);
        }
    };
};

// CREATE A SINGLE Extension ARTICLE
export const createNewExtensionArticle = (url, name, userId, tags ) => {
    let article = {url : url, name:name, tags:[tags.split(',')]}
    return async (dispatch) => {
        try {
            const { data } = await axios.post(
                `https://book-it-web.herokuapp.com/api/articles`,
                {
                    article,
                    userId
                }
            ); // verify and store error details in createFormError redux peroperty
            dispatch(_createUserArticle(data));
        } catch (err) {
            console.log("CREATE A NEW ARTICLE ERR:", err);
        }
    };
};

//get all user tags
export const getExtensionUserArticles = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(
                `https://book-it-web.herokuapp.com/api/userArticles/${id}`
            );
            dispatch(_getUserArticles(data));
        } catch (error) {
            console.log(error);
        }
    };
};

// UPDATE A USER ARTICLE AS READ
export const markUserArticle = (userId, article) => {
    return async (dispatch) => {
        try {
            console.log("UPDATE USER_ID > ", userId);
            console.log("UPDATE ARTICLE > ", article);

            const { data } = await axios.put(`/api/userArticles/${userId}`, {
                article,
                userId
            });
            console.log("THUNK UPDATE DATA > ", data);

            dispatch(_readUserArticle(data));
            // history.push("/home");
        } catch (err) {
            console.log("UPDATE ATICLE ERR:", err);
        }
    };
};

// DELTE USER ARTICLE
export const deleteProduct = (articleId, article) => {
    return async (dispatch) => {
        try {
            // console.log("DELETED DATA USER_ID > ", articleId);
            // console.log("DELETED DATA ARTICLE > ", article);

            const { data } = await axios.delete(
                `/api/userArticles/${articleId}`,
                {
                    article
                }
            );
            console.log("DELETED DATA > ", data);
            dispatch(_deleteUserArticle(data));
            // history.push("/home");
        } catch (err) {
            console.log("DELETE PRODUCTS ERR:", err);
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
