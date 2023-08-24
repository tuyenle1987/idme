import styles from './style.module.css';

export default function Image({ src, alt, width, height, style }) {
  return <>
    <img
      key={src}
      width={width}
      height={height}
      className={styles.image}
      loading="lazy"
      src={src}
      alt={alt}
      style={style}
    />
  </>;
}
