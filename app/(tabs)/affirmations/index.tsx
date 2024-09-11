import { View, Text, ScrollView } from "react-native";
import React from "react";
import images from "@/constants/affirmation-images";
import AppGradient from "@/components/AppGradient";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import GuidedAffirmationsGallery from "@/components/GuidedAffirmationGallery";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Affirmations = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#2e1f58", "#54426b", "#a790af"]}
        className="px-5"
        style={{ paddingTop: insets.top }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-zinc-50 text-3xl font-bold">
            Change your beliefs with affirmations
          </Text>
          <View>
            {AFFIRMATION_GALLERY.map((item) => (
              <GuidedAffirmationsGallery
                key={item.title}
                title={item.title}
                products={item.data}
              />
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
      <StatusBar style="light" />
    </View>
  );
};

export default Affirmations;
