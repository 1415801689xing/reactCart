import {call, put, takeEvery} from 'redux-saga/effects'

const api = {
  login(){
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        if(Math.random()>0.5){
          resolve({id:1,name:'xingxing'})
        } else {
          reject('用户名或密码错误')
        }
      }, 1000);
    })
  }
}

// work saga
function* login(action){
  // yield call(api.login, {参数})
  try {
    const result = yield call(api.login);
    yield put({type:'login', result});    
  } catch (error) {
    yield put({type: 'login_failure', message: error.message}) 
  }
}

function* mySaga(){
  yield takeEvery('login_request', login);
}

export default mySaga;