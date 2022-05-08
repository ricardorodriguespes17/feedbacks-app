import React from "react"
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"

import { styles } from "./styles"

interface Props extends TouchableOpacityProps {
  title: string
  image: ImageProps
}

export function Option({ title, image, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image style={styles.image} source={image} />

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}
