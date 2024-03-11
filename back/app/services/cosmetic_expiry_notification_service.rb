class CosmeticExpiryNotificationService
  def self.send_notification
    CosmeticUsage.find_each do |cosmetic|
      next unless cosmetic.expiry_date

      days_before_expiry = (cosmetic.expiry_date - Date.today).to_i

      message = case days_before_expiry
                when 5
                  "あなたの #{cosmetic.item_type} の使用期限が5日後に迫っています。"
                when 3
                  "あなたの #{cosmetic.item_type} の使用期限が3日後に迫っています。"
                when 1
                  "あなたの #{cosmetic.item_type} の使用期限が明日に迫っています。"
                else
                  nil
                end

      if message
        user = User.find(cosmetic.user_id)
        LineNotifyService.send_message(user.uid, message) if user.uid.present?
      end
    end
  end
end