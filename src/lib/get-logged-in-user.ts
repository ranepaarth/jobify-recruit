import { auth } from "@/auth"
import { ExtendedUser } from "../../types"

export const getUser = async () => {
    const session = await auth()
    
    return session?.user as ExtendedUser
}