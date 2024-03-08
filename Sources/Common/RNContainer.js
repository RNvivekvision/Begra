import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Colors } from '../Theme';
import RNLoader from './RNLoader';
const RNContainer = ({
  backgroundColor,
  isLoading,
  children,
  style,
  barStyle,
  translucent,
}) => {
  const styles = [{ flex: 1, backgroundColor: backgroundColor }, style];
  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: backgroundColor || Colors.White }]}>
      {isLoading && <RNLoader visible={isLoading} />}
      <View style={styles}>
        <StatusBar
          barStyle={barStyle ?? 'light-content'}
          // backgroundColor={Colors.Transparent}
          // translucent={translucent ?? true}
        />
        {children}
      </View>
    </SafeAreaView>
  );
};
export default RNContainer;
