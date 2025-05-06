export type productProp = {
    _id: string,
    title:string,
    description:string,
    price:number,
    images: {  
        url: string,
        _id: string
    }[]
}