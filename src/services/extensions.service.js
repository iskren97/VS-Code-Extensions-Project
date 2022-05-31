import { ref, push, get, update } from 'firebase/database';
import { db } from '../config/firebase-config';


import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase-config';


export const createExtension = (title, repoUrl, category, author, fileName, file, tags, logo) => {

  return push(ref(db, 'extensions'), {
    title,
    author: author,
    repoUrl,
    fileName,
    tags,
    logo,
    status: 'pending',	
    createdOn: Date.now(),
    category: category
  }).then((result) => {

    uploadExtensionFile(file,logo, author, fileName, result.key)

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

    if (!extension.rating) {
      extension.rating = [];
    } else {
      extension.rating = extension.rating
    }


    if (!extension.downloads) {
      extension.downloads = [];
    } else {
      extension.downloads = extension.downloads
    }

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



export const uploadExtensionFile = (e, logo, username, fileName, extId) => {
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
        uploadLogo(logo, username, fileName, extId)
          return updateExtensions(username, url, fileName, extId);
      });
    })
    // eslint-disable-next-line no-undef
    .catch(console.error);

};



const uploadLogo = (e, username, fileName, extId) => {

  const file = e


  if (file['type'].split('/')[0] !== 'image')
    return 

  const picture = storageRef(storage, `extensions/${username}/${fileName}_logo`);

  uploadBytes(picture, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref).then((url) => {
        return updateExtensionLogo(extId, url)
      });
    })
    // eslint-disable-next-line no-undef
    .catch(console.error);
};


export const updateExtensionLogo = (extId, url) => {
  return update(ref(db), {
    [`extensions/${extId}/logo`]: url
  });
};


export const updateExtensions = (username, url, fileName, extId) => {

  return get(ref(db, `users`)).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }

    const extensions = [...snapshot.val()[username].extensions || []]


    extensions.push({fileName: fileName, downLoadLink: url, extensionId: extId})
     return update(ref(db), {
      [`users/${username}/extensions`]: extensions
    });


  });
  
};

export const getExtensionRating = (extId) =>{
  return get(ref(db, `extensions/${extId}/rating`)).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }

    let data = snapshot.val()

    data = data.filter(n => n)

    const sum = data.reduce((acc, curr) => {
      return acc + curr.value;
   }, 0);

    return sum/data.length.toFixed(2);
  });
}
 

export const getExtensionRatingByUser = (extId, username) =>{
  return get(ref(db, `extensions/${extId}/rating`)).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }

    const data = snapshot.val()


    const index = data.findIndex((r) => r.username === username);

    if (index > -1) {
      return data[index].value;
    } else {
      return 0;
    }

  });
}



export const updateExtensionRating = (extId, username, value) => {
  return getExtensionById(extId).then((extension) => {
    let rating = extension.rating;

    if (!rating) {
      rating = [];
    }

   value = parseInt(value)
    const index = rating.findIndex((r) => r?.username === username);

    if (index > -1) {
      rating[index].value = value;
    } else {
      rating.push({ username, value });
    }

   update(ref(db, `extensions/${extId}`), {
      rating
    })

    return rating
  });
}


export const updateExtensionDownloads = (extId, username) => {
  return getExtensionById(extId).then((extension) => {
    let downloads = extension.downloads;

    if (!downloads) {
      downloads = [];
    }

    const index = downloads.findIndex((r) => r.username === username);

    if (index > -1) {
      return;
    } else {
      downloads.push({ username, downloaded: true });
    }

   update(ref(db, `extensions/${extId}`), {
      downloads
    })

    return downloads
  });
}


export const getExtensionDownloads = (extId) => {
  return get(ref(db, `extensions/${extId}/downloads`)).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }

    return snapshot.val();
  });
}