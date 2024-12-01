const token = ''
const userId = ''

const url = `https://api.telegram.org/bot${token}/getUserProfilePhotos?user_id=${userId}`

const imgBox = document.querySelector('.profile-avatar')

fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.ok) {
      console.log('User profile photos:', data.result)
      const photos = data.result.photos
      const fileId = photos[0][0].file_id
      getFile(fileId)

    } else {
      console.error('Error fetching user profile photos:', data.description)
    }
  })
  .catch(error => {
    console.error('Error:', error)
  })

  function getFile(fileId) {
    const getFileUrl = `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`
  
    fetch(getFileUrl)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          const filePath = data.result.file_path
          const picUrl = `https://api.telegram.org/file/bot${token}/${filePath}`
          createElement(picUrl)
          console.log(picUrl)
        } else {
          console.error('Error getting file:', data.description)
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  function createElement(picUrl) {
    imgBox.innerHTML = ''
    const img = document.createElement('img')
    img.src = picUrl
    img.classList.add('pic')
    imgBox.appendChild(img)
  }