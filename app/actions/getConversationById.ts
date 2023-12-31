import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (
  conversationId: string
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    console.log("Current user", currentUser);
    console.log("Conversation Id", conversationId);
    // const conversation = await prisma.conversation.findUnique({where: {id: conversationId}});
    // console.log("first conversation", conversation);
  
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR')
    return null;
  }
};

export default getConversationById;