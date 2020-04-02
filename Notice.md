# 注意事项

 此文件记录Taro开发过程中的注意事项

 ## 所有JSX写在render函数内，使用函数返回JSX可能会导致报错

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

   // 正确示例   <---------以下为正确✔示例--------->
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