import envConfig from '@/config/environment'
import http from '@/utils/http'

const cloudinaryService = {
  uploadImage(image: any) {
    return http.post('', image, {
      baseUrl: `https://api.cloudinary.com/v1_1/${envConfig.NEXT_PUBLIC_CLOUD_NAME}/upload`
    })
  }
}

export default cloudinaryService
