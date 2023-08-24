import { useState, useEffect } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { formatDate } from '../../utils/date';
import formatPrice from '../../utils/formatPrice';
import decodeHtml from '../../utils/decodeHtml';
import Table from '../../components/Table';
import Image from '../../components/Image';
import Tag from '../../components/Tag';
import Label from '../../components/Label';
import Cards from '../../components/Cards';
import Card from '../../components/Card';

import ResponsivePagination from 'react-responsive-pagination';

import { DEFAULT_PAGINATION_PER_PAGE } from '../../config';
import { getPurchaseData } from '../../api';

import styles from './style.module.css';

const colorMapping = {
  technology: 'black',
  shopping: 'green',
  entertainment: 'blue',
  automotive: 'red',
  food: 'grey',
  apparel: 'green',
};

function renderPrice({ row }) {
  return <Label key={`price-${row.id}`} name={formatPrice(row.price)} />;
}

function renderName({ row }) {
  return <Label key={`name-${row.id}`} name={row.name} />
}

function renderDescription({ row }) {
  return decodeHtml(row.description);
}

function renderCategory({ row }) {
  return <Tag
    color={colorMapping[row.category.toLowerCase()]}
    name={row.category}
  />;
}

function renderDate({ row }) {
  return formatDate(row.purchaseDate);
}

function renderLogo({ row }) {
  return (<div key={`log-${row.id}`}>
    <Image
      width={50}
      height={50}
      style={{ maxWidth: 50 }}
      src={row.location}
      alt={row.description}
    />
  </div>);
}

const columns = {
  name: 'Name',
  location: 'Location',
  purchaseDate: 'Purchase Date',
  category: 'Category',
  description: 'Description',
  price: 'Price',
};

const renderers = {
  name: renderName,
  location: renderLogo,
  purchaseDate: renderDate,
  category: renderCategory,
  description: renderDescription,
  price: renderPrice,
};

export default function Purchase() {
  const [ totalPage, setTotalPage ] = useState(8);
  const [ currentPage, setCurrentPage ] = useState(8);
  const [ data, setData ] = useState([]);
  const [ rows, setRows ] = useState([]);
  const { width } = useWindowDimensions();
  let isMobile = false;
  if (width < 768) {
    isMobile = true;
  }

  useEffect(() => {
    async function fetchPurchaseData() {
      const data = await getPurchaseData();
      setRows(data.slice(0, DEFAULT_PAGINATION_PER_PAGE));
      setData(data);
      console.log(data.length);
      setTotalPage(Math.ceil(data.length/DEFAULT_PAGINATION_PER_PAGE));
    }

    fetchPurchaseData();
  }, [])

  const onPageChange = (page) => {
    console.log(page, totalPage);
    let stop = (page + 1) * DEFAULT_PAGINATION_PER_PAGE;
    let start = stop - DEFAULT_PAGINATION_PER_PAGE;
    if (page === totalPage) {
      start = data.length - DEFAULT_PAGINATION_PER_PAGE;
    }

    setRows(data.slice(start, stop));
    setCurrentPage(page);
  };

  return <>
    <h1 className={styles.title}>Purchase</h1>
    {isMobile && <Cards cards={
      rows.map(row => <Card
        key={row.id}
        header={[
          renderLogo({ row }),
          renderName({ row }),
          renderPrice({ row }),
        ]}
        content={[
          renderDescription({ row })
        ]}
        footer={[
          <div key={`footer-${row.id}`}>
            <div className={styles.label}>Purchase Date</div>
            {renderDate({ row })}
          </div>
        ]}
      />)}
    />}
    {!isMobile &&
      <Table renderers={renderers} rows={rows} columns={columns} />}
    <div>
      <ResponsivePagination
        current={currentPage}
        total={totalPage}
        onPageChange={onPageChange}
      />
    </div>
  </>;
}
