import { ListView } from 'antd-mobile';
import request from '../utils/request'
import styles from './mi.css';

function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      data: [],
      dataSource,
      height: document.documentElement.clientHeight - 42,
    }
  }
  componentDidMount() {
    request('/api/xiaomi/query').then(res => {
      this.setState({
        data: res.data,
        dataSource: this.state.dataSource.cloneWithRows(res.data),
      })
    }).catch(err=>console.log(err))
  }
  onDetail = (href) => {
    window.open('http://m.mcmssc.com' + href + '.html')
  }
  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    const { dataSource, data } = this.state
    const row = function (rowData, sectionID, rowID, highlightRow) {
      return <div key={rowID} style={{ padding: '0 15px' }} onClick={()=> location.href = rowData.link}>
        <div
          style={{
            lineHeight: '50px',
            color: '#888',
            fontSize: 18,
            borderBottom: '1px solid #F6F6F6',
          }}
        >{rowData.title}</div>
        <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
          <img style={{ height: '64px', marginRight: '15px' }} src={rowData.image} alt="" />
          <div style={{ lineHeight: 1 }}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.price}</div>
            <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
          </div>
        </div>
      </div>
    }
    return <div>
      <ListView
        dataSource={dataSource}
        renderRow={row}
        renderBodyComponent={() => <MyBody />}
        renderSeparator={separator}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
      />
    </div>
  }
}