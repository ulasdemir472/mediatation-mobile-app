import React, { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const Content = ({ children }: PropsWithChildren<any>) => {
  return <SafeAreaView className="flex-1 px-5 py-3">{children}</SafeAreaView>;
};

const AppGradient = ({
  children,
  colors,
}: {
  children: PropsWithChildren<any>;
  colors: string[];
}) => {
  return (
    <LinearGradient colors={colors} className="flex-1">
      <Content>{children}</Content>
    </LinearGradient>
  );
};

export default AppGradient;
