import Config from "react-native-config";
export const sendProductNotification = async (productId: string, productName: string) => {
  try {
    const response = await fetch('https://api.onesignal.com/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${Config.API_KEY}`
      },
      body: JSON.stringify({
        app_id: Config.APP_ID,
        target_channel: 'push',
        name: 'New Product Added',
        headings: {
          en: '🎉 New Product Available!'
        },
        contents: {
          en: `Check out our new product: ${productName}`
        },
        included_segments: ['All'],
        data: {
          productId: productId
        },
        url: `firstapp://product/${productId}`
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

 