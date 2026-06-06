'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaPause, FaPlay, FaSpotify, FaStepForward, FaVolumeUp } from 'react-icons/fa';
import { SPOTIFY_SHOW_URL } from './data';
import styles from './HeroSpotifyWidget.module.css';

const PODCAST_RSS_URL = 'https://anchor.fm/s/57d3d428/podcast/rss';
const DEFAULT_SEASON = '3';

const parseDuration = (duration = '') => {
  const parts = duration.split(':').map((part) => Number.parseInt(part, 10));

  if (parts.some((part) => Number.isNaN(part))) {
    return 0;
  }

  if (parts.length === 3) {
    return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
  }

  if (parts.length === 2) {
    return (parts[0] * 60) + parts[1];
  }

  return parts[0] || 0;
};

const formatTime = (seconds = 0) => {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '0:00';
  }

  const rounded = Math.floor(seconds);
  const minutes = Math.floor(rounded / 60);
  const remainingSeconds = String(rounded % 60).padStart(2, '0');

  return `${minutes}:${remainingSeconds}`;
};

const cleanTitle = (title = '') => title
  .replace(/\s+/g, ' ')
  .replace(/\s*-\s*/g, ' - ')
  .replace(/\bKushal N\b/g, 'Kushal Neduru')
  .replace(/\bAnd\b/g, 'and')
  .trim();

const readElement = (item, tagName) => item.getElementsByTagName(tagName)[0] || null;

const readText = (item, tagName) => readElement(item, tagName)?.textContent?.trim() || '';

const readAttribute = (item, tagName, attribute) => (
  readElement(item, tagName)?.getAttribute(attribute) || ''
);

const parsePodcastRss = (xmlText) => {
  const document = new window.DOMParser().parseFromString(xmlText, 'text/xml');

  return Array.from(document.querySelectorAll('item'))
    .map((item, index) => {
      const season = Number.parseInt(readText(item, 'itunes:season'), 10);
      const episode = Number.parseInt(readText(item, 'itunes:episode'), 10);
      const audioUrl = readAttribute(item, 'enclosure', 'url');

      if (!audioUrl) {
        return null;
      }

      return {
        id: `podcast-${index + 1}`,
        title: cleanTitle(readText(item, 'title')),
        season: Number.isNaN(season) ? null : season,
        episode: Number.isNaN(episode) ? null : episode,
        episodeType: readText(item, 'itunes:episodeType') || 'full',
        publishedAt: readText(item, 'pubDate'),
        duration: readText(item, 'itunes:duration'),
        durationSeconds: parseDuration(readText(item, 'itunes:duration')),
        audioUrl,
        image: readAttribute(item, 'itunes:image', 'href'),
        externalUrl: readText(item, 'link'),
      };
    })
    .filter(Boolean);
};

const getEpisodeMeta = (episode) => {
  if (!episode) {
    return '';
  }

  if (episode.season && episode.episode) {
    return `S${episode.season} E${episode.episode}`;
  }

  if (episode.season) {
    return `Season ${episode.season} special`;
  }

  return episode.episodeType === 'trailer' ? 'Trailer' : 'Special';
};

const HeroSpotifyWidget = () => {
  const audioRef = useRef(null);
  const playAfterSelectionRef = useRef(false);
  const [catalog, setCatalog] = useState([]);
  const [activeSeason, setActiveSeason] = useState(DEFAULT_SEASON);
  const [selectedId, setSelectedId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [volume, setVolume] = useState(0.78);
  const [playbackError, setPlaybackError] = useState('');
  const [tiltStyle, setTiltStyle] = useState({ transform: 'rotateX(0deg) rotateY(0deg)' });

  useEffect(() => {
    let ignore = false;

    const loadCatalog = async () => {
      try {
        const response = await fetch(PODCAST_RSS_URL);

        if (!response.ok) {
          throw new Error('Unable to load podcast RSS feed.');
        }

        const xmlText = await response.text();
        const episodes = parsePodcastRss(xmlText);

        if (!ignore) {
          setCatalog(episodes);
          setLoadError(false);
        }
      } catch {
        if (!ignore) {
          setLoadError(true);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadCatalog();

    return () => {
      ignore = true;
    };
  }, []);

  const seasonOptions = useMemo(() => {
    const seasons = Array.from(new Set(catalog
      .map((episode) => episode.season)
      .filter(Boolean)))
      .sort((a, b) => b - a)
      .map((season) => ({
        id: String(season),
        label: `Season ${season}`,
      }));

    const hasSpecials = catalog.some((episode) => !episode.season || episode.episodeType !== 'full');

    return hasSpecials ? [...seasons, { id: 'specials', label: 'Specials' }] : seasons;
  }, [catalog]);

  const visibleEpisodes = useMemo(() => catalog.filter((episode) => {
    if (activeSeason === 'specials') {
      return !episode.season || episode.episodeType !== 'full';
    }

    return String(episode.season) === activeSeason && episode.episodeType === 'full';
  }), [activeSeason, catalog]);

  const selectedEpisode = useMemo(() => (
    catalog.find((episode) => episode.id === selectedId) || visibleEpisodes[0] || catalog[0]
  ), [catalog, selectedId, visibleEpisodes]);

  useEffect(() => {
    if (!visibleEpisodes.length) {
      return;
    }

    const selectedIsVisible = visibleEpisodes.some((episode) => episode.id === selectedId);

    if (!selectedIsVisible) {
      setSelectedId(visibleEpisodes[0].id);
    }
  }, [selectedId, visibleEpisodes]);

  useEffect(() => {
    setCurrentTime(0);
    setDurationSeconds(selectedEpisode?.durationSeconds || 0);
    setPlaybackError('');

    if (audioRef.current) {
      audioRef.current.load();

      if (playAfterSelectionRef.current) {
        playAfterSelectionRef.current = false;
        audioRef.current.play().catch(() => {
          setPlaybackError('Playback was blocked by the browser. Try pressing play again.');
        });
      }
    }
  }, [selectedEpisode?.id, selectedEpisode?.durationSeconds]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = (0.5 - (y / rect.height)) * 10;

    setTiltStyle({
      transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
    });
  };

  const resetTilt = () => {
    setTiltStyle({ transform: 'rotateX(0deg) rotateY(0deg)' });
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio || !selectedEpisode?.audioUrl) {
      return;
    }

    try {
      setPlaybackError('');

      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      setPlaybackError('Playback was blocked by the browser. Try pressing play again.');
    }
  };

  const selectEpisode = (episode, shouldPlay = false) => {
    playAfterSelectionRef.current = shouldPlay;
    setSelectedId(episode.id);
  };

  const selectNextEpisode = () => {
    if (!visibleEpisodes.length || !selectedEpisode) {
      return;
    }

    const currentIndex = visibleEpisodes.findIndex((episode) => episode.id === selectedEpisode.id);
    const nextEpisode = visibleEpisodes[(currentIndex + 1) % visibleEpisodes.length];

    selectEpisode(nextEpisode, isPlaying);
  };

  const seekAudio = (event) => {
    const nextTime = Number.parseFloat(event.target.value);

    if (!audioRef.current || Number.isNaN(nextTime)) {
      return;
    }

    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const updateDuration = () => {
    const nextDuration = audioRef.current?.duration;

    if (Number.isFinite(nextDuration)) {
      setDurationSeconds(nextDuration);
    }
  };

  const progressMax = durationSeconds || selectedEpisode?.durationSeconds || 1;
  const artwork = selectedEpisode?.image || '/assets/logo.svg';

  return (
    <div className={styles.scene}>
      <div
        className={styles.widget}
        style={tiltStyle}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div className={styles.floatBadge}>
          <span>45</span>
          <small>Episodes</small>
        </div>

        <div className={styles.gridLayer} aria-hidden="true" />

        <div className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.spotifyMark}>
              <FaSpotify aria-hidden="true" />
            </span>
            <div>
              <p>Now Streaming</p>
              <h2>Ten Out Of Ten</h2>
            </div>
          </div>
          <span className={styles.livePulse}>Live</span>
        </div>

        <div className={styles.player}>
          <img src={artwork} alt="" className={styles.albumArt} />
          <div className={styles.trackMeta}>
            <p>{selectedEpisode ? getEpisodeMeta(selectedEpisode) : 'Podcast Archive'}</p>
            <h3>{selectedEpisode?.title || 'Loading the full catalog'}</h3>
            <div className={styles.progressRow}>
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={progressMax}
                step="1"
                value={Math.min(currentTime, progressMax)}
                aria-label="Playback progress"
                onChange={seekAudio}
              />
              <span>{formatTime(progressMax)}</span>
            </div>
          </div>
        </div>

        <div className={styles.controls} aria-label="Podcast playback controls">
          <button
            type="button"
            className={styles.playButton}
            aria-label={isPlaying ? 'Pause selected episode' : 'Play selected episode'}
            disabled={!selectedEpisode?.audioUrl}
            onClick={togglePlayback}
          >
            {isPlaying ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
          </button>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Select next episode"
            disabled={!visibleEpisodes.length}
            onClick={selectNextEpisode}
          >
            <FaStepForward aria-hidden="true" />
          </button>
          <span className={styles.volume}>
            <FaVolumeUp aria-hidden="true" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              aria-label="Volume"
              onChange={(event) => setVolume(Number.parseFloat(event.target.value))}
            />
          </span>
        </div>

        <div className={styles.seasonTabs} aria-label="Podcast seasons">
          {(seasonOptions.length ? seasonOptions : [
            { id: '3', label: 'Season 3' },
            { id: '2', label: 'Season 2' },
            { id: '1', label: 'Season 1' },
          ]).map((season) => (
            <button
              key={season.id}
              type="button"
              className={activeSeason === season.id ? styles.activeSeason : ''}
              onClick={() => setActiveSeason(season.id)}
            >
              {season.label}
            </button>
          ))}
        </div>

        <div className={styles.episodeList} aria-label="Episodes in selected season">
          {visibleEpisodes.map((episode) => (
            <button
              key={episode.id}
              type="button"
              className={`${styles.episodeRow} ${episode.id === selectedEpisode?.id ? styles.activeRow : ''}`}
              onClick={() => selectEpisode(episode, isPlaying)}
            >
              <span>{episode.episode ? `E${episode.episode}` : episode.episodeType}</span>
              <div>
                <strong>{episode.title}</strong>
                <small>{getEpisodeMeta(episode)} · {episode.duration || 'Audio'}</small>
              </div>
            </button>
          ))}

          {!visibleEpisodes.length && (
            <div className={styles.emptyState}>
              {isLoading ? 'Loading episodes...' : 'No episodes found for this season.'}
            </div>
          )}
        </div>

        {(playbackError || loadError) && (
          <p className={styles.widgetNotice}>
            {playbackError || 'The live catalog could not load. Use Spotify while the feed is unavailable.'}
          </p>
        )}

        <div className={styles.footer}>
          <div>
            <strong>3</strong>
            <span>Seasons</span>
          </div>
          <div>
            <strong>8+</strong>
            <span>Films</span>
          </div>
          <Link href={SPOTIFY_SHOW_URL} target="_blank" rel="noopener noreferrer">
            Open Spotify
          </Link>
        </div>

        <audio
          ref={audioRef}
          src={selectedEpisode?.audioUrl || undefined}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            selectNextEpisode();
          }}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onLoadedMetadata={updateDuration}
        />
      </div>
    </div>
  );
};

export default HeroSpotifyWidget;
