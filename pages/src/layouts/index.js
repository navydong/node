
import Link from 'umi/link'
import styles from './index.css';

export default function (props) {
  return (
    <div>
      <ul className={styles.menus}>
        <li>
          <Link to="/story">小说</Link>
        </li>
        <li>
          <Link to="/mi">小米</Link>
        </li>
        <li>
          <Link to="/movie">电影</Link>
        </li>
      </ul>
      {
        props.children
      }
    </div>
  )
}