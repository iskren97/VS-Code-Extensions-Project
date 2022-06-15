import { ref, push, get, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createNotification = (author, recipient, message, extensionId) => {
  return push(ref(db, 'notifications'), {
    author,
    recipient,
    message,
    statusAuthor: 'unseen',
    statusRecipient: 'unseen',
    createdOn: Date.now(),
    extensionId
  }).then((result) => {
    return getNotificationById(result.key);
  });
};

export const getNotificationById = (id) => {
  return get(ref(db, `notifications/${id}`)).then((result) => {
    if (!result.exists()) {
      throw new Error(`Notification with id ${id} does not exist!`);
    }

    const notification = result.val();
    notification.id = id;
    notification.createdOn = new Date(notification.createdOn);

    return notification;
  });
};

export const fromNotificationsDocument = (snapshot) => {
  const notificationsDocument = snapshot.val();

  return Object.keys(notificationsDocument).map((key) => {
    const notification = notificationsDocument[key];

    return {
      ...notification,
      id: key,
      createdOn: new Date(notification.createdOn)
    };
  });
};

export const getAllNotifications = () => {
  return get(ref(db, 'notifications')).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }

    return fromNotificationsDocument(snapshot);
  });
};

export const setNotificationStatus = (notifId, status, person) => {
  if (person === 'author') {
    return update(ref(db), {
      [`notifications/${notifId}/statusAuthor`]: status
    });
  } else {
    return update(ref(db), {
      [`notifications/${notifId}/statusRecipient`]: status
    });
  }
};
