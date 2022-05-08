import React, { useRef, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ChatTeardropDots } from "phosphor-react-native"
import BottomSheet from "@gorhom/bottom-sheet"
import { gestureHandlerRootHOC } from "react-native-gesture-handler"
import { Options } from "../Options"
import { Sucess } from "../Sucess"
import { Form } from "../Form"

import { feedbackTypes } from "../../utils/feedbackTypes"

import { theme } from "../../theme"
import { styles } from "./styles"

export type FeedbackType = keyof typeof feedbackTypes

function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleOpen() {
    bottomSheetRef.current?.expand()
  }

  function handleRestartFeedback() {
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  function handleFeedbackSent() {
    setFeedbackSent(true)
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight="bold"
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Sucess onSendAnotherFeedback={handleRestartFeedback} />
        ) : (
          <>
            {feedbackType ? (
              <Form
                feedbackType={feedbackType}
                onFeedbackCanceled={handleRestartFeedback}
                onFeedbackSent={handleFeedbackSent}
              />
            ) : (
              <Options onFeedbackTypeChanged={setFeedbackType} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  )
}

export default gestureHandlerRootHOC(Widget)
