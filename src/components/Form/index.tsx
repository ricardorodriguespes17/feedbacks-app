import { ArrowLeft } from "phosphor-react-native"
import React, { useState } from "react"
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native"
import { theme } from "../../theme"
import { feedbackTypes } from "../../utils/feedbackTypes"
import { ScreenshotButton } from "../ScreenshotButton"
import { SendFeebackButton } from "../SendFeebackButton"
import { FeedbackType } from "../Widget"
import { captureScreen } from "react-native-view-shot"
import * as FileSystem from "expo-file-system"

import { styles } from "./styles"
import { api } from "../../services/api"

interface Props {
  feedbackType: FeedbackType
  onFeedbackCanceled: () => void
  onFeedbackSent: () => void
}

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: Props) {
  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState("")
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  async function handleTakeScreenshot() {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => {
        setScreenshot(uri)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleRemoveScreenshot() {
    setScreenshot(null)
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) {
      return
    }

    setIsSendingFeedback(true)

    const screenshotBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: "base64" }))

    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        comment,
        screenshot:
          screenshotBase64 && `data:image/png;base64,${screenshotBase64}`,
      })

      onFeedbackSent()
    } catch (err) {
      console.log(err)
    }

    setIsSendingFeedback(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image style={styles.image} source={feedbackTypeInfo.image} />

          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        value={comment}
        onChangeText={setComment}
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onRemoveScreenshot={handleRemoveScreenshot}
          onTakeScreenshot={handleTakeScreenshot}
          screenshot={screenshot}
        />
        <SendFeebackButton
          isLoading={isSendingFeedback}
          onPress={handleSendFeedback}
        />
      </View>
    </View>
  )
}
