export type AuthStackParamList = {
    Login: undefined,
    Signup: undefined,    
    Verification: { 
        email: string;
        password: string;
    };
    ForgotPassword: undefined
};


export type MainStackParamList = {
    MainTabs: undefined;
    Details: { id: string };
    EditProduct: { id: string };
    CameraScreen: { type: 'profile' | 'product' | 'editProduct' };
    Location: { latitude: number; longitude: number; fromProductDetails?: boolean };
    Profile: { photo: any };

};
export type TabParamList = {
    Home: undefined;
    AddProduct: undefined;
    Profile: undefined;
  };