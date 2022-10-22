import React, { FC, useEffect } from 'react'
import { uploadToS3 } from '../../../utils/upload-file'
import { useFileChange } from '../../../utils/fileChange'
import { MAX_FILE_SIZE_BYTES } from '../../../constants'

const ImageUpload: FC<{ onChange?: (file: any) => void; src?: string }> = ({ onChange, src }) => {
  const { fileName, fileContents, fileType, fileDispatch, handleFileChange } = useFileChange(
    'video',
    MAX_FILE_SIZE_BYTES * 100
  )
  const handleUpload = async () => {
    if (!fileName) {
      return
    }

    try {
      if (fileType && fileContents) {
        const file = await uploadToS3({ fileType, fileContents }, 'video')

        // console.log('filePath is', filePath);
        fileDispatch({ type: 'RESET_FILE_STATE' })
        onChange && onChange(file)
      }
    } catch (err) {
      console.log('error is', err)
    }
  }

  useEffect(() => {
    handleUpload()
  }, [fileName])

  return (
    <div className="ImageUpload">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video controls autoPlay loop width={400} muted>
        <source src={src} />
      </video>
      <input
        type="file"
        accept="video/*"
        id="picture"
        name="picture"
        className=""
        onChange={handleFileChange}
      />
    </div>
  )
}

export default ImageUpload
