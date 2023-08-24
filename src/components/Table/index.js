import styles from './style.module.css';

const renderHead = ({ columns={} }) => {
  return (
    <tr className={styles.tr}>
      {Object.keys(columns).map((key) => {
        return <th key={key} className={styles.th}>{columns[key]}</th>
      })}
    </tr>
  );
};

const renderRow = ({ rows=[], columns={}, renderers={} }) => {
  return rows.map((row) => {
    return (<tr key={row.id}>
      {Object.keys(columns).map((key) => {
        return (<td key={`${row.id}-${key}`} className={styles.td}>
          {renderers[key] ? renderers[key]({ row }) : row[key]}
        </td>);
      })}
    </tr>);
  });
};

export default function Table({
  rows=[],
  columns={},
  renderers={}
}) {
  return <>
    <table className={styles.table}>
      <thead className={styles.thead}>
        {renderHead({rows, columns, renderers })}
      </thead>
      <tbody className={styles.tbody}>
        {renderRow({rows, columns, renderers })}
      </tbody>
    </table>
  </>;
}
