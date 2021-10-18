export const configuration = () => {
  return {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    messagingURL: process.env.RABBITMQ_LINK
  }
}