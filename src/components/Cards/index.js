import styles from './style.module.css';

export default function Cards({ cards }) {
  return <div role="table" className={styles.container}>
    {cards}
  </div>
}
