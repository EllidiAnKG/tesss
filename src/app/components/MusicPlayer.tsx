"use client"
import { useState, useEffect } from 'react';
import styles from './MusicPlayer.module.css';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
}

const mockMusicData: Track[] = [
    { id: 1, title: 'Песня 1', artist: 'Исполнитель 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, title: 'Песня 2', artist: 'Исполнитель 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  ];

function MusicPlayer() {
  const [musicLibrary, setMusicLibrary] = useState<Track[]>(mockMusicData);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const addTrack = (newTrack: Track) => {
    setMusicLibrary((prevLibrary) => [...prevLibrary, newTrack]);
  };

  useEffect(() => {
    const audio = new Audio(currentTrack?.url);

    if (isPlaying && currentTrack) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [currentTrack, isPlaying]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const newTrack: Track = {
      id: Date.now(), 
      title: (form.elements.namedItem('title') as HTMLInputElement).value,
      artist: (form.elements.namedItem('artist') as HTMLInputElement).value,
      url: (form.elements.namedItem('url') as HTMLInputElement).value,
    };

    addTrack(newTrack);
    form.reset(); // Сброс формы
  };

  return (
    <div className={styles.musicPlayer}>
      <h2>Музыкальная biblioteca</h2>
      <ul className={styles.musicList}>
        {musicLibrary.map((track) => (
          <li key={track.id} className={styles.musicListItem}>
            <button onClick={() => playTrack(track)} className={styles.playButton}>
              {track.title} - {track.artist}
            </button>
          </li>
        ))}
      </ul>

      {currentTrack && (
        <div className={styles.currentPlayer}>
          <h3>{currentTrack.title} - {currentTrack.artist}</h3>
          <button onClick={pauseTrack} disabled={!isPlaying} className={styles.controlButton}>
            {isPlaying ? 'Пауза' : 'Воспроизвести'}
          </button>
        </div>
      )}

      {/* Форма для добавления песни */}
      <form onSubmit={handleSubmit} className={styles.addMusicForm}>
        <input type="text" name="title" placeholder="Название" className={styles.formInput} />
        <input type="text" name="artist" placeholder="Исполнитель" className={styles.formInput} />
        <input type="text" name="url" placeholder="URL песни" className={styles.formInput} />
        <button type="submit" className={styles.formButton}>Добавить песню</button>
      </form>
    </div>
  );
}

export default MusicPlayer;
