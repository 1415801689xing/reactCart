/* 表单实践
 * @Author: hehs 
 * @Date: 2019-03-19 21:19:23 
 * @Last Modified by: hehs
 * @Last Modified time: 2019-03-19 21:35:47
 */
import React, { Component } from 'react';
import { Icon } from 'antd';

// hoc:包装用户表单，增加数据管理能力、校验逻辑
function kFormCreate(Comp){ 
  return class extends Comp {
    constructor(props) {
      super(props);
      this.options = {}; // 字段选项设置
      this.state = {
      }; // 各字段的值
    }
  
    // 处理表单项输入事件
    handleChange = e =>{
      const {name, value} = e.target;
      this.setState({
        [name]: value
      }, ()=>{
        // 数值变化后再校验 异步
        this.validateField(name)
      })
    }

    // 表单校验
    validateField = field =>{
      const rules = this.options[field].rules;
      // 只要任何一项失败则失败
      const result = rules.some(rule =>{
        if(rule.required){
          // 仅验证必填项
          if(!this.state[field]){
            // 校验失败
            this.setState({
              [field+'Message']: rule.message
            });
            return true; // 校验失败，返回true
          }
        }
      });
      if(!result){ // 校验成功
        this.setState({
          [field+'Message']: ''
        });
      }
      return !result;
    }

    // 校验所有字段
    validate = cb =>{
      const rets = Object.keys(this.options).map(field => this.validateField(field));
      // 如果校验结果数组中全部为true，则校验成功
      const result = rets.every(v => v === true);
      cb(result);
    }

    getFieldDec = (field, option, InputComp) =>{
      this.options[field] = option;
  
      return (
        <div>
          
          {
            React.cloneElement(InputComp, {
              name: field, // 控件name
              value: this.state[field] || '', // 控件值
              onChange: this.handleChange, // change事件处理
              onFocus: this.handleFocus // 判断控件是否获得焦点
            })
          }
          {/* <InputComp></InputComp> */}
          {/* {
            this.state[field+'Message'] && (
              <p style={{color:'red'}}>{this.state[field+'Message']}</p>
            )
          } */}
        </div>
      )
    }

    // 获取表单的值
    handleFocus = e =>{
      const field = e.target.name
      this.setState({
        [field+'Focus']: true
      })
    }

    // 判断组件是否被用户触发
    isFieldTouched = field => !!this.state[field+'Focus']

    getFieldError = field => this.state[field+'Message']


    render(){
      return(
        <Comp 
        {...this.props} 
        getFieldDec={this.getFieldDec} 
        value={this.state} 
        validate={this.validate}
        isFieldTouched = {this.isFieldTouched}
        getFieldError = {this.getFieldError}

        ></Comp>
      )
    }
  } 
}


class FormItem extends Component {
  render(){
    return(
      <div className='fromItem'>
        {this.props.children}
        {
          this.props.validateStatus === 'error' && (
            <p style={{color:'red'}}>{this.props.help}</p>
          )
        }        
      </div>
    )
  }
}


class KInput extends Component {
  render(){
    return(
      <div>
        {/* 前缀图标 */}
        {this.props.prefix}
        <input {...this.props} />
      </div>
    )
  }
}


@kFormCreate
class KFormSample extends Component {
  onSubmit = ()=>{
    console.log(this.props.value);    
    this.props.validate((isValid)=>{
      if (isValid) {
        alert('校验成功')      
      } else {
        alert('校验失败')
      }

    })
  }
  render() {
    const {getFieldDec, isFieldTouched, getFieldError} = this.props;

    const userNameError = isFieldTouched('uname') && getFieldError('uname');
    const passwordError = isFieldTouched('pwd') && getFieldError('pwd');


    return (
      <div>
        <FormItem 
          validateStatus={userNameError ? 'error': ''}
          help={userNameError || ''}
         >
          {
            getFieldDec('uname',{
              rules:[{
                required: true,
                message: '请填写用户名'
              }]
            }, <KInput type="text" prefix={<Icon type='user'></Icon>} />)
          }
        </FormItem>

        <FormItem
          validateStatus={passwordError ? 'error': ''}
          help={passwordError || ''}
        >
          {
            getFieldDec('pwd',{
              rules:[{
                required: true,
                message: '请填写密码'
              }]
            }, <KInput type="password" prefix={<Icon type="lock"></Icon>} />)
          }
        </FormItem>
        <button onClick={this.onSubmit}>登录</button>
      </div>
    )
  }
}

export default KFormSample
