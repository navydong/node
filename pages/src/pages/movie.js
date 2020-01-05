
import styles from './movie.css';

export default function () {
  return (
    <div className={styles.normal}>
      <video controls className={styles.video}>
        <source src="http://localhost:3000/movie/movie.mp4" type="video/mp4" />
        Your browser does not support the
        <code>video</code> element.
    </video>
    </div>
  );
}
