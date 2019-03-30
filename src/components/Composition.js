/* 复合组件
 * @Author: hehs 
 * @Date: 2019-03-11 12:52:44 
 * @Last Modified by: hehs
 * @Last Modified time: 2019-03-30 15:18:28
 */
import React, { Component } from 'react'
import { Button } from 'antd';

// Dialog 展示组件
function Dialog (props){
  return(
    <div style={{border:`4px solid ${props.color || '#999'}`}}>
      {/* vue中等效的匿名插槽 */}
      {props.children}
      {/* vue中等效的具名插槽 */}
      <div className="footer">
        {props.footer}
      </div>
    </div>
  )
}

function WelcomeDialog(){
  const confirmBtn = <Button onClick={()=>alert('react确实不错')}>确定</Button>
  return(
    <Dialog color="green" footer={confirmBtn}>
      <h1>欢迎光临！</h1>
      <p>感谢使用React!</p>
    </Dialog>
  )
}

// 模拟接口
const api = {
  getUser: ()=>({name:'xingxing', age:'18'})
}

function Fetcher(props){
  let user = api[props.name]();
  return props.children(user);
}

function FileterP(props){
  return(
    <div>
      {/* React.Childre提供若干操作嵌套内容的帮助方法 */}
      {
        React.Children.map(props.children, child=>{
          console.log('child', child); // vdom
          if (child.type != 'p') { // 过滤非p标签
            return;
          }
          return child;
        })
      }
    </div>
  )
}


function RadioGroup(props){
  return(
    <div>
    {
      React.Children.map(props.children, child=>{
        return React.cloneElement(child, {name: props.name})
      })
    }
    </div>
  )
}
 

function Radio({children, ...rest}){
  return(
    <label>
      <input type="radio" {...rest} /> {children}
    </label>
  )
}


export default class Composition extends Component {
  render() {
    return (
      <div>
        <WelcomeDialog/>
        {/* children内容可以是任意表达式 */}
        <Fetcher name='getUser'>
          {
            ({name, age})=>(<p>{name}-{age}</p>)
          }
        </Fetcher>
        {/* 操作children */}
        <FileterP>
          <h3>React</h3>
          <p>react确实不错</p>
          <h3>Vue</h3>
          <p>Vue确实也不错</p>
        </FileterP>
        {/* 编辑children */}
        <RadioGroup name="mvvm">
          <Radio value="vue">vue</Radio>  
          <Radio value="react">react</Radio>  
          <Radio value="angular">angular</Radio>  
        </RadioGroup> 
      </div>
    )
  }
}
