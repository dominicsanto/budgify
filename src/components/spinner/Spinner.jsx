import styles from './spinner.module.css';

const Spinner = () => {
  return ( <>
    <div className="grid h-screen place-items-center">
      <div className={styles.container}>
        <div className={styles.loading}></div>
      </div>
    </div>
  </> );
}

export default Spinner;
