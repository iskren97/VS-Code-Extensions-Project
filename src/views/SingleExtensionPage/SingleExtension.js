import React from 'react';
import './SingleExtension.css';
import './Markdown.css';

import { useState, useEffect, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import AppContext from '../../providers/AppContext';

import Header from '../../components/Header/Header';
import Markdown from 'markdown-to-jsx';
import { Divider, Grid } from '@mui/material';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DownloadIcon from '@mui/icons-material/Download';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  getExtensionById,
  updateExtensionRating,
  getExtensionRating,
  getExtensionRatingByUser,
  updateExtensionDownloads,
  getExtensionDownloads
} from '../../services/extensions.service.js';

import { singleExtensionButton, commitRow, mainWidth, infoColumn } from '../../styles/styles.js';

import Img from './Img';

const SingleExtension = () => {
  const [ratingValue, setRatingValue] = useState(0);
  const [myRating, setMyRating] = useState(0);
  const [readMe, setReadMe] = useState('');
  const [extensionInfo, setExtensionInfo] = useState('');
  const [repoInfo, setRepoInfo] = useState('');
  const [pulls, setPulls] = useState('');
  const [commitInfo, setCommitInfo] = useState('');
  const [commitDate, setCommitDate] = useState('');
  const [version, setVersion] = useState('');
  const [downloads, setDownloads] = useState(0);

  const { id } = useParams();

  const { userData } = useContext(AppContext);

  const headersList = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    Authorization: 'Bearer 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'
  };

  const updateRating = (value) => {
    return updateExtensionRating(id, userData.username, value).then((data) => {
      const average = data.reduce((sum, current) => sum + current.value, 0) / data.length;

      setRatingValue(average);
    });
  };

  const getVersion = async (author, repo) => {
    const resp = await fetch(`https://api.github.com/repos/${author}/${repo}/releases/latest`, {
      method: 'GET',
      headers: headersList
    });

    const data = await resp.json();

    setVersion(data.tag_name);
  };

  const getReadMe = async (author, repo) => {
    const resp = await fetch(`https://api.github.com/repos/${author}/${repo}/readme`, {
      method: 'GET',
      headers: headersList
    });

    const data = await resp.json();
    const markdown = await fetch(data.download_url);
    const text = await markdown.text();

    setReadMe(text);

    // setReadMe(decodeURIComponent(escape(window.atob(data.content))));
  };

  const getPulls = async (author, repo) => {
    const resp = await fetch(`https://api.github.com/repos/${author}/${repo}/pulls`, {
      method: 'GET',
      headers: headersList
    });
    const data = await resp.json();
    setPulls(data);
  };

  const getRepoInfo = async (author, repo) => {
    const resp = await fetch(`https://api.github.com/repos/${author}/${repo}`, {
      method: 'GET',
      headers: headersList
    });

    const data = await resp.json();

    setRepoInfo(data);
  };

  const getLastCommit = async (author, repo) => {
    const resp = await fetch(`https://api.github.com/repos/${author}/${repo}/commits`, {
      method: 'GET',
      headers: headersList
    });
    const data = await resp.json();

    if (data[0]?.commit?.message.length < 50) {
      setCommitInfo(data[0]?.commit?.message);
    } else {
      setCommitInfo(data[0]?.commit?.message.substring(0, 50) + '...');
    }

    setCommitDate(data[0]?.commit?.author?.date);
  };

  useEffect(() => {
    getExtensionById(id).then((data) => {
      const target = data.repoUrl.split('/');

      getExtensionRatingByUser(id, userData?.username).then((data) => {
        setMyRating(data);
      });

      getExtensionDownloads(id).then((data) => {
        const length = data.length;
        setDownloads(length);
      });
      getExtensionById(id).then((data) => setExtensionInfo(data));
      getReadMe(target[3], target[4]);
      getRepoInfo(target[3], target[4]);
      getPulls(target[3], target[4]);
      getLastCommit(target[3], target[4]);
      getVersion(target[3], target[4]);

      getExtensionRating(id).then((data) => {
        let rating = data;

        if (rating.length === 0) {
          rating = 0;
        }
        setRatingValue(rating.toFixed(2));
      });
    });
  }, [userData]);

  const setDate = (date) => {
    const newDate = new Date(date);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'UTC'
    };
    return newDate.toLocaleString('en-US', options);
  };

  return (
    <div className="glass-container-single">
      <Header />
      <Grid
        container
        direction="column"
        sx={{
          height: 'auto',
          background: 'rgba(255, 255, 255, 0.6)',
          flexWrap: 'nowrap',
          paddingBottom: '50px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.25)',
          borderRadius: '20px',
          marginBottom: '50px',
          marginLeft: '1em',
          marginRight: '1em',
          width: 'auto'
        }}
      >
        <h1 style={{ marginLeft: '2em', marginBottom: '0' }}>{extensionInfo.title}</h1>
        <p
          style={{
            marginLeft: '4em',
            marginBottom: '1em',
            marginTop: '0.25em',
            fontWeight: 'bold'
          }}
        >
          by <NavLink to={`/profile/${extensionInfo.author}`}>{extensionInfo.author}</NavLink>{' '}
          {version ? '/ ' + version : null}{' '}
        </p>

        <Divider
          sx={{ marginLeft: '2em', marginRight: '2em', background: 'hsla(210,18%,87%,1)' }}
        />

        <Grid
          container
          direction="row"
          sx={{ flexWrap: 'wrap', margin: '3em', width: 'auto', gap: '1em' }}
        >
          <Grid container direction="column" sx={infoColumn}>
            <Grid item>
              <img
                src={extensionInfo.logo}
                alt="Extension logo"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </Grid>

            <Grid item>
              <Rating
                name="simple-controlled"
                value={ratingValue}
                size="large"
                onChange={(e, newValue) => {
                  setMyRating(e.target.value);
                  updateRating(e.target.value);
                }}
              />
              <div>Total Rating: {ratingValue}</div>
              <div>My Rating: {myRating}</div>
            </Grid>

            <h4 style={{ marginTop: '0.25em', marginBottom: '0.25em' }}>Tags</h4>
            <Grid container direction="row" sx={{ gap: '0.25em' }}>
              {extensionInfo?.tags?.map((tag) => {
                let id = tag.length;
                return <Chip key={id++} label={tag} />;
              })}
            </Grid>
          </Grid>
          <Divider
            orientation={
              window.matchMedia('(max-device-width: 768px)').matches ? 'horizontal' : 'vertical'
            }
            flexItem
            sx={{ width: 'auto', height: 'auto', background: 'hsla(210,18%,87%,1)' }}
          />

          <Grid container direction="column" sx={mainWidth}>
            <Grid container direction="row" sx={{ alignItems: 'center', gap: '1em' }}>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(extensionInfo.repoUrl, '_blank');
                }}
                variant="contained"
                sx={singleExtensionButton}
                startIcon={<GitHubIcon />}
              >
                Repository
              </Button>
              <Button
                onClick={(e) => {
                  updateExtensionDownloads(id, userData.username);
                  setDownloads((downloads) => downloads + 1);
                  window.location.href = extensionInfo.downloadLink;
                }}
                variant="contained"
                sx={singleExtensionButton}
                startIcon={<DownloadIcon />}
              >
                Download
              </Button>
              <p>
                {' '}
                {downloads} {downloads === 1 ? 'download' : 'downloads'}
              </p>
            </Grid>

            <Stack
              direction="row"
              divider={
                <Divider
                  orientation={
                    window.matchMedia('(max-device-width: 480px)').matches
                      ? 'horizontal'
                      : 'vertical'
                  }
                  flexItem
                />
              }
              spacing={2}
              sx={commitRow}
            >
              <div
                className="git_field"
                style={{ marginLeft: '16px' }}
                onClick={(e) => {
                  e.preventDefault();
                  window.open(repoInfo.html_url + '/issues', '_blank');
                }}
              >
                <p
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    marginBottom: '0.25em'
                  }}
                >
                  Open Issues{' '}
                </p>
                <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{repoInfo.open_issues}</p>
              </div>

              <div
                className="git_field"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(repoInfo.html_url + '/pulls', '_blank');
                }}
              >
                <p
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    marginBottom: '0.25em'
                  }}
                >
                  Pull Requests{' '}
                </p>
                <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{pulls.length}</p>
              </div>

              <div
                className="git_field"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(commitInfo.html_url, '_blank');
                }}
              >
                <p
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    marginBottom: '0.25em'
                  }}
                >
                  Last Commit
                </p>

                <p style={{ fontSize: '1.3rem' }}>{commitInfo}</p>
                <p style={{ fontSize: '1.3rem' }}>{setDate(commitDate)}</p>
              </div>
            </Stack>

            <article className="markdown-body" style={{ maxWidth: '100%', overflow: 'auto' }}>
              <Markdown
                children={readMe || ''}
                options={{
                  overrides: {
                    img: {
                      component: Img
                    }
                  }
                }}
              />
            </article>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleExtension;
