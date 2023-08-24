import styles from './style.module.css';

export default function Tag({
  name,
  color
}) {
  return <>
    <span style={{ color: color, borderColor: color }} className={styles.tag}>
      {name}
    </span>
  </>;
}
