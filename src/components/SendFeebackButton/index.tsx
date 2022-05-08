import React from "react"
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  Text,
} from "react-native"
import { theme } from "../../theme"

import { styles } from "./styles"

interface Props extends TouchableOpacityProps {
  isLoading: boolean
}

export function SendFeebackButton({ isLoading, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text_on_brand_color} />
      ) : (
        <Text style={styles.label}>Enviar feedback</Text>
      )}
    </TouchableOpacity>
  )
}
