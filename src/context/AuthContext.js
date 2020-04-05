import createDataContext from './createDataContext'
import AuthApi from '../AuthApi'
import BakeSale from '../BackerApi'
import AsyncStorage from '@react-native-community/async-storage'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'Add_ERROR': {
            return { ...state, ErrorMessage: action.payload }
        }
        case 'SIGN_UP': {
            return { ErrorMessage: '', token: action.payload }
        }
        case 'CLEAR_ERROR': {
            return { ...state, ErrorMessage: '' }
        }
        case 'SIGN_OUT': {
            return { token: null, ErrorMessage: '' }
        }
        case 'DEAL_LIST': {
            return { ...state, DealList: action.payload }
        }
        case 'DEAL_DETAIL': {
            return { ...state, DealDetail: action.payload }
        }
        case 'CLEAR_DETAIL': {
            return { ...state, DealDetail: null }
        }
        default:
            return state;
    }
}

const clearErrorMessaage = dispatch => () => {
    dispatch({ type: 'CLEAR_ERROR' })
}

const signUp = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await AuthApi.post('/signup', { email, password })
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({ type: 'SIGN_UP', payload: response.data.token })
            navigate('backerFlow')
        }
        catch (err) {
            dispatch({ type: 'Add_ERROR', payload: err.response.data })
        }
    }
}

const tryLocalSignIn = dispatch => async () => {
    let token = await AsyncStorage.getItem('token')
    if (token) {
        dispatch({ type: 'SIGN_UP', payload: token })
        navigate('backerFlow')
    } else {
        navigate('loginFlow')
    }
}

const signIn = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await AuthApi.post('/signin', { email, password })
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({ type: 'SIGN_UP', payload: response.data.token })
            navigate('backerFlow')
        }
        catch (err) {
            dispatch({ type: 'Add_ERROR', payload: err.response.data.error })
        }
    }
}

const Deals = (dispatch) => {
    return async () => {
        try {
            const response = await BakeSale.get('/api/deals')
            dispatch({ type: 'DEAL_LIST', payload: response.data })
        }
        catch (err) {
            dispatch({ type: 'Add_ERROR', payload: err.response.data.error })
        }
    }
}

const getDealDetail = (dispatch) => {
    return async ({ itemId }) => {
        try {
            const response = await BakeSale.get(`/api/deals/${itemId}`)
            clearDealDetail()
            dispatch({ type: 'DEAL_DETAIL', payload: response.data })
        }
        catch (err) {
            clearDealDetail()
            dispatch({ type: 'Add_ERROR', payload: err.response.data.error })
        }
    }
}

const signOut = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'SIGN_OUT' })
        navigate('loginFlow')
    }
}

const clearDealDetail = dispatch => () => {
    dispatch({ type: 'CLEAR_DETAIL' })
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signUp, signIn, clearErrorMessaage, tryLocalSignIn, signOut, Deals, getDealDetail, clearDealDetail },
    { token: null, ErrorMessage: '', DealList: null, DealDetail: null }
);