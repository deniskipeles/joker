import {
    SEND_MESSAGE, SET_SEARCH_BAR, SET_MESSENGER_SEARCH, SET_USER, 
    ADD_TO_BOOKMARK, SET_CHAT_MESSAGES, SET_CHATS,SET_CHAT_USER,INCOMING_MESSAGE,SET_POST,SET_MY_POST,SET_VIEW_POST,SET_USER_ACCOUNT,SET_FETCH_POST,SET_TOP_POST,SET_USERS,SET_REFRESH,SET_FETCH_MY_POST
} from './types'

// eslint-disable-next-line
export default (state, action) => {
    switch(action.type){
        case SET_FETCH_POST:
            return {
                ...state,
                fetchPost: action.payload
            }
        case SET_FETCH_MY_POST:
            return {
                ...state,
                fetchMyPost: action.payload
            }
        case SEND_MESSAGE:
            return {
                ...state,
                messages: action.payload
            }
        case SET_REFRESH:
            return {
                ...state,
                refresh: action.payload
            }
        case INCOMING_MESSAGE:
            return {
                ...state,
                messages: action.payload
            }
        case SET_SEARCH_BAR:
            return {
                ...state,
                searchBar: !state.searchBar,
                messengerSearchList: []
            }
        case SET_MESSENGER_SEARCH:
            return {
                ...state,
                messengerSearchList: action.payload 
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SET_USER_ACCOUNT:
            return {
                ...state,
                account: action.payload
            }
        case SET_CHAT_USER:
            return {
                ...state,
                chatUser: action.payload
            }
        case SET_CHATS:
            return {
                ...state,
                chats: action.payload
            }
        case SET_CHAT_MESSAGES:
            return {
              ...state,
              messages:action.payload
            }
        case SET_MY_POST:
            return {
              ...state,
              myPosts:action.payload
            }
        case SET_POST:
            return {
              ...state,
              posts:action.payload
            }
        case SET_TOP_POST:
            return {
              ...state,
              topPosts:action.payload
            }
        case SET_VIEW_POST:
            return {
              ...state,
              onePost:action.payload
            }
        case ADD_TO_BOOKMARK:
            return {
                ...state,
                bookmarks: action.payload
            }
        default:
            return state
    }
}