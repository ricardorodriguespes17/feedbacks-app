import React from "react"
import { View, Image, Text, TouchableOpacity } from "react-native"

import sucessImage from "../../assets/success.png"
import { Copyright } from "../Copyright"

import { styles } from "./styles"

interface Props {
  onSendAnotherFeedback: () => void
}

export function Sucess({ onSendAnotherFeedback }: Props) {
  return (
    <View style={styles.container}>
      <Image source={sucessImage} style={styles.image} />
      <Text style={styles.title}>Agradecemos o feedback</Text>

      <TouchableOpacity style={styles.button} onPress={onSendAnotherFeedback}>
        <Text style={styles.buttonLabel}>Quero enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  )
}
