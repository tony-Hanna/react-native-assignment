import { StyleSheet, Dimensions } from "react-native";

import { normalizeWidth, normalizeHeight } from "../../utils/scale"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
export const detailsStyles = StyleSheet.create({
  container: {
    padding: normalizeWidth(20),
    flex: 1,
  },
  header:{flexDirection:'row', justifyContent:'space-between'},
  imageContainer: {
    width: SCREEN_WIDTH - normalizeWidth(40),
    height: SCREEN_WIDTH - normalizeWidth(40),
    marginBottom: normalizeHeight(20),
    alignSelf: 'center',
  },
  share: {marginVertical: normalizeHeight(20), backgroundColor: '#fff', borderRadius: 20,padding: 8, marginLeft: 8},
  image: {
    width: SCREEN_WIDTH - normalizeWidth(40), // Match FlatList item width
    height: SCREEN_WIDTH - normalizeWidth(40),
    borderRadius: 12,
  },
  titleDateWrap:{flexDirection:'row', justifyContent:'space-between', alignItems:'center'},
  dateText: {
    fontSize: 12,
    fontStyle: 'italic',
},
  title: {
    fontSize: normalizeWidth(24),
    fontWeight: "700",
    marginBottom: normalizeHeight(5),
  },
  price: {
    fontSize: normalizeWidth(20),
    color: "#2e8b57",
    fontWeight: "600",
    marginBottom: normalizeHeight(15),
  },
  sectionTitle: {
    fontSize: normalizeWidth(18),
    fontWeight: "600",
    marginBottom: normalizeHeight(5),
  },
  description: {
    fontSize: normalizeWidth(16),
    lineHeight: 22,
    fontFamily: 'Roboto-Regular',
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: normalizeWidth(18),
    color: "red",
  },
  arrow: {
    marginVertical: normalizeHeight(20),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: normalizeHeight(30),
  },
  button: {
    flex: 1,
    backgroundColor: "#333",
    paddingVertical: normalizeHeight(12),
    paddingHorizontal: normalizeWidth(16),
    borderRadius: 8,
    alignItems: "center",
    marginRight: normalizeWidth(10),
  },
  retryButton: {
    backgroundColor: "#333",
    paddingVertical: normalizeHeight(12),
    paddingHorizontal: normalizeWidth(16),
    borderRadius: 8,
    alignItems: "center",
    marginRight: normalizeWidth(10),
  },
  cartButton: {
    backgroundColor: "#2e8b57",
    marginRight: 0,
  },
  editButton: {
    backgroundColor: "#2e8b57",
    marginRight: 0,
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    marginRight: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: normalizeWidth(16),
    fontWeight: "600",
    marginLeft:8
  },
  IconButtonTextWrap: {
    flexDirection:'row', alignItems:'center'
  },
  ownerContainer: {
    marginTop: 16,
    marginHorizontal: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // or '#f4f4f4' for light mode
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  
  contactText: {
    marginLeft: 10,
    fontSize: 16,

  },
  
});
  