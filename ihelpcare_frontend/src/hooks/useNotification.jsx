import { notification } from 'antd';

/**
 * A custom React hook for displaying notifications with icons using Ant Design's notification component.
 *
 * @returns {Object} An object containing contextHolder and openNotificationWithIcon functions.
 */
function useNotification() {
  const [api, contextHolder] = notification.useNotification();

  /**
   * Display a notification with an icon.
   *
   * @param {string} type - The type of notification ('success', 'info', 'warning', or 'error').
   * @param {string} msg - The main message to display in the notification.
   * @param {string} desc - The description or additional information for the notification.
   */
  const openNotificationWithIcon = (type, msg, desc) => {
    api[type]({
      message: msg,
      description: desc,
    });
  };

  return { contextHolder, openNotificationWithIcon };
}

export default useNotification;
