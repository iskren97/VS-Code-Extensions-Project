import React, { useContext, useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router';


import AppContext from '../../../providers/AppContext';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { storage } from '../../../config/firebase-config';

import { Container, Divider } from '@mui/material';

import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AlertUser from '../../Register/AlertUser';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import '../../Upload/Upload.css'

import {
  createExtension,
  getAllExtensions,
  getExtensionById,
  updateExtensionInfo
} from '../../../services/extensions.service';
import { NavLink } from 'react-router-dom';

function EditExtension() {
  const { user, userData, setContext } = useContext(AppContext);
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  const [uploadInfo, setUploadInfo] = useState({tags: []});
  const [currentExtension, setCurrentExtension] = useState({});
  const { id } = useParams();



  // const [extension, setExtension] = useState('')

  useEffect(() => {
    getExtensionById(id).then((ext) => {
      setCurrentExtension(ext);
      setUploadInfo(ext);
    });

    
  },[])


  console.log(uploadInfo)



  const validateData = async () => {
    if (!uploadInfo.category) {
      setError(true);
      setErrorMsg('Please select a category');
      setMsgType('error');
      return false;
    }
    if (!uploadInfo.title) {
      setError(true);
      setErrorMsg('Please enter a name for your extension');
      setMsgType('error');
      return false;
    }

    if (uploadInfo.title.length < 2 || uploadInfo.title.length > 30) {
      setError(true);
      setErrorMsg('Please enter a name between 3 and 30 characters');
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
      !uploadInfo.repositoryUrl ||
      !uploadInfo.repositoryUrl.startsWith('https://github.com/')
    ) {
      setError(true);
      setErrorMsg('Please enter a valid URL');
      setMsgType('error');
      return false;
    }

    return true;
  };

  const handleKeyEnter = (event) => {
    if (event.key === 'Enter') {
      if (error === true) {
        setError(false);
      } else {
        editExtension(event);
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

  const editExtension = async () => {
    const isValidData = await validateData();

    getAllExtensions().then((extensions) => {
      for (const extension of extensions) {
        if (extension.title === uploadInfo?.title && extension.title !== currentExtension.title) {
          setError(true);
          setErrorMsg('This name is already in use');
          setMsgType('error');
          return false;
        }

        if (extension.repoUrl === uploadInfo.repoUrl && extension.repoUrl !== currentExtension.repoUrl) {
          setError(true);
          setErrorMsg('This repository is already in use');
          setMsgType('error');
          return false;
        }

        if (extension.fileName === uploadInfo.file?.name) {
          setError(true);
          setErrorMsg('This file is already uploaded');
          setMsgType('error');
          return false;
        }
      }
      if (isValidData) {
        updateExtensionInfo(uploadInfo.id, uploadInfo)

        setError(true);
        setErrorMsg(`Extension uploaded successfully!`);
        setMsgType('success');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    });
  };

  return (
    <>
      <div className="upload-parent">
        <Container className="upload-container" maxWidth="sm">
            <Tooltip placement="right-end" title="Go back">
              <ArrowBackIcon
                fontSize={'medium'}
                style={{ position: 'absolute', top: '5px', left: '5px', cursor: 'pointer' }}
                onClick={() => navigate(-1)}
              />
            </Tooltip>

          <div
            style={{
              textAlign: 'center',
              position: 'relative',
              top: '-25px',
              fontSize: '22px',
            }}
          >
            <h2>Edit {currentExtension.title}</h2>
          </div>

          <br />

          <Divider sx={{
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }} />

          <br />

          <form className="upload-form">
            <div>
              <input
                type="text"
                placeholder="Extension Name"
                defaultValue={uploadInfo.title}
                required
                onChange={(e) =>{
                  setUploadInfo({ ...uploadInfo, title: e.target.value })}
                }
                onKeyDown={handleKeyEnter}
              />
            </div>
           

            <div>
              <input
                type="text"
                placeholder="Repository Url"
                required
                defaultValue={uploadInfo.repoUrl}

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
              <h2>Category</h2>

              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={uploadInfo.category || ''}
                onChange={(e) =>
                  setUploadInfo({ ...uploadInfo, category: e.target.value })
                }
                sx={{ width: '100%', color: 'white !important', fontWeight: 'bold' }}
              >
                <MenuItem value={'Code Formatters'}>Code Formatters</MenuItem>
                <MenuItem value={'Linters'}>Linters</MenuItem>
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
                value={[...uploadInfo?.tags]}
                onChange={(e, values) =>{
                  setUploadInfo({ ...uploadInfo, tags: values })}
                }
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      sx={{color: 'white'}}
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

            <Divider  sx={{
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }} />

            <Button
              onClick={() => editExtension()}
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
              Update
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

export default EditExtension;
