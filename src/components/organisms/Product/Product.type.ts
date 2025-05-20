export type productProp = {
    _id: string,
    title: string,
    description: string,
    price: number,
    images: { url: string }[],
    location: {
      name: string,
      longitude: number,
      latitude: number
    },
    user: {
      username: string,
      email: string
    },
    createdAt: string,
    updatedAt: string
  }
  