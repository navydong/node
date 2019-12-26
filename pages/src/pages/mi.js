
import React from 'react'
import { ListView } from 'antd-mobile';
import styles from './mi.css';

export default class App extends React.Component {
  constructor(props){
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      data:[],
      dataSource,
    }
  }
  componentDidMount() {
    fetch('http://localhost:3000/api/xiaomi/query').then(response => response.json()).then(res => {
      this.setState({
        data: res.data,
        dataSource: this.state.dataSource.cloneWithRows(res.data),
      })
    })
  }
  onDetail = (href) => {
    window.open('http://m.mcmssc.com' + href + '.html')
  }
  render() {
    const { dataSource, data } = this.state
    const row = function(rowData, sectionID, rowID, highlightRow){
      return <div>
        
      </div>
    }
    return <div>
      <ListView dataSource={dataSource} renderRow={row} />
      {
        data.map(item => {
          return <div key={item.id}><span>{item.title}</span><img src={item.image} /></div>
        })
      }
    </div>
  }
}