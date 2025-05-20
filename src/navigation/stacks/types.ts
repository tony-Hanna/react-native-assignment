export type AuthStackParamList = {
    Login: undefined,
    Signup: undefined,    
    Verification: { 
        email: string;
        password: string;
    };
    // Profile: {
    //     userID: string         //params it takes
    // }
};
// export type MainStackParamList = {
//     Products : undefined,
//     Details: undefined
// }

export type MainStackParamList = {
    MainTabs: undefined;
    Details: { id: string };
};
export type TabParamList = {
    Home: undefined;
    AddProduct: undefined;
    Profile: undefined;
  };