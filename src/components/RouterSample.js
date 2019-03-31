/* 路由配置 redux-router4.x
 * @Author: hehs 
 * @Date: 2019-03-30 22:01:01 
 * @Last Modified by: hehs
 * @Last Modified time: 2019-03-31 15:40:08
 */
import React, {Component} from 'react';
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom';
import {connect, Provider} from 'react-redux';
import {login} from './../store/user.redux';
import store from '../store';

function App (props) {
  return (
    <div>
      <ul>
        <li>
          <Link to="/home">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/foo">foo</Link>
        </li>
      </ul>
      {/* 路由配置 exact确切匹配 */}
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/about" component={About} /> */}
        <PrivateRoute path="/about" component={About} />
        <Route path="/detail/:course" component={Detail} />
        <Route path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>

    </div>
  );
}

// 路由守卫：定义可以验证的高阶组件
@connect (state => ({isLogin: state.userReducer.isLogin}))
class PrivateRoute extends Component {
  render () {
    console.log(this.props);
    
    return (
      // render和component选项二选一
      // auth接口
      // {...rest}
      (
        <Route
          {...this.props}
          render={props =>
            this.props.isLogin
              ? <Component {...props} />
              : <Redirect
                  to={{
                    pathname: '/login',
                    state: {from: props.location.pathname},
                  }}
                />}
        />
      )
    );
  }
}

// 模拟接口
// const auth = {
//   isLogin: false,
//   login (cb) {
//     this.isLogin = true;
//     setTimeout (cb, 300);
//   },
// };

// 登录组件
@connect (state => ({isLogin: state.userReducer.isLogin}), {
  login,
})
class Login extends Component {
  // state = {isLogin: false};
  // login = () => {
  //   auth.login (() => {
  //     this.setState ({
  //       isLogin: true,
  //     });
  //   });
  // };
  render () {
    console.log(this.props.location);    
    // 回调地址
    
    if (this.props.isLogin) {
      const from = this.props.location.state.from || '/';
      return <Redirect to={from} />;
    }
    return (
      <div>
        <p>请先登录</p>
        <button onClick={this.props.login}>登录</button>
      </div>
    );
  }
}

function NoMatch () {
  return <div>404页面</div>;
}

function Home({location}) {
  console.log ('接收参数', location.state);

  return (
    <div>
      Home
      <ul>
        <li>
          <Link to="/detail/web">Web</Link>
        </li>
        <li>
          <Link to="/detail/python">Python</Link>
        </li>
        <li>
          <Link to="/detail/java">Java</Link>
        </li>
      </ul>
    </div>
  );
}

function Detail({match, history, location}) {
  // matc - 参数获取等路由信息
  // history - 导航
  // location - url定位
  console.log (match, history, location);

  return (
    <div>
      {/* 获取参数 */}
      {match.params.course}
      <button onClick={history.goBack}>后退</button>
      <button
        onClick={() => history.push ({pathname: '/', state: {foo: 'bar'}})}
      >
        回到首页
      </button>
    </div>
  );
}

function About () {
  return (
    <div>
      {/* 显示用户信息和钉钉 */}
      <h2>用户中心</h2>
      <div>
        <Link to="/about/me">个人信息</Link><br />
        <Link to="/about/order">订单</Link>
      </div>
      <Switch>
        <Route path="/about/me" component={() => <div>我的信息</div>} />
        <Route path="/about/order" component={() => <div>我的订单</div>} />
        {/* 重定向 */}
        <Redirect to="/about/me" />
      </Switch>
    </div>
  );
}

function Foo () {
  return <div>Foo</div>;
}

export default class RouterSample extends Component {
  render () {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
  }
}
