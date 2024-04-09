module AuthModule
  def generate_token_for_user(user)
    JWT.encode({ user_id: user.uid }, ENV.fetch('LINE_CHANNEL_SECRET', nil))
  end
end