import React, { Component } from 'react'
import logo from './images/logo.png';
import './App.css'

// 函数型组件传递props
function Welcome1(props) {
  return (
    <div>
      Hello,{props.name}
    </div>
  )
}


export default class App extends Component {  
  // 当需要状态时，需要构造函数
  constructor(props) {
    super(props);

    // 初始化状态
    this.state = {
      count: 0,
      date: new Date()
    }
  }

  componentDidMount(){
    this.timer = setInterval(()=>{
      // 更新状态      
      // 注意1： 不能直接改状态
      // this.state.date = new Date(); // 错误

      this.setState({
        date: new Date(),
        count: this.state.count+1
      })      

    }, 1000)

    // 注意2： setState() // 异步的
    this.setState((prevState, prevProps)=>({     
      // 如果取值需依赖state之前的值或属性则需用函数方式更新
      count: prevState.count + 1 , 
      // count: this.state.count+1
    }),()=>{      
      console.log(this.state.count);  
    })  
  }
  
  componentWillUnmount(){
    clearInterval(this.timer);
  }

  formatName(user) {
    return user.firstName + ' ' + user.lastName;  
  }

  render() {
    const name = 'start'
    // jsx本身也是表达式
    const jsx = <p>hello, 你们好</p>
    return (
      <div>
        App组件
        {/* 表达式 */}
        <h1>{name}</h1>
        <p>{this.formatName({firstName:'tom', lastName:'start'})}</p>
        {/* 属性 */}
        <img src={logo} style={{width:100,height:100}} className="img" />
        {/* jsx本身也是表达式 */}
        {jsx}
        {/* 组件的属性传值:传入的属性是只读的-react严格遵循单向数据  */}
        <Welcome1 name="tom"></Welcome1>
        {/* 使用状态 */}
        <p>{this.state.date.toLocaleTimeString()}</p>
      </div>
    )
  }
}
