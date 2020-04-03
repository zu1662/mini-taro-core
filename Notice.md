# 注意事项（版本：trao 2.0.7）

 此文件记录Taro开发过程中的注意事项

 ## 所有JSX写在render函数内，使用函数返回JSX可能会导致weapp内报错

 ```javascript
 // 错误示例   <---------以下为错误❌示例--------->
  render () {
    return (
      <View>
        <GetList datas='datas'></GetList>
      </View>
    )
  }

  function GetList(props){
    const datas = props.datas
    const listItems = datas.map(data => 
      <View key={data.id}>key={data.name}</View>
    )
    return listItems
  }

   // 正确示例   <---------以下为正确💯示例--------->
   render () {
    const listItems = datas.map(data => 
      <View key={data.id}>key={data.name}</View>
    )
    return (
      <View>
        {listItems}
      </View>
    )
  }
 ```

 ## JSX条件渲染，不要使用三目运算符进行两个JSX值的渲染，weapp可能会出现 `Bad value with message` 错误。

 ```javascript
  // 错误示例   <---------以下为错误❌示例--------->
  render () {
    return (
      {data.length > 0 ? 
        <View className='view1'>
        ....
      </View> :
      <View className='view2'>
        ....
      </View>
      }
    )
  }


  // // 正确示例   <---------以下为正确💯示例--------->
  render () {
    return (
      {data.length > 0 &&
        <View className='view1'>
        ....
      </View> }
      {data.length == 0 &&
        <View className='view2'>
          ....
        </View>
      }
    )
  }
 ```