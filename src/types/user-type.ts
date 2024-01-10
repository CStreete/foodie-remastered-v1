export interface User {
  firstName: string
  lastName: string
  email: string
  id: number
  image: string
  followers: [
    {
      userId: number
      userImage: string
      userName: string
    }
  ]
  following: [
    {
      userId: number
      userImage: string
      userName: string
    }
  ]
}
