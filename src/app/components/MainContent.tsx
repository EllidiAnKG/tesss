import styles from './MainContent.module.css';
const MainContent = () => {
  return (
    <main className={styles.mainContent}>
      <h2>Featured Playlists</h2>
      {}
      <div className={styles.playlist}>Playlist 1</div>
      <div className={styles.playlist}>Playlist 2</div>
      {}
    </main>
  );
};

export default MainContent;
