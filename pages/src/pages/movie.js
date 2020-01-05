
import styles from './movie.css';
const baseUrl = process.env.NODE_ENV  === 'production'? '': 'http://localhost:3000'
export default function () {
  return (
    <div className={styles.normal}>
      <video controls className={styles.video}>
        <source src={`${baseUrl}/movie/movie.mp4`} type="video/mp4" />
        Your browser does not support the
        <code>video</code> element.
    </video>
    </div>
  );
}
