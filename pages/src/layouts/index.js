
import Link from 'umi/link'
import styles from './index.css';

export default function (props) {
  return (
    <div>
      <ul>
        <li>
          <Link to="/story">小说</Link>
        </li>
        <li>
          <Link to="/mi">小米</Link>
        </li>
      </ul>
      {
        props.children
      }
    </div>
  )
}