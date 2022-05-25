import { ref, push, get, update } from 'firebase/database';
import { db } from '../config/firebase-config';


import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase-config';


export const createExtension = (title, repoUrl, category, author, fileName, file, tags) => {

  return push(ref(db, 'extensions'), {
    title,
    author: author,
    repoUrl,
    fileName,
    tags,
    createdOn: Date.now(),
    category: category
  }).then((result) => {

    uploadExtensionFile(file, author, fileName, result.key)

    return getExtensionById(result.key);
  });
};


export const getExtensionById = (id) => {
  return get(ref(db, `extensions/${id}`)).then((result) => {
    if (!result.exists()) {
      throw new Error(`Extension with id ${id} does not exist!`);
    }

    const extension = result.val();
    extension.id = id;
    extension.createdOn = new Date(extension.createdOn);


    return extension;
  });
};


export const updateExtensionDownloadLink = (extId, url) => {
  return update(ref(db, `extensions/${extId}`), {
    downloadLink: url
  });

}

export const fromExtensionsDocument = (snapshot) => {
  const extensionsDocument = snapshot.val();

  return Object.keys(extensionsDocument).map((key) => {
    const extension = extensionsDocument[key];

    return {
      ...extension,
      id: key,
      createdOn: new Date(extension.createdOn),

    };
  });
};

export const getAllExtensions = () => {
  return get(ref(db, 'extensions')).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }

    return fromExtensionsDocument(snapshot);
  });
};



export const uploadExtensionFile = (e, username, fileName, extId) => {
  const file = e

  if (!file){
    console.log("somethings wrong")
  return;
  }

  const extension = storageRef(storage, `extensions/${username}/${fileName}`);

  uploadBytes(extension, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref).then((url) => {
        updateExtensionDownloadLink(extId, url)
          return updateExtensions(username, url, fileName);
      });
    })
    // eslint-disable-next-line no-undef
    .catch(console.error);

};


export const updateExtensions = (username, url, fileName) => {

  return get(ref(db, `users`)).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }

    const extensions = [...snapshot.val()[username].extensions || []]

    

    extensions.push({fileName: fileName, downLoadLink: url})
     return update(ref(db), {
      [`users/${username}/extensions`]: extensions
    });


  });
  
};
