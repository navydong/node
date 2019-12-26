
import styles from './story.css';

export default class App extends React.Component {
  state = {
    data: [],
    menus: []
  }
  componentDidMount() {
    fetch('http://localhost:3000/story/sjy').then(response => response.json()).then(res => {
      this.setState({
        menus: res.data
      })
    })
  }
  onDetail = (href) => {
    window.open('http://m.mcmssc.com' + href + '.html')
  }
  render() {
    const { menus } = this.state
    return <div>
      {
        menus.map(item => {
          return <div onClick={() => this.onDetail(item.href)} key={item.href}>{item.title}</div>
        })
      }
    </div>
  }
}