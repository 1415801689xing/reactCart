/* 高阶组件的使用介绍
 * @Author: hehs 
 * @Date: 2019-03-11 14:44:20 
 * @Last Modified by: hehs
 * @Last Modified time: 2019-03-11 15:15:12
 */
import React, { Component } from 'react'


// 高阶组件 函数 传一个组件  返回一个新的组件
const withName = Comp =>{

  // 可以重写组件生命周期
  class NewComponent extends Component {
    componentDidMount = () => {
      console.log('do something');      
    }
    
    render(){
      return(
        <Comp {...this.props} name="高阶组件的使用介绍" />
      )
    }
  }

  return  NewComponent; // props => <Comp {...props} name="高阶组件的使用介绍" />
}


// 高阶组件链式调用
const withLog = Comp => {
  console.log(Comp.name + '渲染了');
  return props => <Comp {...props} />
}

@withLog
@withName
@withLog

// function Kaikeba (props){
//   return(
//     <div>
//       {props.stage} - {props.name}
//     </div>
//   )
// }

class Kaikeba extends Component {
  render(){
    return(
      <div>
        {this.props.stage} - {this.props.name}
      </div>
    )
  }
}

export default  Kaikeba //withLog(withName(Kaikeba)) // 高阶组件链式调用



// class Hoc extends Component {
//   render() {
//     return (
//       <div>
        
//       </div>
//     )
//   }
// }
