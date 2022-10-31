import { useEffect, useState, useContext, useCallback } from 'react';
import { Web3Context } from '../context';
import * as PushAPI from '@pushprotocol/restapi';
import { NotificationItem, chainNameType } from '@pushprotocol/uiweb';


const NotificationsTest = () => {
  const { account } = useContext<any>(Web3Context);
  const [notifs, setNotifs] = useState<PushAPI.ParsedResponseType[]>();


  const loadNotifications = useCallback(async () => {
    try {
      const feeds = await PushAPI.user.getFeeds({
        user: account,
        limit: 50,
      });
      console.log('feeds: ', feeds);
      setNotifs(feeds);
    } catch (e) {
      console.error(e);
    } 
  }, [account]);


  useEffect(() => {
    if (account) {
        loadNotifications();
    }
  }, [loadNotifications]);

  return (
      <div>
        <div>
          <div>
            <b className='headerText'>Notifications: </b>
            <div>
              {notifs ? (
                <div>
                  {notifs.map((oneNotification, i) => {
  
                  const { 
                    cta,
                    title,
                    message,
                    app,
                    icon,
                    image,
                    url,
                    blockchain,
                    secret,
                    notification
                  } = oneNotification;

                  return (
                    <NotificationItem
                      key={`notif-${i}`}
                      notificationTitle={secret ? notification['title'] : title}
                      notificationBody={secret ? notification['body'] : message}
                      cta={cta}
                      app={app}
                      icon={icon}
                      image={image}
                      url={url}
                      theme={'dark'}
                      chainName={blockchain as chainNameType}
                    />
                  );
                })}
                </div>
              ) 
              : null}
            </div>
            </div>
        </div>

      </div>
  );
}

export default NotificationsTest;