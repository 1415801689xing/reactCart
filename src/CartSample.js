import React, { Component } from 'react'


function Cart(props) {
  return (
    <div>
      <table>
        <tbody>
          {props.data.map(d=>(
            <tr key={d.text}>
              <td>{d.text}</td>
              <td>
                <button>-</button>
                {d.count}
                <button onClick={()=>props.addCount(d)}>+</button>
              </td>
              <td>￥{d.price*d.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default class CartSample extends Component {
  constructor(props){
    super(props);
    this.state = {
      goods: [
        {id:1,text:'web开发工程师',price:888},
        {id:2,text:'java开发工程师',price:999}
      ],
      text: '', // 商品名称
      cart: [],
    }

    // 回调的写法1
    // this.addGood = this.addGood.bind(this);
  }
  // 回调的写法2
  addGood =(e)=> {
    this.setState(prevState=>({
      goods: [...prevState.goods,{id:3,text:prevState.text,price:777}]
    }))
  }

  textChange =(e)=> {
    this.setState({
      text: e.target.value
    })
  }

  addToCart (good){
    const newCart = [...this.state.cart];
    const idx = newCart.findIndex(c=>c.text === good.text)
    const item = newCart[idx];
    if (item) {
      // 添加
      newCart.splice(idx, 1, {...item, count: item.count+1})
    } else {
      newCart.push({...good, count: 1})
    }
    this.setState({
      cart: newCart
    },()=>{})
  }

  // 加数量
  addCount =(item)=> {
    const newCart = [...this.state.cart];
    const idx = newCart.findIndex(c=>c.text === item.text)
    newCart.splice(idx, 1, {...item, count: item.count+1})
    this.setState({
      cart: newCart
    },()=>{})    
  }

  render() {
    const title = this.props.title ? <h1>{this.props.title}</h1>:null
    // 循环：将js对象数组转换为jsx数组
    const goods = this.state.goods.map(good=><li key={good.id}>{good.text}<button onClick={()=>this.addToCart(good)}>加入购物车</button></li>)
    return (
      <div>
        {/* 条件语句 */}
        {
          title
        }
        {/* 添加商品 */}
        <div>
          <input type="text" value={this.state.text} onChange={(e)=>this.textChange(e)} />
          <button onClick={this.addGood}>添加商品</button>
        </div>
        {/* 列表渲染 */}
        <ul>
          {goods}
        </ul>

        {/* 购物车 */}

        <Cart data={this.state.cart} addCount={this.addCount} />

      </div>
    )
  }
}
