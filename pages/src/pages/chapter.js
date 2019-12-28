import { useState, useEffect } from 'react';
import request from '../utils/request';
import styles from './chapter.css';

export default function (props) {
  const [html, setHtml] = useState('加载中。。。');
  const { href } = props.location.query
  // 类似于componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    request('/story/chapter', {
      data: {
        href: encodeURIComponent(href)
      }
    }).then(res => {
      setHtml(res.data)
    })
  });
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>天降我才必有用</h1>
      <div dangerouslySetInnerHTML={{ __html: html}} className={styles.content}></div>
    </div>
  );
}
