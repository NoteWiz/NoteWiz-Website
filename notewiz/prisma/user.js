import prisma from "./index"

export default getUser = async(email) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email:email
            }
        })
    } catch (error) {
        console.log(error);
    }
}