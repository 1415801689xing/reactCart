/* 复合组件
 * @Author: hehs 
 * @Date: 2019-03-11 12:52:44 
 * @Last Modified by: hehs
 * @Last Modified time: 2019-03-11 14:06:03
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

export default class Composition extends Component {
  render() {
    return (
      <div>
        <WelcomeDialog></WelcomeDialog>
      </div>
    )
  }
}
