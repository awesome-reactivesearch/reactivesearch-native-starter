import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';
import {
  ReactiveBase,
  TextField,
  ReactiveList
} from '@appbaseio/reactivebase-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    }
  }

  async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			Ionicons: require('native-base/Fonts/Ionicons.ttf'),
		});

		this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <ReactiveBase
        app="car-store"
        credentials="cf7QByt5e:d2d60548-82a9-43cc-8b40-93cbbe75c34c"
      >
        <ScrollView>
          <View style={styles.container}>
            <TextField
              componentId="searchbox"
              dataField="name"
              categoryField="brand.raw"
              placeholder="Search for cars"
            />
            <ReactiveList
              componentId="results"
              dataField="name"
              size={7}
              showResultStats={false}
              pagination={true}
              react={{
                and: "searchbox"
              }}
              onData={(res) => (
                <View style={styles.result}>
                  <Image source={{ uri: 'https://bit.do/demoimg' }} style={styles.image} />
                  <View style={styles.item}>
                    <Text style={styles.title}>{res.name}</Text>
                    <Text>{res.brand + " " + "🌟".repeat(res.rating)}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </ReactiveBase>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 25
  },
  image: {
    width: 100,
    height: 100
  },
  result: {
    flexDirection: 'row',
    width: '100%',
    margin: 5,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'column',
    paddingLeft: 10
  },
  title: {
    fontWeight: 'bold'
  }
});
