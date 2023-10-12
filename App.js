import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Home from "./src/screens/Home";

const App = () => {
  const [paginationType, setPaginationType] = React.useState("Button");
  const [page, setPage] = React.useState(1);
  console.log(page);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" barStyle={"dark-content"} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text style={{ marginVertical: 10, textAlign: "center", fontSize: 18 }}>
          Pagination
        </Text>
        <TouchableOpacity
          onPress={() => {
            setPaginationType(
              paginationType === "Button" ? "onScroll" : "Button"
            );
          
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text
            style={{ marginVertical: 10, textAlign: "center", fontSize: 18 }}
          >
            Pagination Type :
          </Text>
          <Text
            style={{ marginVertical: 10, textAlign: "center", fontSize: 18 }}
          >
            {paginationType === "Button" ? "onScroll" : "Button"}
          </Text>
        </TouchableOpacity>
      </View>
      <Home paginationType={paginationType} page={page} setPage={setPage} />
    </SafeAreaView>
  );
};

export default App;
