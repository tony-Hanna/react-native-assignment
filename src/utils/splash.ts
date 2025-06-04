import BootSplash from "react-native-bootsplash";
export const splash = () => {
    const init = async () => {
        // …do multiple async tasks
      };
  
      init().finally(async () => {
        await BootSplash.hide({ fade: true });
      });
}