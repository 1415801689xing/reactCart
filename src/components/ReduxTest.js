import React, { Component } from 'react'
// import store from './../store'
import {connect} from 'react-redux'
import { add, minus, asyncAdd } from './../store/counter.redux'

@connect(
    state => ({num: state}), // 状态映射
    {
      add,
      minus,
      asyncAdd
    }
)
class ReduxTest extends Component {
  render() {
    return (
      <div>
        {/* <p>{store.getState()}</p> */}
        <p>{this.props.num}</p>
        <div>
            {/* <button onClick={()=>store.dispatch({type:'minus'})}>-</button>
            <button onClick={()=>store.dispatch({type:'add'})}>+</button> */}

            <button onClick={()=>this.props.minus()}>-</button>
            <button onClick={()=>this.props.add()}>+</button>  
            <button onClick={()=>this.props.asyncAdd()}>asyncAdd</button>  

        </div>
      </div>
    )
  }
}

const mapStateToProps = state =>({num: state});
const mapDispathToProps = dispatch =>({
    add: ()=>dispatch({type: 'add'}),
    minus: ()=>dispatch({type: 'minus'})
})

// export default connect(    
//     mapStateToProps,
//     mapDispathToProps
// )(ReduxTest)

export default ReduxTest;

