import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import AppGradient from "@/components/AppGradient";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { Audio } from "expo-av";
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/MeditationData";
import { TimerContext } from "@/context/TimerContext";

const Page = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { duration, setDuration } = useContext(TimerContext);

  const [isMeditating, setIsMeditating] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setPlayingAudio] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (duration === 0) {
      if (isPlayingAudio) audioSound?.pauseAsync();
      setIsMeditating(false);
      setPlayingAudio(false);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setDuration(duration - 1);
      }, 1000);
    }

    return () => clearTimeout(timerId);
  }, [isMeditating, duration]);

  const togglePlayPause = async () => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlayingAudio) {
      await sound?.playAsync();
      setPlayingAudio(true);
    } else {
      await sound?.pauseAsync();
      setPlayingAudio(false);
    }
  };

  useEffect(() => {
    return () => {
      setDuration(10);
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const toggleMeditationSessionStatus = async () => {
    if (duration === 0) setDuration(10);
    setIsMeditating(!isMeditating);
    await togglePlayPause();
  };

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setSound(sound);
    return sound;
  };

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();
    router.push("/(modal)/adjust-modal");
  };

  const formattedTimeMinutes = String(Math.floor(duration / 60)).padStart(
    2,
    "0"
  );
  const formattedTimeSeconds = String(duration % 60).padStart(2, "0");

  return (
    <View className="flex-1">
      <ImageBackground
        className="flex-1"
        resizeMode="cover"
        source={MEDITATION_IMAGES[Number(id) - 1]}
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-12 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={40} color="white" />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}.{formattedTimeSeconds}
              </Text>
            </View>
          </View>

          <View className="mb-5">
            <CustomButton
              title="Adjust duration"
              onPress={handleAdjustDuration}
            />
            <CustomButton
              title={isMeditating ? "Stop" : "Start Meditation"}
              onPress={toggleMeditationSessionStatus}
              containerStyles="mt-4"
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Page;
