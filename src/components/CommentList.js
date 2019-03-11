/*  高阶组件memo
 * @Author: hehs 
 * @Date: 2019-03-11 12:52:31 
 * @Last Modified by: hehs
 * @Last Modified time: 2019-03-11 14:44:42
 */
import React, { Component, PureComponent } from 'react'

// shouldComponentUpdate 更新数据

// PureComponent

// class Comment extends PureComponent {
  
//   // shouldComponentUpdate (nextProps, nextState) {
//   //   // 首次不会执行
//   //   if (nextProps.data.body === this.props.data.body && nextProps.data.author === this.props.data.author) {
//   //     return false
//   //   } 
//   //   return true
    
//   // }

    

//   render() {
//     console.log('render');

//     return (
//       <div>
//         <p>{this.props.body}</p>
//         <p>{this.props.author}</p>
//       </div>
//     )
//   }
// }

const Comment = React.memo(({body, author}) => {
  console.log('render');
  
  return (
    <div>
      <p>{body}</p>
      <p>{author}</p>
    </div>
  )
})


export default class CommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
  }
  
  componentDidMount = () => {
    setInterval(() => {
      this.setState({
        comments: [
          {body: 'react is very good', author: 'facebook'},
          {body: 'vue is very good', author: 'youyuxi'},
        ]
      })  
    }, 1000
    );
  }
  

  render() {
    return (
      <div>
        {
          this.state.comments.map((c,i)=>(
            <Comment key={i} {...c}> </Comment>
            // body={c.body} author={c.author}
          ))
        }
      </div>
    )
  }
}
