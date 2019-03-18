import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Lifecycle from './Lifecycle'
import CartSample from './CartSample'
// import CommentList from './components/CommentList';
import Composition from './components/Composition';
import Hoc from './components/Hoc';
import ContextSample from './components/ContextSample';
import WrappedHorizontalLoginForm from './components/AntdTest';
import KFormSample from './components/KFormSample';


// ReactDOM.render(<h1>React 真酷</h1>, document.querySelector('#root'))

// ReactDOM.render(<App></App>, document.querySelector('#root'))

// ReactDOM.render(<CommentList></CommentList>, document.querySelector('#root'))

// ReactDOM.render(<Composition></Composition>, document.querySelector('#root'))

// ReactDOM.render( <Hoc stage="React"/>, document.querySelector('#root'))

// ReactDOM.render( <ContextSample></ContextSample>, document.querySelector('#root'))

// ReactDOM.render( <WrappedHorizontalLoginForm />, document.querySelector('#root'))

ReactDOM.render( <KFormSample /> , document.querySelector('#root'))


// ReactDOM.render(<Lifecycle></Lifecycle>, document.querySelector('#root'))

// ReactDOM.render(<CartSample title="React购物车"></CartSample>, document.querySelector('#root'))

// 动态渲染
// let someProp = 'some value'
// function tick () {
//   // ReactDOM.render(<h2>{new Date().toLocaleTimeString()}</h2>, document.querySelector('#root'))  
  
//   ReactDOM.render(<Lifecycle prop={someProp}></Lifecycle>, document.querySelector('#root'))
// }

// setInterval(tick, 1000)
