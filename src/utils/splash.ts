import BootSplash from "react-native-bootsplash";
export const splash = () => {
    const init = async () => {
        // …do multiple sync or async tasks
      };
  
      init().finally(async () => {
        await BootSplash.hide({ fade: true });
        console.log("BootSplash has been hidden successfully");
      });
}