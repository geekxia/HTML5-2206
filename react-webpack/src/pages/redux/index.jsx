import { PureComponent } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    size: state.app.size,
    token: state.user.token
  }
}

const Foo1 = connect(mapStateToProps)(
  (props) => {
   console.log('Foo---props', props)
   return (
     <div>
       <h1>Foo1组件</h1>
     </div>
   )
 }
)

@connect(state=>({
  size: state.app.siz
}))
class Foo2 extends PureComponent {
  render () {
    console.log('Foo2---props', this.props)
    return (
      <h1>Foo2组件</h1>
    )
  }
}

export default () => {
  return (
    <>
      <div>学习Redux</div>
      <Foo1 />
      <Foo2 />
    </>
  )
}
