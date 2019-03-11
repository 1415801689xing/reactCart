/* 组件上下文通信 嵌套
 * @Author: hehs 
 * @Date: 2019-03-11 15:19:55 
 * @Last Modified by: hehs
 * @Last Modified time: 2019-03-11 16:06:19
 */
import React, { Component } from 'react'

// 1. 创建上下文
const Context = React.createContext();

const store = {
  name: 'React-02',
  sayHi (){
    console.log(this.name);
    
  }
};

const withProvider = Comp => props => (
  <Context.Provider value={store}>
    <Comp {...props}></Comp>
  </Context.Provider>
);

const withComsumer = Comp => props => (  
  <Context.Consumer>
    {
      value=> <Comp {...props} value={value}></Comp>
    }      
  </Context.Consumer>
);

@withComsumer
class Inner extends Component {
  render(){
    return(
      <div onClick={()=>this.props.value.sayHi()}>{this.props.value.name}</div>
    )
  }
}

@withProvider
class ContextSample extends Component {
  render() {

    // 第一种写法
    // return (
    //   // <Context.Provider value={store}>
    //     <div>
          
    //       {/* 获取数据 */}
    //       {/* <Context.Consumer> */}
    //         {/* 必须内嵌一个函数 */}
    //         {/* {
    //           value=><div onClick={()=>value.sayHi()}>{value.name}</div>
    //         } */}
    //       {/* </Context.Consumer> */}
          
    //     </div>
    //   // </Context.Provider>
    // )

    return(
      // 第二种写法 装饰器 Provider  Consumer必须配套使用
      <div>        
        <Inner></Inner>
      </div>
    )
  }
}

export default ContextSample