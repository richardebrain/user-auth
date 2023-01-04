
import React from 'react'

type ImageLoaderP = {
    src: string
    width: number
    quality?: number
}

const ImageLoader = ({ src, width, quality }: ImageLoaderP) => {
    return (
        `${src}?w=${width}&q=${quality || 75}`
    )
}

export default ImageLoader