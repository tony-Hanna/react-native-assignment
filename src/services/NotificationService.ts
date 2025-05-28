
export const sendProductNotification = async (productId: string, productName: string) => {
  try {
    const response = await fetch('https://api.onesignal.com/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Key os_v2_app_qjrgparbzjcplnk6begcimong2qq3hgqcghuagfdijrxapagaeagdn5rxqmvu4dkneow3k4yd2wl6uijl4zrzm323bbjghxtmjt65yq'
      },
      body: JSON.stringify({
        app_id: '82626782-21ca-44f5-b55e-090c2431cd36',
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

 