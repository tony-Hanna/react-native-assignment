import { StyleSheet, Dimensions } from "react-native";

import { normalizeWidth, normalizeHeight } from "../../utils/scale"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
export const detailsStyles = StyleSheet.create({
  container: {
    padding: normalizeWidth(20),
    flex: 1,
  },
  // image: {
  //   width: "100%",
  //   height: SCREEN_HEIGHT * 0.35, // Responsive image height
  //   borderRadius: 12,
  //   marginBottom: normalizeHeight(20),
  // },
  image: {
    width: '100%',
    aspectRatio: 1, // 1 means square; adjust to your image's natural ratio (e.g., 0.6 for portrait)
    borderRadius: 12,
    marginBottom: normalizeHeight(20),
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
  cartButton: {
    backgroundColor: "#2e8b57",
    marginRight: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: normalizeWidth(16),
    fontWeight: "600",
  },
});
  