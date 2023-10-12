import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";

const Home = ({ paginationType ,page=1,setPage}) => {
  const [products, setProducts] = React.useState([]);
  const fetchProduct = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };
  React.useEffect(() => {
    fetchProduct();
  }, []);
  // console.log(page);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    // <ScrollView style={{ display: "flex" }} nestedScrollEnabled>
    <FlatList
      keyExtractor={(item, index) => index}
      data={products.slice(
        paginationType === "onScroll" ? 0 : page * 10 - 10,
        page * 10
      )}
      numColumns={2}
      onEndReached={
        paginationType === "onScroll"
          ? ()=> products.length/10> page ? setPage(page + 1):null
          : () => {}
      }
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => {
        return (
          <>
            <View
              style={{
                flex: 1,
                margin: 2,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 8,
              }}
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={{
                  width: windowWidth / 2 - 10,
                  height: 150,
                  borderRadius: 8,
                }}
              />
              <Text>{item.title.slice(0, 8)}</Text>
            </View>
          </>
        );
      }}
      ListFooterComponent={() => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              display:
                products.length > 0 && paginationType === "Button"
                  ? "flex"
                  : "none",
            }}
          >
            <TouchableOpacity style={styles.paginationBox} onPress={()=>products.length/10>=page&&setPage(page-1)}>
              <Text>{"<"}</Text>
            </TouchableOpacity>
            {[...Array(products.length / 10)].map((_, i) => {
              return (
                <View
                  key={i}
                  style={[
                    styles.paginationBox,
                    {
                      borderWidth: page === i + 1 ? 2 : 1,
                      backgroundColor: page === i + 1 ? "red" : "white",
                    },
                  ]}
                >
                  <TouchableOpacity onPress={() => setPage(i + 1)}>
                    <Text style={{ color: page === i + 1 ? "white" : "black" }}>
                      {i + 1}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            <TouchableOpacity style={styles.paginationBox} onPress={()=>products.length/10>page&&setPage(page+1)}>
              <Text>{">"}</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />

    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  paginationBox: {
    borderWidth: 1,
    padding: 5,
    borderColor: "red",
    marginHorizontal: 3,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
});

export default Home;
