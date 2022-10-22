import React, { FC, useEffect } from 'react'
import { uploadToS3 } from '../../../utils/upload-file'
import { useFileChange } from '../../../utils/fileChange'

const ImageUpload: FC<{ onChange?: (file: any) => void; src?: string }> = ({ onChange, src }) => {
  const { fileName, fileContents, fileType, fileDispatch, handleFileChange } = useFileChange()
  const handleUpload = async () => {
    if (!fileName) {
      return
    }

    try {
      if (fileType && fileContents) {
        const file = await uploadToS3({ fileType, fileContents })

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
      <img src={src} width={300} alt={''} />
      <input
        type="file"
        accept="image/*"
        id="picture"
        name="picture"
        className=""
        onChange={handleFileChange}
      />
    </div>
  )
}

export default ImageUpload
