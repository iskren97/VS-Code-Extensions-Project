import React, { useContext, useState } from 'react';

import { useNavigate } from 'react-router';
import './Upload.css';

import AppContext from '../../providers/AppContext';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { storage } from '../../config/firebase-config';

import { Container, Divider } from '@mui/material';

import AlertUser from '../Register/AlertUser';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import {
  createExtension,
  getAllExtensions,
} from '../../services/extensions.service';

function Upload() {
  const { user, userData, setContext } = useContext(AppContext);
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  const [uploadInfo, setUploadInfo] = useState({});

  console.log(uploadInfo);


  const validateData = async () =>{



  


    if(!uploadInfo.category){
      setError(true);
      setErrorMsg('Please select a category');
      setMsgType('error');
      return false;
    }
    if (!uploadInfo.name) {
      setError(true);
      setErrorMsg('Please enter a name for your extension');
      setMsgType('error');
      return false;
    }

    if (uploadInfo.name.length < 2 || uploadInfo.name.length > 30) {
      setError(true);
      setErrorMsg('Please enter a name between 3 and 30 characters');
      setMsgType('error');
      return false;
    }

    if (!uploadInfo.file) {
      setError(true);
      setErrorMsg('Please upload a file');
      setMsgType('error');
      return false;
    }

    if (!uploadInfo.file.name.includes('vsix')) {
      setError(true);
      setErrorMsg('Please upload a valid extension - .vsix format');
      setMsgType('error');
      return false;
    }

    if (!uploadInfo.tags || uploadInfo.tags.length < 1) {
      setError(true);
      setErrorMsg('You need to enter at least one tag');
      setMsgType('error');
      return false;
    }

    if (
      !uploadInfo.logo ||
      (uploadInfo.logo.type !== 'image/jpg' &&
        uploadInfo.logo.type !== 'image/png' &&
        uploadInfo.logo.type !== 'image/jpeg')
    ) {
      setError(true);
      setErrorMsg('Please upload a jpg or png file');
      setMsgType('error');
      return false;
    }

    if (
      !uploadInfo.repositoryUrl ||
      !uploadInfo.repositoryUrl.startsWith('https://github.com/')
    ) {
      setError(true);
      setErrorMsg('Please enter a valid URL');
      setMsgType('error');
      return false;
    }



     return getAllExtensions().then(extensions => {
      extensions.forEach((extension) => {
        if (extension.title === uploadInfo?.name) {
          setError(true);
          setErrorMsg('This name is already in use');
          setMsgType('error');
          return false;
        } else if (extension.repoUrl === uploadInfo.repositoryUrl) {
          setError(true);
          setErrorMsg('This repository is already in use');
          setMsgType('error');
          return false;
        } else if (extension.fileName === uploadInfo.file?.name) {
          setError(true);
          setErrorMsg('This file is already uploaded');
          setMsgType('error');
          return false;
        } else {
          return true;

        }




      })
    })


  }

  const handleKeyEnter = (event) => {
    if (event.key === 'Enter') {
      if (error === true) {
        setError(false);
      } else {
        submitExtension(event);
      }
    }
  };

  const tags = [
    'new',
    'updated',
    'css',
    'scss',
    'javascript',
    'js',
    'design',
    'other',
    'ts',
    'typescript',
    'html',
    'php',
    'c',
    'c#',
    'c++',
    'xml',
    'jsx',
    'es6',
  ];

  const submitExtension = async () => {
    if ((await validateData()) === true) {
      createExtension(
        uploadInfo.name,
        uploadInfo.repositoryUrl,
        uploadInfo.category,
        userData.username,
        uploadInfo.file.name,
        uploadInfo.file,
        uploadInfo.tags,
        uploadInfo.logo
      );

      setError(true);
      setErrorMsg(`Extension uploaded successfully!`);
      setMsgType('success');
      setTimeout(() => {
        navigate('/');
      }, 1500);


  const submitExtension = async () =>{
    if(await validateData()){
    createExtension(uploadInfo.name, uploadInfo.repositoryUrl, uploadInfo.category, userData.username, uploadInfo.file.name, uploadInfo.file, uploadInfo.tags, uploadInfo.logo)

    setError(true);
    setErrorMsg(`Extension uploaded successfully!`);
    setMsgType('success');
    setTimeout(() => {
      navigate('/');
    }, 1500);

    }
  };

  return (
    <>
      <div className="upload-parent">
        <Container className="upload-container" maxWidth="sm">
          <div
            style={{
              textAlign: 'center',
              position: 'relative',
              top: '-25px',
              fontSize: '22px',
            }}
          >
            <h2>Upload an extension</h2>
          </div>
          <br />

          <Divider sx={{ bgcolor: 'rgba(0,122,205,255)' }} />

          <br />
          <form className="upload-form">
            <div>
              <input
                type="text"
                placeholder="Extension Name"
                required
                onChange={(e) =>
                  setUploadInfo({ ...uploadInfo, name: e.target.value })
                }
                onKeyDown={handleKeyEnter}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Repository Url"
                required
                onChange={(e) =>
                  setUploadInfo({
                    ...uploadInfo,
                    repositoryUrl: e.target.value,
                  })
                }
                onKeyDown={handleKeyEnter}
              />
            </div>
            <div>
              <h2>File</h2>

              <input
                type="file"
                accept=".vsix"
                required
                onChange={(e) =>
                  setUploadInfo({ ...uploadInfo, file: e.target.files[0] })
                }
                onKeyDown={handleKeyEnter}
              />
            </div>

            <div>
              <h2>Logo</h2>

              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) =>
                  setUploadInfo({ ...uploadInfo, logo: e.target.files[0] })
                }
                onKeyDown={handleKeyEnter}
              />
            </div>
            <div>
              <h2>Category</h2>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={uploadInfo.category || ''}
                onChange={(e) =>
                  setUploadInfo({ ...uploadInfo, category: e.target.value })
                }
                sx={{ width: '100%' }}
              >
                <MenuItem value={'Code Formatters'}>Code Formatters</MenuItem>
                <MenuItem value={'Linters'}>Linters</MenuItem>
                <MenuItem value={'Appearance'}>Appearance</MenuItem>
                <MenuItem value={'Themes'}>Themes</MenuItem>
                <MenuItem value={'Snippets'}>Snippets</MenuItem>
                <MenuItem value={'Programming Languages'}>
                  Programming Languages
                </MenuItem>
                <MenuItem value={'Azure'}>Azure</MenuItem>
                <MenuItem value={'Data Science'}>Data Science</MenuItem>
                <MenuItem value={'Debuggers'}>Debuggers</MenuItem>
              </Select>
            </div>
            <div>
              <Autocomplete
                multiple
                id="tags-filled"
                options={tags}
                freeSolo
                disableClearable
                className="upload-form-tags"
                fullWidth
                onChange={(e, values) =>
                  setUploadInfo({ ...uploadInfo, tags: values })
                }
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} variant="filled" placeholder="Tags" />
                )}
              />
            </div>

            <Divider sx={{ bgcolor: 'rgba(0,122,205,255)' }} />

            <Button
              onClick={() => submitExtension()}
              variant="contained"
              sx={{
                cursor: 'pointer',
                background: 'rgba(0, 122, 205, 255)',
                textTransform: 'uppercase',
                border: 'none',
                padding: '20px',
                fontSize: '18px',
                fontWeight: 'bold',
                letterSpacing: '10px',
              }}
            >
              Submit
            </Button>
          </form>
        </Container>
        {error ? (
          <AlertUser
            msg={errorMsg}
            type={msgType}
            err={error}
            setErr={setError}
          />
        ) : null}
      </div>
    </>
  );
}

export default Upload;
