import request from '../utils/request'
import router from 'umi/router';
import styles from './story.css';


export default class App extends React.Component {
  state = {
    data: [],
    menus: []
  }
  componentDidMount() {
    request('/story/sjy').then(res => {
      this.setState({
        menus: res.data
      })
    })
  }
  onDetail = (href) => {
    router.push({
      pathname: '/chapter',
      query: {
        href
      }
    });
  }
  render() {
    const { menus } = this.state
    return <div className='stor'>
      {
        menus.map(item => {
          return <div className={styles.item} onClick={() => this.onDetail(item.href)} key={item.href}>
            <div>{item.title}</div>
          </div>
        })
      }
      <div id='bottom'></div>
    </div>
  }
}
