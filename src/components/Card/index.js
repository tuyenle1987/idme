import styles from './style.module.css';

export default function Card({
  header, footer, content,
}) {
  return <div role="row" key={Math.random()} className={styles.container}>
    <div role="cell" className={styles.header}>
      {header}
    </div>
    <div role="cell" className={styles.content}>
      {content}
    </div>
    <div role="cell" className={styles.footer}>
      {footer}
    </div>
  </div>;
}
