import { deviceAuthorizationClient } from "better-auth/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "https://orion-cli.onrender.com",
    
      plugins: [ 
    deviceAuthorizationClient(), 
  ], 
})